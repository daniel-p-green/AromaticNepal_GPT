import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AlertTriangle, ArrowRightCircle, BookOpen, CheckCircle, Layers, Shield, Users, Zap} from '@geist-ui/icons';
import {fadeIn, scaleIn, slideUp} from './geistAnimations';
import {geist} from './geistTheme';

type IconType = React.ComponentType<{size?: number; color?: string; strokeWidth?: number}>;

type Scene = {
  id: string;
  layout: 'hero' | 'split' | 'grid' | 'timeline' | 'cta';
  frames: number;
  tag: string;
  title: string;
  subtitle: string;
  accent: string;
  Icon: IconType;
  points?: string[];
};

type GridItem = {
  label: string;
  detail: string;
  color: string;
  Icon: IconType;
};

const BRIGHT_COPY = '#D8D8D8';

const LANDSCAPE_SCENES: Scene[] = [
  {
    id: 'intro',
    layout: 'hero',
    frames: 120,
    tag: 'Why this matters',
    title: 'Most restaurants answer the same questions all day.',
    subtitle:
      'I built this unpaid demo after seeing how much time goes to menu repeats, allergy checks, and telling the story behind each dish.',
    accent: geist.colors.blue700,
    Icon: Layers,
  },
  {
    id: 'problem',
    layout: 'split',
    frames: 125,
    tag: 'Where it breaks',
    title: 'Busy hours expose every gap.',
    subtitle: 'When facts are fuzzy, service slows down and everyone feels it.',
    accent: geist.colors.red700,
    Icon: AlertTriangle,
    points: ['The same dish gets described three different ways', 'Allergy questions pause the whole line', 'Great stories stay in the kitchen'],
  },
  {
    id: 'template',
    layout: 'grid',
    frames: 130,
    tag: 'What the template includes',
    title: 'A small system your team can trust',
    subtitle: 'No magic. Just clear rules, clean facts, and testing before launch.',
    accent: geist.colors.green700,
    Icon: Users,
  },
  {
    id: 'flow',
    layout: 'timeline',
    frames: 130,
    tag: 'How to roll it out',
    title: 'Start simple, then tighten',
    subtitle: 'Ship a first version, learn fast, and keep facts current.',
    accent: geist.colors.amber700,
    Icon: Shield,
  },
  {
    id: 'cta',
    layout: 'cta',
    frames: 120,
    tag: 'Reality check',
    title: 'This is a template, not paid client work.',
    subtitle: 'Use it as a starting draft, swap in your own menu and voice, and keep it unofficial unless you have permission.',
    accent: geist.colors.blue700,
    Icon: BookOpen,
  },
];

const PROCESS_STEPS = ['Pull menu facts from one source', 'Write safe fallback and handoff language', 'Run transcript checks before publishing', 'Review feedback and refresh monthly'];

const GRID_ITEMS: GridItem[] = [
  {label: 'Answer guide', detail: 'How to reply and when to escalate', Icon: Shield, color: geist.colors.green700},
  {label: 'Menu source', detail: 'One place for current dish facts', Icon: BookOpen, color: geist.colors.blue700},
  {label: 'Test chats', detail: 'Real scenarios with pass-fail checks', Icon: CheckCircle, color: geist.colors.green700},
  {label: 'Owner voice', detail: 'Short culture notes in plain language', Icon: Zap, color: geist.colors.amber700},
];

export const GEIST_LANDSCAPE_FRAMES = LANDSCAPE_SCENES.reduce((sum, scene) => sum + scene.frames, 0);

const sceneStarts = LANDSCAPE_SCENES.reduce<number[]>((acc, scene) => {
  if (acc.length === 0) {
    return [0];
  }
  return [...acc, acc[acc.length - 1] + LANDSCAPE_SCENES[acc.length - 1].frames];
}, []);

const baseByLayout: Record<Scene['layout'], string> = {
  hero: 'radial-gradient(circle at 20% 20%, rgba(0, 112, 243, 0.28), transparent 42%), radial-gradient(circle at 80% 78%, rgba(70, 167, 88, 0.24), transparent 52%), #070707',
  split: 'radial-gradient(circle at 18% 80%, rgba(229, 72, 77, 0.26), transparent 48%), radial-gradient(circle at 84% 18%, rgba(0, 112, 243, 0.22), transparent 42%), #080808',
  grid: 'radial-gradient(circle at 15% 24%, rgba(70, 167, 88, 0.28), transparent 48%), radial-gradient(circle at 80% 80%, rgba(0, 112, 243, 0.24), transparent 54%), #080808',
  timeline: 'radial-gradient(circle at 78% 24%, rgba(255, 178, 36, 0.27), transparent 48%), radial-gradient(circle at 16% 80%, rgba(0, 112, 243, 0.2), transparent 46%), #080808',
  cta: 'radial-gradient(circle at 76% 22%, rgba(0, 112, 243, 0.28), transparent 40%), radial-gradient(circle at 18% 78%, rgba(70, 167, 88, 0.2), transparent 48%), #070707',
};

