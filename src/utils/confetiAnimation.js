import confetti from "canvas-confetti";

export const confettiFunct = () => {
  // launch a few confetti from the left edge
  confetti({
    startVelocity: 80,
    particleCount: 200,
    angle: 60,
    spread: 75,
    origin: { x: 0, y: 0.9 },
  });
  // and launch a few from the right edge
  confetti({
    startVelocity: 80,

    particleCount: 200,
    angle: 120,
    spread: 75,
    origin: { x: 1, y: 0.9 },
  });
};
