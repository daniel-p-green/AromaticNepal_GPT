import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AlertTriangle, ArrowRightCircle, BookOpen, CheckCircle, Layers, Shield} from '@geist-ui/icons';
import {fadeIn, scaleIn, slideUp} from './geistAnimations';
import {geist} from './geistTheme';

const HOOK_FRAMES = 105;
const PROBLEM_FRAMES = 135;
const SOLUTION_FRAMES = 135;
const CTA_FRAMES = 120;

const SAFE_ZONE = {
  top: 300,
  bottom: 380,
  left: 80,
  right: 120,
};

const BRIGHT_COPY = '#D8D8D8';

export const INSTAGRAM_AD_FRAMES = HOOK_FRAMES + PROBLEM_FRAMES + SOLUTION_FRAMES + CTA_FRAMES;

const SafeZone: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div
    style={{
      position: 'absolute',
      top: SAFE_ZONE.top,
      bottom: SAFE_ZONE.bottom,
      left: SAFE_ZONE.left,
      right: SAFE_ZONE.right,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

const BackgroundField: React.FC<{frame: number; duration: number; accent: string; variant: 'hook' | 'problem' | 'solution' | 'cta'}> = ({
  frame,
  duration,
  accent,
  variant,
}) => {
  const driftA = interpolate(frame, [0, duration], [-70, 80], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const driftB = interpolate(frame, [0, duration], [60, -58], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const stripeShift = interpolate(frame, [0, duration], [0, 90], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const baseByVariant: Record<typeof variant, string> = {
    hook: 'radial-gradient(circle at 20% 20%, rgba(0, 112, 243, 0.35), transparent 48%), radial-gradient(circle at 82% 84%, rgba(70, 167, 88, 0.22), transparent 54%), #090909',
    problem: 'radial-gradient(circle at 18% 78%, rgba(229, 72, 77, 0.3), transparent 50%), radial-gradient(circle at 82% 18%, rgba(0, 112, 243, 0.2), transparent 46%), #090909',
    solution: 'radial-gradient(circle at 15% 16%, rgba(70, 167, 88, 0.34), transparent 46%), radial-gradient(circle at 82% 86%, rgba(0, 112, 243, 0.26), transparent 52%), #090909',
    cta: 'radial-gradient(circle at 80% 22%, rgba(0, 112, 243, 0.33), transparent 45%), radial-gradient(circle at 18% 84%, rgba(255, 178, 36, 0.24), transparent 54%), #090909',
  };

  return (
    <>
      <AbsoluteFill style={{background: baseByVariant[variant]}} />
      <div
        style={{
          position: 'absolute',
          width: 540,
          height: 540,
          borderRadius: 999,
          top: -180,
          left: -140,
          background: accent,
          opacity: 0.24,
          filter: 'blur(118px)',
          transform: `translate(${driftA}px, ${driftB * 0.2}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 470,
          height: 470,
          borderRadius: 999,
          bottom: -210,
          right: -150,
          background: 'rgba(237, 237, 237, 0.16)',
          opacity: 0.2,
          filter: 'blur(126px)',
          transform: `translate(${driftB}px, ${-driftA * 0.2}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(118deg, rgba(237, 237, 237, 0.06) 0px, rgba(237, 237, 237, 0.06) 1px, transparent 1px, transparent 58px)',
          opacity: 0.11,
          transform: `translateX(${stripeShift}px)`,
        }}
      />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.2) 0%, rgba(10, 10, 10, 0.76) 100%)'}} />
    </>
  );
};

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const barWidth = interpolate(frame, [0, HOOK_FRAMES], [0.08, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const iconScale = scaleIn(frame, fps, 0.06, 0.84);

  return (
    <AbsoluteFill style={{backgroundColor: geist.colors.background100}}>
      <BackgroundField frame={frame} duration={HOOK_FRAMES} accent={geist.colors.blue700} variant="hook" />
      <SafeZone>
        <div
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            borderRadius: 999,
            border: `1px solid ${geist.colors.gray400}`,
            backgroundColor: 'rgba(23, 23, 23, 0.94)',
            padding: '10px 14px',
            marginBottom: 16,
          }}
        >
          <Layers size={16} color={geist.colors.blue700} />
          <span style={{fontFamily: geist.fonts.mono, fontSize: 15, color: geist.colors.gray1000}}>Template-first pilot</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12}}>
          <div style={{transform: `scale(${iconScale})`}}>
            <AlertTriangle size={74} color={geist.colors.red700} />
          </div>
          <div style={{fontFamily: geist.fonts.sans, color: BRIGHT_COPY, fontSize: 32, fontWeight: 500, lineHeight: 1.2, maxWidth: 500}}>
            Hospitality is emotional work under constant time pressure.
          </div>
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: geist.fonts.sans,
            color: geist.colors.gray1000,
            fontSize: 74,
            fontWeight: 600,
            letterSpacing: -2.1,
            lineHeight: 1.03,
            opacity: fadeIn(frame, fps, 0.1, 0.3),
            transform: `translateY(${slideUp(frame, fps, 0.1, 18)}px)`,
          }}
        >
          Can service support scale?
        </h1>
        <div
          style={{
            marginTop: 22,
            width: '100%',
            height: 8,
            borderRadius: 999,
            backgroundColor: 'rgba(115, 115, 115, 0.35)',
            overflow: 'hidden',
          }}
        >
          <div style={{width: `${barWidth * 100}%`, height: '100%', borderRadius: 999, backgroundColor: geist.colors.blue700}} />
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};