const BackgroundLayer: React.FC<{scene: Scene; frame: number; width: number; height: number}> = ({scene, frame, width, height}) => {
  const driftA = interpolate(frame, [0, scene.frames], [-130, 130], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const driftB = interpolate(frame, [0, scene.frames], [90, -95], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scanShift = interpolate(frame, [0, scene.frames], [0, 180], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const glow = Math.max(width, height) * 0.76;

  return (
    <>
      <AbsoluteFill style={{background: baseByLayout[scene.layout]}} />
      <div
        style={{
          position: 'absolute',
          top: -glow * 0.22,
          left: -glow * 0.18,
          width: glow,
          height: glow,
          borderRadius: 999,
          background: scene.accent,
          opacity: 0.21,
          filter: 'blur(132px)',
          transform: `translate(${driftA}px, ${driftB * 0.25}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -glow * 0.28,
          right: -glow * 0.2,
          width: glow * 0.86,
          height: glow * 0.86,
          borderRadius: 999,
          background: 'rgba(237, 237, 237, 0.16)',
          opacity: 0.18,
          filter: 'blur(146px)',
          transform: `translate(${driftB}px, ${-driftA * 0.2}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(110deg, rgba(237, 237, 237, 0.06) 0px, rgba(237, 237, 237, 0.06) 1px, transparent 1px, transparent 72px)',
          opacity: 0.12,
          transform: `translateX(${scanShift}px)`,
        }}
      />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.22) 0%, rgba(10, 10, 10, 0.7) 100%)'}} />
    </>
  );
};

const SceneShell: React.FC<{scene: Scene; children: React.ReactNode}> = ({scene, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [0, 12, scene.frames - 20, scene.frames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rise = slideUp(frame, fps, 0, 24);
  const Icon = scene.Icon;

  return (
    <AbsoluteFill style={{opacity, transform: `translateY(${rise}px)`}}>
      <div
        style={{
          position: 'absolute',
          left: 72,
          top: 48,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          border: `1px solid ${geist.colors.gray400}`,
          backgroundColor: 'rgba(23, 23, 23, 0.92)',
          borderRadius: 999,
          padding: '10px 16px',
        }}
      >
        <Icon size={18} color={scene.accent} />
        <span style={{fontFamily: geist.fonts.mono, fontSize: 16, color: geist.colors.gray1000}}>{scene.tag}</span>
      </div>
      <AbsoluteFill style={{padding: '140px 96px 104px 96px'}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

const HeroLayout: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const supportCards = ['Guests get clear answers faster', 'New staff ramp up with less stress', 'Owner perspective reaches every table'];

  return (
    <div style={{display: 'grid', gridTemplateRows: 'auto auto', gap: 26, alignContent: 'center', height: '100%'}}>
      <div style={{maxWidth: 1450}}>
        <h1
          style={{
            margin: 0,
            fontFamily: geist.fonts.sans,
            fontWeight: 600,
            fontSize: 102,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: geist.colors.gray1000,
            opacity: fadeIn(frame, fps, 0.08, 0.34),
            transform: `translateY(${slideUp(frame, fps, 0.08, 28)}px)`,
          }}
        >
          {scene.title}
        </h1>
        <p
          style={{
            marginTop: 20,
            marginBottom: 0,
            maxWidth: 1280,
            fontFamily: geist.fonts.sans,
            fontWeight: 500,
            fontSize: 36,
            lineHeight: 1.33,
            color: BRIGHT_COPY,
            opacity: fadeIn(frame, fps, 0.22, 0.36),
          }}
        >
          {scene.subtitle}
        </p>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12}}>
        {supportCards.map((card, index) => (
          <div
            key={card}
            style={{
              borderRadius: 14,
              border: `1px solid ${geist.colors.gray500}`,
              backgroundColor: 'rgba(23, 23, 23, 0.9)',
              padding: '14px 16px',
              opacity: fadeIn(frame, fps, 0.28 + index * 0.08, 0.22),
              transform: `translateY(${slideUp(frame, fps, 0.28 + index * 0.08, 16)}px)`,
              fontFamily: geist.fonts.sans,
              fontSize: 24,
              color: geist.colors.gray1000,
              lineHeight: 1.27,
              fontWeight: 500,
            }}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

const SplitLayout: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 28, height: '100%'}}>
      <div style={{alignSelf: 'center'}}>
        <h2 style={{margin: 0, fontFamily: geist.fonts.sans, fontWeight: 600, fontSize: 88, lineHeight: 1.04, letterSpacing: -2.3, color: geist.colors.gray1000}}>
          {scene.title}
        </h2>
        <p style={{marginTop: 18, fontFamily: geist.fonts.sans, fontSize: 34, color: BRIGHT_COPY, lineHeight: 1.3}}>{scene.subtitle}</p>
      </div>
      <div style={{alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: 12}}>
        {(scene.points || []).map((point, index) => {
          const delay = 0.16 + index * 0.1;
          return (
            <div
              key={point}
              style={{
                backgroundColor: 'rgba(23, 23, 23, 0.92)',
                border: `1px solid ${geist.colors.gray500}`,
                borderRadius: 14,
                padding: '14px 16px',
                opacity: fadeIn(frame, fps, delay, 0.24),
                transform: `translateY(${slideUp(frame, fps, delay, 16)}px)`,
              }}
            >
              <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                <AlertTriangle size={20} color={scene.accent} />
                <div style={{fontFamily: geist.fonts.sans, color: geist.colors.gray1000, fontSize: 28, fontWeight: 500, lineHeight: 1.24}}>{point}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GridLayout: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'grid', gridTemplateRows: 'auto 1fr', gap: 20, height: '100%'}}>
      <div>
        <h2 style={{margin: 0, fontFamily: geist.fonts.sans, fontSize: 84, fontWeight: 600, letterSpacing: -2.2, color: geist.colors.gray1000}}>{scene.title}</h2>
        <p style={{margin: '14px 0 0 0', fontFamily: geist.fonts.sans, fontSize: 34, color: BRIGHT_COPY, lineHeight: 1.28}}>{scene.subtitle}</p>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13}}>
        {GRID_ITEMS.map((item, index) => {
          const ItemIcon = item.Icon;
          const delay = 0.12 + index * 0.08;

          return (
            <div
              key={item.label}
              style={{
                borderRadius: 18,
                border: `1px solid ${geist.colors.gray500}`,
                backgroundColor: 'rgba(23, 23, 23, 0.92)',
                padding: '18px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                opacity: fadeIn(frame, fps, delay, 0.22),
                transform: `scale(${scaleIn(frame, fps, delay, 0.9)})`,
                transformOrigin: 'center',
              }}
            >
              <ItemIcon size={24} color={item.color} />
              <div style={{fontFamily: geist.fonts.sans, color: geist.colors.gray1000, fontSize: 31, fontWeight: 600, lineHeight: 1.1}}>{item.label}</div>
              <div style={{fontFamily: geist.fonts.sans, color: BRIGHT_COPY, fontSize: 24, lineHeight: 1.25}}>{item.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TimelineLayout: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'grid', gridTemplateColumns: '0.98fr 1.02fr', gap: 30, height: '100%'}}>
      <div style={{alignSelf: 'center'}}>
        <h2 style={{margin: 0, fontFamily: geist.fonts.sans, fontSize: 84, fontWeight: 600, color: geist.colors.gray1000, letterSpacing: -2.1}}>{scene.title}</h2>
        <p style={{margin: '16px 0 0 0', fontFamily: geist.fonts.sans, fontSize: 33, color: BRIGHT_COPY, lineHeight: 1.3}}>{scene.subtitle}</p>
      </div>
      <div style={{alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: 10}}>
        {PROCESS_STEPS.map((step, index) => {
          const delay = 0.14 + index * 0.1;

          return (
            <div
              key={step}
              style={{
                display: 'grid',
                gridTemplateColumns: '52px 1fr',
                gap: 12,
                alignItems: 'center',
                opacity: fadeIn(frame, fps, delay, 0.22),
                transform: `translateY(${slideUp(frame, fps, delay, 14)}px)`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  backgroundColor: 'rgba(23, 23, 23, 0.94)',
                  border: `1px solid ${geist.colors.gray400}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: geist.colors.gray1000,
                  fontFamily: geist.fonts.mono,
                  fontSize: 17,
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  borderRadius: 12,
                  border: `1px solid ${geist.colors.gray500}`,
                  backgroundColor: 'rgba(23, 23, 23, 0.9)',
                  padding: '13px 14px',
                  fontFamily: geist.fonts.sans,
                  fontSize: 25,
                  color: geist.colors.gray1000,
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CtaLayout: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 24, height: '100%'}}>
      <div style={{alignSelf: 'center', maxWidth: 1240}}>
        <h2 style={{margin: 0, fontFamily: geist.fonts.sans, fontSize: 86, lineHeight: 1.04, letterSpacing: -2.3, fontWeight: 600, color: geist.colors.gray1000}}>
          {scene.title}
        </h2>
        <p style={{margin: '16px 0 0 0', fontFamily: geist.fonts.sans, fontSize: 34, lineHeight: 1.31, color: BRIGHT_COPY}}>{scene.subtitle}</p>
        <div
          style={{
            marginTop: 30,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 22px',
            borderRadius: 999,
            backgroundColor: geist.colors.blue700,
            color: '#FFFFFF',
            fontFamily: geist.fonts.sans,
            fontSize: 28,
            fontWeight: 600,
            opacity: fadeIn(frame, fps, 0.18, 0.28),
            transform: `translateY(${slideUp(frame, fps, 0.18, 14)}px)`,
          }}
        >
          Copy this template
          <ArrowRightCircle size={20} color="#FFFFFF" />
        </div>
      </div>
      <div
        style={{
          alignSelf: 'end',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: '15px 15px',
          border: `1px solid ${geist.colors.gray500}`,
          borderRadius: 14,
          backgroundColor: 'rgba(23, 23, 23, 0.92)',
          width: 460,
        }}
      >
        <div style={{fontFamily: geist.fonts.mono, fontSize: 16, color: geist.colors.gray900}}>PROJECT STATUS</div>
        <div style={{fontFamily: geist.fonts.sans, fontSize: 24, color: geist.colors.gray1000, lineHeight: 1.22}}>
          Independent demo built for learning
        </div>
        <div style={{fontFamily: geist.fonts.sans, fontSize: 22, color: BRIGHT_COPY, lineHeight: 1.25}}>
          Family-friend context, unpaid, and unofficial.
        </div>
      </div>
    </div>
  );
};

const LayoutByType: React.FC<{scene: Scene}> = ({scene}) => {
  switch (scene.layout) {
    case 'hero':
      return <HeroLayout scene={scene} />;
    case 'split':
      return <SplitLayout scene={scene} />;
    case 'grid':
      return <GridLayout scene={scene} />;
    case 'timeline':
      return <TimelineLayout scene={scene} />;
    case 'cta':
      return <CtaLayout scene={scene} />;
    default:
      return null;
  }
};

export const GeistPilotLandscape: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const progress = interpolate(frame, [0, GEIST_LANDSCAPE_FRAMES - 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const labelScale = scaleIn(frame, fps, 0, 0.92);
  const premountFrames = Math.round(fps * 0.4);

  return (
    <AbsoluteFill style={{backgroundColor: geist.colors.background100}}>
      {LANDSCAPE_SCENES.map((scene, index) => (
        <Sequence key={scene.id} from={sceneStarts[index]} durationInFrames={scene.frames} premountFor={premountFrames}>
          <AbsoluteFill style={{overflow: 'hidden'}}>
            <BackgroundLayer scene={scene} frame={frame - sceneStarts[index]} width={width} height={height} />
            <SceneShell scene={scene}>
              <LayoutByType scene={scene} />
            </SceneShell>
          </AbsoluteFill>
        </Sequence>
      ))}

      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 46,
          borderRadius: 999,
          border: `1px solid ${geist.colors.gray400}`,
          backgroundColor: 'rgba(23, 23, 23, 0.94)',
          padding: '10px 16px',
          transform: `scale(${labelScale})`,
        }}
      >
        <span style={{fontFamily: geist.fonts.mono, fontSize: 16, color: geist.colors.gray1000}}>Ethnic Restaurant GPT Template</span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 48,
          right: 48,
          bottom: 34,
          height: 6,
          borderRadius: 999,
          backgroundColor: 'rgba(115, 115, 115, 0.42)',
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
