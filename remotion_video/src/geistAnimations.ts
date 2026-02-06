import {interpolate, spring} from 'remotion';

export const springConfig = {
  smooth: {damping: 200},
  quick: {damping: 15, stiffness: 100},
  bouncy: {damping: 8, stiffness: 200},
};

export const fadeIn = (frame: number, fps: number, delaySeconds = 0, durationSeconds = 0.4) => {
  const delayFrames = delaySeconds * fps;
  const durationFrames = durationSeconds * fps;
  return interpolate(frame, [delayFrames, delayFrames + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const slideUp = (frame: number, fps: number, delaySeconds = 0, from = 36) => {
  const progress = spring({
    frame: frame - delaySeconds * fps,
    fps,
    config: springConfig.smooth,
  });
  return interpolate(progress, [0, 1], [from, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

export const scaleIn = (frame: number, fps: number, delaySeconds = 0, from = 0.9) => {
  const progress = spring({
    frame: frame - delaySeconds * fps,
    fps,
    config: springConfig.quick,
  });
  return interpolate(progress, [0, 1], [from, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};
