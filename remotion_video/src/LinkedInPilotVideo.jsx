import React from 'react';
import {
	AbsoluteFill,
	Easing,
	Img,
	Sequence,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {loadFont as loadDisplayFont} from '@remotion/google-fonts/CormorantGaramond';
import {loadFont as loadBodyFont} from '@remotion/google-fonts/Manrope';

const {fontFamily: displayFamily} = loadDisplayFont('normal', {
	weights: ['700'],
});
const {fontFamily: bodyFamily} = loadBodyFont('normal', {
	weights: ['400', '600', '700'],
});

const SCENE_DURATION = 150;

const SCENES = [
	{
		eyebrow: 'Restaurant Reality',
		headline: 'Running a restaurant is hard enough.',
		body: 'The pilot idea is simple: use a Custom GPT to extend service quality without losing hospitality.',
		points: [
			'Reduce repetitive menu Q&A pressure',
			'Give every guest a thoughtful first answer',
		],
		image: 'team-scene.jpg',
		accent: '#F59E0B',
	},
	{
		eyebrow: 'Staff Enablement',
		headline: 'Train your team with one trusted voice.',
		body: 'New staff learn faster when menu context, allergy guardrails, and pairing logic are always on demand.',
		points: [
			'Consistent answers across every shift',
			'Safer handoffs for allergy-sensitive guests',
		],
		image: 'dining-scene.jpg',
		accent: '#F97316',
	},
	{
		eyebrow: 'Owner Story',
		headline: 'Scale the owner point of view.',
		body: 'Imagine every diner hearing the story behind a dish, the seasoning choices, and why the restaurant exists.',
		points: [
			'Culture becomes part of service',
			'Storytelling stops being bottlenecked',
		],
		image: 'hero-food.png',
		accent: '#FBBF24',
	},
	{
		eyebrow: 'Guest Experience',
		headline: 'Fact-based, fresh answers for diners.',
		body: 'A GPT can cite canonical menu sources, avoid invented details, and keep recommendations clear and respectful.',
		points: [
			'Better than vague menu guesswork',
			'Better than generic recommendation bots',
		],
		image: 'dining-scene.jpg',
		accent: '#FB923C',
	},
	{
		eyebrow: 'Service Reimagined',
		headline: 'Add dimension to food service.',
		body: 'This is not replacing people. It is helping teams surprise and delight while protecting energy during busy hours.',
		points: ['Service feels more personal at scale', 'Owners gain leverage without losing soul'],
		image: 'team-scene.jpg',
		accent: '#FCD34D',
	},
	{
		eyebrow: 'Pilot Blueprint',
		headline: 'Template first. Example driven.',
		body: 'A family-friend concept was the initial example. The playbook is reusable for any ethnic restaurant that wants to modernize hospitality.',
		points: ['Custom GPT first, API hardening later', 'Unofficial pilot, transparent disclaimers'],
		image: 'hero-food.png',
		accent: '#FDBA74',
	},
];

export const TOTAL_FRAMES = SCENES.length * SCENE_DURATION;

const SpiceOrb = ({color, size, top, left, delay}) => {
	const frame = useCurrentFrame();
	const floatY = Math.sin((frame + delay) / 18) * 14;
	const floatX = Math.cos((frame + delay) / 23) * 10;

	return (
		<div
			style={{
				position: 'absolute',
				top,
				left,
				width: size,
				height: size,
				borderRadius: size,
				backgroundColor: color,
				filter: 'blur(0.3px)',
				opacity: 0.22,
				transform: `translate(${floatX}px, ${floatY}px)`,
			}}
		/>
	);
};

const Scene = ({scene, sceneIndex, orientation}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const isPortrait = orientation === 'portrait';

	const enter = spring({
		fps,
		frame,
		config: {
			damping: 200,
			stiffness: 120,
			mass: 0.7,
		},
	});

	const cardOpacity = interpolate(
		frame,
		[0, 12, SCENE_DURATION - 18, SCENE_DURATION],
		[0, 1, 1, 0],
		{
			easing: Easing.bezier(0.2, 0, 0.2, 1),
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	const cardY = interpolate(enter, [0, 1], [42, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const imageScale = interpolate(frame, [0, SCENE_DURATION], [1.04, 1.12], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const imageX = interpolate(frame, [0, SCENE_DURATION], [-16, 16], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const maxTextWidth = isPortrait ? width - 120 : Math.min(980, width * 0.56);
	const headlineSize = isPortrait ? 78 : 84;
	const bodySize = isPortrait ? 35 : 36;
	const bulletSize = isPortrait ? 28 : 30;
	const contentTop = isPortrait ? 210 : 140;

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			<Img
				src={staticFile(scene.image)}
				style={{
					position: 'absolute',
					inset: -30,
					width: width + 60,
					height: height + 60,
					objectFit: 'cover',
					transform: `translateX(${imageX}px) scale(${imageScale})`,
				}}
			/>
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(circle at 85% 15%, rgba(252, 211, 77, 0.28), transparent 35%), linear-gradient(150deg, rgba(15, 23, 42, 0.94) 0%, rgba(41, 24, 17, 0.82) 46%, rgba(120, 53, 15, 0.75) 100%)',
				}}
			/>
			<SpiceOrb color={scene.accent} size={isPortrait ? 220 : 170} top={isPortrait ? 120 : 70} left={isPortrait ? width - 240 : width - 260} delay={sceneIndex * 14} />
			<SpiceOrb color="#FB923C" size={isPortrait ? 140 : 110} top={isPortrait ? height - 290 : height - 210} left={isPortrait ? 30 : 42} delay={sceneIndex * 22 + 20} />

			<AbsoluteFill
				style={{
					paddingLeft: isPortrait ? 56 : 78,
					paddingRight: isPortrait ? 56 : 72,
					paddingTop: contentTop,
					paddingBottom: isPortrait ? 180 : 120,
					justifyContent: 'space-between',
					color: '#FEF7ED',
					opacity: cardOpacity,
					transform: `translateY(${cardY}px)`,
				}}
			>
				<div
					style={{
						maxWidth: maxTextWidth,
						display: 'flex',
						flexDirection: 'column',
						gap: isPortrait ? 24 : 20,
					}}
				>
					<div
						style={{
							alignSelf: 'flex-start',
							padding: isPortrait ? '12px 20px' : '10px 18px',
							borderRadius: 999,
							backgroundColor: 'rgba(251, 146, 60, 0.18)',
							border: '1px solid rgba(253, 186, 116, 0.6)',
							fontFamily: bodyFamily,
							fontWeight: 700,
							fontSize: isPortrait ? 24 : 22,
							letterSpacing: 0.7,
						}}
					>
						{scene.eyebrow}
					</div>
					<div
						style={{
							fontFamily: displayFamily,
							fontWeight: 700,
							fontSize: headlineSize,
							lineHeight: 1.02,
							letterSpacing: -0.8,
							textWrap: 'balance',
						}}
					>
						{scene.headline}
					</div>
					<div
						style={{
							fontFamily: bodyFamily,
							fontWeight: 500,
							fontSize: bodySize,
							lineHeight: 1.32,
							opacity: 0.95,
						}}
					>
						{scene.body}
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 14,
							paddingTop: 10,
						}}
					>
						{scene.points.map((point, index) => {
							const bulletOpacity = interpolate(frame, [16 + index * 8, 40 + index * 8], [0, 1], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});
							const bulletX = interpolate(frame, [12 + index * 8, 40 + index * 8], [18, 0], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});

							return (
								<div
									key={point}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 14,
										fontFamily: bodyFamily,
										fontSize: bulletSize,
										fontWeight: 600,
										opacity: bulletOpacity,
										transform: `translateX(${bulletX}px)`,
									}}
								>
									<div
										style={{
											width: isPortrait ? 12 : 10,
											height: isPortrait ? 12 : 10,
											borderRadius: 999,
											backgroundColor: scene.accent,
										}}
									/>
									<div>{point}</div>
								</div>
							);
						})}
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
					}}
				>
					<div
						style={{
							fontFamily: bodyFamily,
							fontWeight: 500,
							fontSize: isPortrait ? 22 : 20,
							opacity: 0.82,
							letterSpacing: 0.3,
						}}
					>
						Unofficial fan-made pilot | February 2026
					</div>
					{sceneIndex === SCENES.length - 1 ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 14,
								padding: isPortrait ? '10px 14px' : '8px 12px',
								borderRadius: 16,
								backgroundColor: 'rgba(15, 23, 42, 0.45)',
								border: '1px solid rgba(254, 215, 170, 0.45)',
							}}
						>
							<Img
								src={staticFile('logo.png')}
								style={{
									width: isPortrait ? 62 : 54,
									height: isPortrait ? 62 : 54,
									objectFit: 'contain',
								}}
							/>
							<div
								style={{
									fontFamily: bodyFamily,
									fontWeight: 700,
									fontSize: isPortrait ? 20 : 18,
								}}
							>
								Custom GPT Pilot Playbook
							</div>
						</div>
					) : null}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

