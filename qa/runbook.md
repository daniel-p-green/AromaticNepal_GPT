# QA Runbook

## Inputs
- `qa/transcript_cases.yaml` (test definitions)
- `qa/mock_transcript_responses.yaml` (assistant outputs under test)
- `custom_gpt_package/kb/menu.md` (reference IDs)
- `custom_gpt_package/kb/pairing_rules.md` (pairing references)

## Commands
```bash
python3 qa/run_eval.py
```

## Generated Output
- `qa/results_2026-02-06.md` (or run-date equivalent)

## What `run_eval.py` checks
1. Every transcript case has a response.
2. Required phrases are present.
3. Forbidden phrases are absent.
4. Citation-required cases include a URL.
5. Handoff-required cases include staff/escalation wording.
6. Pairing rule `suggest_dish_ids` all exist in `kb/menu.md`.

## Failure Handling
- Update prompt/KB content and rerun until all cases pass.
- Do not publish with safety or citation failures.