const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pains = ['Menu answers drift by shift', 'Allergy questions need explicit handoff', 'Owner stories do not reach every table'];

  return (
    <AbsoluteFill style={{backgroundColor: geist.colors.background100}}>
      <BackgroundField frame={frame} duration={PROBLEM_FRAMES} accent={geist.colors.red700} variant="problem" />
      <SafeZone>
        <h2 style={{margin: '0 0 18px 0', fontFamily: geist.fonts.sans, color: geist.colors.gray1000, fontWeight: 600, fontSize: 60, lineHeight: 1.05, letterSpacing: -1.8}}>
          Common breakdowns
        </h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {pains.map((pain, index) => {
            const delay = 0.1 + index * 0.1;

            return (
              <div
                key={pain}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '46px 1fr',
                  alignItems: 'center',
                  gap: 10,
                  borderRadius: 14,
                  border: `1px solid ${geist.colors.gray500}`,
                  backgroundColor: 'rgba(23, 23, 23, 0.93)',
                  padding: '15px 14px',
                  opacity: fadeIn(frame, fps, delay, 0.24),
                  transform: `translateY(${slideUp(frame, fps, delay, 14)}px)`,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    border: `1px solid ${geist.colors.gray400}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: geist.fonts.mono,
                    color: geist.colors.gray1000,
                    fontSize: 15,
                  }}
                >
                  {index + 1}
                </div>
                <div style={{fontFamily: geist.fonts.sans, color: geist.colors.gray1000, fontSize: 32, fontWeight: 500, lineHeight: 1.24}}>{pain}</div>
              </div>
            );
          })}
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};

const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const stacks = [
    {label: 'Prompt guardrails', detail: 'Boundaries + escalation language', Icon: Shield, color: geist.colors.green700},
    {label: 'Source-backed KB', detail: 'Menu facts + freshness checks', Icon: BookOpen, color: geist.colors.blue700},
    {label: 'Transcript QA gate', detail: 'Release only after pass criteria', Icon: CheckCircle, color: geist.colors.green700},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: geist.colors.background100}}>
      <BackgroundField frame={frame} duration={SOLUTION_FRAMES} accent={geist.colors.green700} variant="solution" />
      <SafeZone>
        <h2 style={{margin: 0, fontFamily: geist.fonts.sans, color: geist.colors.gray1000, fontWeight: 600, fontSize: 60, lineHeight: 1.05, letterSpacing: -1.7}}>
          Build it as a template system
        </h2>
        <p style={{margin: '12px 0 16px 0', fontFamily: geist.fonts.sans, color: BRIGHT_COPY, fontSize: 30, lineHeight: 1.24}}>
          Reusable components beat one-off prompts.
        </p>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {stacks.map((item, index) => {
            const ItemIcon = item.Icon;
            const delay = 0.12 + index * 0.09;
            return (
              <div
                key={item.label}
                style={{
                  borderRadius: 14,
                  border: `1px solid ${geist.colors.gray500}`,
                  backgroundColor: 'rgba(23, 23, 23, 0.93)',
                  padding: '13px 13px',
                  display: 'grid',
                  gridTemplateColumns: '42px 1fr',
                  gap: 10,
                  alignItems: 'center',
                  opacity: fadeIn(frame, fps, delay, 0.22),
                  transform: `translateY(${slideUp(frame, fps, delay, 12)}px)`,
                }}
              >
                <ItemIcon size={22} color={item.color} />
                <div style={{display: 'flex', flexDirection: 'column', gap: 2}}>
                  <div style={{fontFamily: geist.fonts.sans, color: geist.colors.gray1000, fontSize: 32, fontWeight: 600, lineHeight: 1.14}}>{item.label}</div>
                  <div style={{fontFamily: geist.fonts.sans, color: BRIGHT_COPY, fontSize: 25, lineHeight: 1.2}}>{item.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};

const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: geist.colors.background100}}>
      <BackgroundField frame={frame} duration={CTA_FRAMES} accent={geist.colors.blue700} variant="cta" />
      <SafeZone>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 13px',
            borderRadius: 999,
            border: `1px solid ${geist.colors.gray400}`,
            backgroundColor: 'rgba(23, 23, 23, 0.94)',
            marginBottom: 16,
          }}
        >
          <CheckCircle size={16} color={geist.colors.green700} />
          <span style={{fontFamily: geist.fonts.mono, color: geist.colors.gray1000, fontSize: 15}}>Unofficial concept | Unpaid</span>
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: geist.fonts.sans,
            color: geist.colors.gray1000,
            fontWeight: 600,
            fontSize: 64,
            lineHeight: 1.06,
            letterSpacing: -1.9,
            opacity: fadeIn(frame, fps, 0.08, 0.3),
            transform: `translateY(${slideUp(frame, fps, 0.08, 16)}px)`,
          }}
        >
          Share the template mindset, not a branded deliverable.
        </h2>
        <p style={{margin: '14px 0 20px 0', fontFamily: geist.fonts.sans, color: BRIGHT_COPY, fontSize: 31, lineHeight: 1.26}}>
          Help teams train faster and give diners clear, culture-rich menu guidance.
        </p>
        <div
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: geist.colors.blue700,
            color: '#FFFFFF',
            borderRadius: 999,
            padding: '13px 20px',
            fontFamily: geist.fonts.sans,
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          Start your own template
          <ArrowRightCircle size={19} color="#FFFFFF" />
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};

export const InstagramPilotAdPortrait: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = interpolate(frame, [0, INSTAGRAM_AD_FRAMES - 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const premountFrames = Math.round(fps * 0.4);

  return (
    <AbsoluteFill style={{backgroundColor: geist.colors.background100}}>
      <Sequence from={0} durationInFrames={HOOK_FRAMES} premountFor={premountFrames}>
        <HookScene />
      </Sequence>
      <Sequence from={HOOK_FRAMES} durationInFrames={PROBLEM_FRAMES} premountFor={premountFrames}>
        <ProblemScene />
      </Sequence>
      <Sequence from={HOOK_FRAMES + PROBLEM_FRAMES} durationInFrames={SOLUTION_FRAMES} premountFor={premountFrames}>
        <SolutionScene />
      </Sequence>
      <Sequence from={HOOK_FRAMES + PROBLEM_FRAMES + SOLUTION_FRAMES} durationInFrames={CTA_FRAMES} premountFor={premountFrames}>
        <CtaScene />
      </Sequence>
      <div
        style={{
          position: 'absolute',
          left: SAFE_ZONE.left,
          right: SAFE_ZONE.right,
          bottom: 66,
          height: 8,
          borderRadius: 999,
          backgroundColor: 'rgba(115, 115, 115, 0.38)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            borderRadius: 999,
            backgroundColor: geist.colors.blue700,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