export const LinkedInPilotVideo = ({orientation = 'landscape'}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const isPortrait = orientation === 'portrait';
	const progress = interpolate(frame, [0, TOTAL_FRAMES - 1], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: '#0F172A'}}>
			{SCENES.map((scene, sceneIndex) => {
				return (
					<Sequence
						key={scene.eyebrow}
						from={sceneIndex * SCENE_DURATION}
						durationInFrames={SCENE_DURATION}
					>
						<Scene scene={scene} sceneIndex={sceneIndex} orientation={orientation} />
					</Sequence>
				);
			})}
			<div
				style={{
					position: 'absolute',
					left: isPortrait ? 42 : 52,
					right: isPortrait ? 42 : 52,
					bottom: isPortrait ? 44 : 36,
					height: isPortrait ? 8 : 6,
					borderRadius: 999,
					backgroundColor: 'rgba(255, 237, 213, 0.32)',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						width: `${progress * 100}%`,
						height: '100%',
						borderRadius: 999,
						background:
							'linear-gradient(90deg, rgba(251, 146, 60, 1) 0%, rgba(253, 186, 116, 1) 100%)',
					}}
				/>
			</div>
			<div
				style={{
					position: 'absolute',
					top: isPortrait ? 42 : 36,
					left: isPortrait ? 44 : 52,
					fontFamily: bodyFamily,
					fontWeight: 700,
					fontSize: isPortrait ? 20 : 18,
					letterSpacing: 0.6,
					color: 'rgba(254, 243, 199, 0.95)',
				}}
			>
				Ethnic Restaurant Custom GPT Pilot
			</div>
			<div
				style={{
					position: 'absolute',
					top: isPortrait ? 42 : 36,
					right: isPortrait ? 44 : 52,
					fontFamily: bodyFamily,
					fontWeight: 600,
					fontSize: isPortrait ? 20 : 17,
					color: 'rgba(255, 247, 237, 0.85)',
				}}
			>
				{width} x {height}
			</div>
		</AbsoluteFill>
	);
};
