import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AlertTriangle, ArrowRightCircle, BookOpen, CheckCircle, Layers, Shield} from '@geist-ui/icons';
import {fadeIn, scaleIn, slideUp} from './geistAnimations';
import {geist} from './geistTheme';

type IconType = React.ComponentType<{size?: number; color?: string; strokeWidth?: number}>;

type SquareScene = {
  id: string;
  frames: number;
  tag: string;
  title: string;
  subtitle: string;
  accent: string;
  Icon: IconType;
};

const SQUARE_SCENES: SquareScene[] = [
  {
    id: 'hook',
    frames: 120,
    tag: 'LinkedIn-safe format',
    title: 'What if every table got the same clear answer?',
    subtitle: 'This demo shows a practical GPT setup that restaurants can adapt in a day.',
    accent: geist.colors.blue700,
    Icon: Layers,
  },
  {
    id: 'problem',
    frames: 120,
    tag: 'Real pressure points',
    title: 'Why this problem keeps showing up',
    subtitle: 'Teams move fast. Answers drift. Allergy questions get risky when facts are fuzzy.',
    accent: geist.colors.red700,
    Icon: AlertTriangle,
  },
  {
    id: 'system',
    frames: 120,
    tag: 'What is actually inside',
    title: 'Four parts you can maintain',
    subtitle: 'A small stack that works without a full tech team.',
    accent: geist.colors.green700,
    Icon: BookOpen,
  },
  {
    id: 'cta',
    frames: 120,
    tag: 'What this is',
    title: 'Use this as your starting draft',
    subtitle: 'Replace the menu and voice, test with transcripts, and keep rollout clearly unofficial.',
    accent: geist.colors.blue700,
    Icon: CheckCircle,
  },
];

const SYSTEM_ITEMS = [
  {label: 'Answer guide', Icon: Shield, color: geist.colors.green700},
  {label: 'Menu facts', Icon: BookOpen, color: geist.colors.blue700},
  {label: 'Test chats', Icon: CheckCircle, color: geist.colors.green700},
  {label: 'Handoff rules', Icon: AlertTriangle, color: geist.colors.amber700},
];

const sceneStarts = SQUARE_SCENES.reduce<number[]>((acc, scene) => {
  if (acc.length === 0) {
    return [0];
  }
  return [...acc, acc[acc.length - 1] + SQUARE_SCENES[acc.length - 1].frames];
}, []);

export const LINKEDIN_SQUARE_FRAMES = SQUARE_SCENES.reduce((sum, scene) => sum + scene.frames, 0);

const bgByScene = [
  'radial-gradient(circle at 18% 18%, rgba(0, 112, 243, 0.3), transparent 50%), radial-gradient(circle at 84% 84%, rgba(70, 167, 88, 0.22), transparent 54%), #090909',
  'radial-gradient(circle at 18% 82%, rgba(229, 72, 77, 0.28), transparent 50%), radial-gradient(circle at 84% 18%, rgba(0, 112, 243, 0.2), transparent 46%), #090909',
  'radial-gradient(circle at 14% 20%, rgba(70, 167, 88, 0.3), transparent 48%), radial-gradient(circle at 86% 82%, rgba(0, 112, 243, 0.24), transparent 52%), #090909',
  'radial-gradient(circle at 84% 20%, rgba(0, 112, 243, 0.32), transparent 46%), radial-gradient(circle at 18% 82%, rgba(255, 178, 36, 0.22), transparent 54%), #090909',
];

