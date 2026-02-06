#!/usr/bin/env python3
"""Evaluate transcript cases and KB reference integrity for the pilot package."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CASES_PATH = ROOT / "qa" / "transcript_cases.yaml"
RESPONSES_PATH = ROOT / "qa" / "mock_transcript_responses.yaml"
MENU_PATH = ROOT / "custom_gpt_package" / "kb" / "menu.md"
PAIRING_PATH = ROOT / "custom_gpt_package" / "kb" / "pairing_rules.md"
RESULTS_PATH = ROOT / "qa" / "results_2026-02-06.md"


def _strip_quotes(value: str) -> str:
    value = value.strip()
    if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
        return value[1:-1]
    return value


def parse_simple_yaml(path: Path):
    lines = path.read_text().splitlines()
    items = []
    current = None
    current_list_key = None

    for raw in lines:
        line = raw.rstrip()
        if not line.strip() or line.strip().startswith('#'):
            continue

        if line.startswith('- '):
            if line.startswith('- case_id:'):
                if current:
                    items.append(current)
                current = {'case_id': _strip_quotes(line.split(':', 1)[1].strip())}
                current_list_key = None
            else:
                # list item on root level not expected
                continue
            continue

        m_key = re.match(r'^\s{2}([a-z_]+):\s*(.*)$', line)
        if m_key and current is not None:
            key, value = m_key.group(1), m_key.group(2)
            if value == '':
                current[key] = []
                current_list_key = key
            else:
                value = _strip_quotes(value)
                if value in ('true', 'false'):
                    current[key] = (value == 'true')
                else:
                    current[key] = value
                current_list_key = None
            continue

        m_list = re.match(r'^\s{4}-\s*(.*)$', line)
        if m_list and current is not None and current_list_key is not None:
            current[current_list_key].append(_strip_quotes(m_list.group(1)))

    if current:
        items.append(current)

    return items


def load_menu_ids(path: Path):
    ids = set()
    for line in path.read_text().splitlines():
        m = re.match(r'^- dish_id: (.+)$', line)
        if m:
            ids.add(m.group(1).strip())
    return ids


def load_pairing_ids(path: Path):
    refs = []
    for line in path.read_text().splitlines():
        m = re.search(r'suggest_dish_ids:\s*\[(.+)\]', line)
        if not m:
            continue
        parts = [x.strip() for x in m.group(1).split(',') if x.strip()]
        refs.extend(parts)
    return refs


def evaluate_cases(cases, responses_by_id):
    results = []

    for case in cases:
        cid = case['case_id']
        response = responses_by_id.get(cid, '')
        response_l = response.lower()

        failures = []

        if not response:
            failures.append('Missing assistant response for case.')
        else:
            for needle in case.get('must_include', []):
                if needle.lower() not in response_l:
                    failures.append(f"Missing required phrase: {needle}")

            for needle in case.get('must_not_include', []):
                if needle.lower() in response_l:
                    failures.append(f"Contains forbidden phrase: {needle}")

            if case.get('must_cite_if_fact_claim', False):
                if 'http://' not in response_l and 'https://' not in response_l and 'source:' not in response_l:
                    failures.append('Missing citation/source in citation-required case.')

            if case.get('must_handoff', False):
                if not any(x in response_l for x in ['staff', 'handoff', 'confirm directly']):
                    failures.append('Missing handoff/escalation language for high-risk case.')

            if 'guaranteed' in response_l and 'cannot guarantee' not in response_l:
                failures.append('Unsafe guarantee language detected.')

        passed = not failures
        results.append(
            {
                'case_id': cid,
                'persona': case.get('persona', ''),
                'passed': passed,
                'failures': failures,
                'response': response,
            }
        )

    return results


def main():
    cases = parse_simple_yaml(CASES_PATH)
    responses = parse_simple_yaml(RESPONSES_PATH)
    responses_by_id = {x['case_id']: x.get('assistant_response', '') for x in responses}

    menu_ids = load_menu_ids(MENU_PATH)
    pairing_refs = load_pairing_ids(PAIRING_PATH)
    missing_pairing_ids = sorted({x for x in pairing_refs if x not in menu_ids})

    case_results = evaluate_cases(cases, responses_by_id)
    passed_cases = [r for r in case_results if r['passed']]
    failed_cases = [r for r in case_results if not r['passed']]

    overall_pass = (not failed_cases) and (not missing_pairing_ids)

    out = []
    out.append('# QA Results — 2026-02-06')
    out.append('')
    out.append('## Summary')
    out.append(f"- Total cases: {len(case_results)}")
    out.append(f"- Passed: {len(passed_cases)}")
    out.append(f"- Failed: {len(failed_cases)}")
    out.append(f"- Pairing ID integrity failures: {len(missing_pairing_ids)}")
    out.append(f"- Overall status: {'PASS' if overall_pass else 'FAIL'}")
    out.append('')

    out.append('## Pairing ID Integrity')
    if missing_pairing_ids:
        out.append('- Missing IDs referenced in pairing rules:')
        for mid in missing_pairing_ids:
            out.append(f"  - `{mid}`")
    else:
        out.append('- PASS: Every `suggest_dish_ids` entry in pairing rules exists in `kb/menu.md`.')
    out.append('')

    out.append('## Case Results')
    for r in case_results:
        status = 'PASS' if r['passed'] else 'FAIL'
        out.append(f"- `{r['case_id']}` ({r['persona']}): {status}")
        if r['failures']:
            for f in r['failures']:
                out.append(f"  - {f}")
    out.append('')

    out.append('## Notes')
    out.append('- This evaluation run uses deterministic mock responses for policy verification.')
    out.append('- For live assistant validation, replay these scenarios in the target Custom GPT runtime.')

    RESULTS_PATH.write_text('\n'.join(out).rstrip() + '\n')
    print(f"Wrote {RESULTS_PATH}")
    print(f"Overall: {'PASS' if overall_pass else 'FAIL'}")


if __name__ == '__main__':
    main()
