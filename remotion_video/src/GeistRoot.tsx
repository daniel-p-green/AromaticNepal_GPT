import React from 'react';
import {Composition} from 'remotion';
import {GeistPilotLandscape, GEIST_LANDSCAPE_FRAMES} from './GeistPilotLandscape';
import {INSTAGRAM_AD_FRAMES, InstagramPilotAdPortrait} from './InstagramPilotAdPortrait';
import {LinkedInSquareTemplate, LINKEDIN_SQUARE_FRAMES} from './LinkedInSquareTemplate';
import './styles.css';

export const GeistRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TemplateGeistLandscape"
        component={GeistPilotLandscape}
        durationInFrames={GEIST_LANDSCAPE_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TemplateInstagramAdPortrait"
        component={InstagramPilotAdPortrait}
        durationInFrames={INSTAGRAM_AD_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TemplateLinkedInSquare"
        component={LinkedInSquareTemplate}
        durationInFrames={LINKEDIN_SQUARE_FRAMES}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
