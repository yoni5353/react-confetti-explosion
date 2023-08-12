import { round } from 'lodash';

import {
  CRAZY_PARTICLES_FREQUENCY,
  CRAZY_PARTICLE_CRAZINESS,
  IParticle,
  ROTATION_SPEED_MAX,
  ROTATION_SPEED_MIN,
} from './styles';
import { rotationTransforms, shouldBeCircle } from './utils';

const DESTINATION_DEVIATION = 0.5;

const calculateEllipseEndpoint = (width: number, height: number, degree: number) => {
  const angleRadians = (degree * Math.PI) / 180;

  width += width * Math.random() * DESTINATION_DEVIATION;
  height += height * Math.random() * DESTINATION_DEVIATION;

  return {
    x: (width / 2) * Math.cos(angleRadians),
    y: (height / 2) * Math.sin(angleRadians),
  };
};

export const noGravityConfettiKeyframes = (degrees: number[], height: number, width: number) => {
  return degrees.reduce((acc, degree, i) => {
    const { x, y } = calculateEllipseEndpoint(width, height, degree);

    acc[`@keyframes position-${i}`] = {
      to: {
        transform: `translate(${x}px, ${y}px)`,
        visibility: 'hidden',
      },
    };
    return acc;
  }, {} as Record<string, object>);
};

export const noGravityConfettoStyle = (
  particle: IParticle,
  duration: number,
  force: number,
  size: number,
  i: number
) => {
  const rotation = Math.round(Math.random() * (ROTATION_SPEED_MAX - ROTATION_SPEED_MIN) + ROTATION_SPEED_MIN);
  const rotationIndex = Math.round(Math.random() * (rotationTransforms.length - 1));
  const durationChaos = duration - Math.round(Math.random() * 1000);
  const shouldBeCrazy = Math.random() < CRAZY_PARTICLES_FREQUENCY;
  const isCircle = shouldBeCircle(rotationIndex);

  const x1 = shouldBeCrazy ? round(Math.random() * CRAZY_PARTICLE_CRAZINESS, 2) : 0;
  const x2 = round(Math.random() * force, 4);
  const x3 = round(1 - force, 4);

  return {
    [`&#confetti-particle-${i}`]: {
      '& > div': {
        width: isCircle ? size : Math.round(Math.random() * 4) + size / 2,
        height: isCircle ? size : Math.round(Math.random() * 2) + size,
        animation: `$position-${i} ${durationChaos}ms forwards cubic-bezier(${x1}, ${x2}, ${x3}, 1)`,
        '&:after': {
          backgroundColor: particle.color,
          animation: `$rotation-${rotationIndex} ${rotation}ms infinite linear`,
          ...(isCircle ? { borderRadius: '50%' } : {}),
        },
      },
    },
  };
};