const SceneBackground: React.FC<{index: number; frame: number; scene: SquareScene}> = ({index, frame, scene}) => {
  const driftA = interpolate(frame, [0, scene.frames], [-56, 64], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const driftB = interpolate(frame, [0, scene.frames], [52, -48], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <>
      <AbsoluteFill style={{background: bgByScene[index]}} />
      <div
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: 999,
          top: -140,
          left: -110,
          background: scene.accent,
          opacity: 0.25,
          filter: 'blur(98px)',
          transform: `translate(${driftA}px, ${driftB * 0.2}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 380,
          height: 380,
          borderRadius: 999,
          bottom: -150,
          right: -120,
          background: 'rgba(237, 237, 237, 0.15)',
          opacity: 0.2,
          filter: 'blur(100px)',
          transform: `translate(${driftB}px, ${-driftA * 0.2}px)`,
        }}
      />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.22), rgba(10, 10, 10, 0.8))'}} />
    </>
  );
};

const SquareShell: React.FC<{scene: SquareScene; children: React.ReactNode}> = ({scene, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const Icon = scene.Icon;

  return (
    <AbsoluteFill style={{opacity: fadeIn(frame, fps, 0, 0.25), transform: `translateY(${slideUp(frame, fps, 0, 12)}px)`}}>
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 64,
          borderRadius: 999,
          border: `1px solid ${geist.colors.gray400}`,
          backgroundColor: 'rgba(23, 23, 23, 0.94)',
          padding: '10px 14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Icon size={16} color={scene.accent} />
        <span style={{fontFamily: geist.fonts.mono, fontSize: 14, color: geist.colors.gray1000}}>{scene.tag}</span>
      </div>
      <AbsoluteFill style={{padding: '150px 84px 100px 84px'}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

const CopyScene: React.FC<{scene: SquareScene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
      <h1
        style={{
          margin: 0,
          fontFamily: geist.fonts.sans,
          fontSize: 76,
          letterSpacing: -2.2,
          lineHeight: 1.04,
          fontWeight: 600,
          color: geist.colors.gray1000,
          opacity: fadeIn(frame, fps, 0.06, 0.3),
          transform: `translateY(${slideUp(frame, fps, 0.06, 12)}px)`,
        }}
      >
        {scene.title}
      </h1>
      <p
        style={{
          margin: '18px 0 0 0',
          fontFamily: geist.fonts.sans,
          fontSize: 33,
          lineHeight: 1.28,
          fontWeight: 500,
          color: '#D8D8D8',
          opacity: fadeIn(frame, fps, 0.16, 0.32),
        }}
      >
        {scene.subtitle}
      </p>
    </div>
  );
};

const SystemScene: React.FC<{scene: SquareScene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'grid', gridTemplateRows: 'auto 1fr', gap: 18, height: '100%'}}>
      <div>
        <h1 style={{margin: 0, fontFamily: geist.fonts.sans, fontSize: 72, letterSpacing: -2.1, lineHeight: 1.04, fontWeight: 600, color: geist.colors.gray1000}}>
          {scene.title}
        </h1>
        <p style={{margin: '14px 0 0 0', fontFamily: geist.fonts.sans, fontSize: 31, lineHeight: 1.25, fontWeight: 500, color: '#D8D8D8'}}>
          {scene.subtitle}
        </p>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
        {SYSTEM_ITEMS.map((item, index) => {
          const ItemIcon = item.Icon;
          const delay = 0.12 + index * 0.08;
          return (
            <div
              key={item.label}
              style={{
                borderRadius: 14,
                border: `1px solid ${geist.colors.gray500}`,
                backgroundColor: 'rgba(23, 23, 23, 0.92)',
                padding: '16px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 10,
                opacity: fadeIn(frame, fps, delay, 0.22),
                transform: `scale(${scaleIn(frame, fps, delay, 0.92)})`,
              }}
            >
              <ItemIcon size={22} color={item.color} />
              <div style={{fontFamily: geist.fonts.sans, fontSize: 29, lineHeight: 1.14, fontWeight: 600, color: geist.colors.gray1000}}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CtaScene: React.FC<{scene: SquareScene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
      <h1 style={{margin: 0, fontFamily: geist.fonts.sans, fontSize: 74, lineHeight: 1.04, letterSpacing: -2.2, fontWeight: 600, color: geist.colors.gray1000}}>
        {scene.title}
      </h1>
      <p style={{margin: '16px 0 0 0', fontFamily: geist.fonts.sans, fontSize: 33, lineHeight: 1.28, fontWeight: 500, color: '#D8D8D8'}}>
        {scene.subtitle}
      </p>
      <div
        style={{
          marginTop: 24,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 18px',
          borderRadius: 999,
          backgroundColor: geist.colors.blue700,
          color: '#FFFFFF',
          fontFamily: geist.fonts.sans,
          fontSize: 27,
          fontWeight: 600,
          alignSelf: 'flex-start',
          opacity: fadeIn(frame, fps, 0.2, 0.28),
          transform: `translateY(${slideUp(frame, fps, 0.2, 10)}px)`,
        }}
        >
          Adapt this template
          <ArrowRightCircle size={18} color="#FFFFFF" />
        </div>
      </div>
  );
};

export const LinkedInSquareTemplate: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const premountFrames = Math.round(fps * 0.4);
  const progress = interpolate(frame, [0, LINKEDIN_SQUARE_FRAMES - 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: geist.colors.background100}}>
      {SQUARE_SCENES.map((scene, index) => (
        <Sequence key={scene.id} from={sceneStarts[index]} durationInFrames={scene.frames} premountFor={premountFrames}>
          <AbsoluteFill style={{overflow: 'hidden'}}>
            <SceneBackground scene={scene} frame={frame - sceneStarts[index]} index={index} />
            <SquareShell scene={scene}>
              {scene.id === 'system' ? <SystemScene scene={scene} /> : scene.id === 'cta' ? <CtaScene scene={scene} /> : <CopyScene scene={scene} />}
            </SquareShell>
          </AbsoluteFill>
        </Sequence>
      ))}
      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          bottom: 52,
          height: 7,
          borderRadius: 999,
          backgroundColor: 'rgba(115, 115, 115, 0.36)',
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
