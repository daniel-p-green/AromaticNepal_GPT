import React from 'react';
import {Composition} from 'remotion';
import {LinkedInPilotVideo, TOTAL_FRAMES} from './LinkedInPilotVideo';

export const RemotionRoot = () => {
	return (
		<>
			<Composition
				id="LinkedInPilotLandscape"
				component={LinkedInPilotVideo}
				durationInFrames={TOTAL_FRAMES}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{orientation: 'landscape'}}
			/>
			<Composition
				id="LinkedInPilotPortrait"
				component={LinkedInPilotVideo}
				durationInFrames={TOTAL_FRAMES}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{orientation: 'portrait'}}
			/>
		</>
	);
};
