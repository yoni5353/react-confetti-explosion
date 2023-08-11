const calculateEllipseEndpoint = (width: number, height: number, degree: number) => {
  const angleRadians = (degree * Math.PI) / 180;

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
