const DESTINATION_DEVIATION = 0.25;

const calculateEllipseEndpoint = (width: number, height: number, degree: number) => {
  const angleRadians = (degree * Math.PI) / 180;

  width += width * Math.random() * DESTINATION_DEVIATION;
  height += height * Math.random() * DESTINATION_DEVIATION;

  return {
    x: (width / 2) * Math.cos(angleRadians),
    y: (height / 2) * Math.sin(angleRadians),
  }
}

export const noGravityConfettiKeyframes = (degrees: number[], height: number | string, width: number) => {
  return degrees.reduce((acc, degree, i) => {
    const { x, y } = calculateEllipseEndpoint(width, height as number, degree);

    acc[`@keyframes position-${i}`] = {
      to: {
        transform: `translate(${x}px, ${y}px)`,
      },
    }
    return acc;
  }, {} as Record<string, {to: {transform: string}}>);
}
