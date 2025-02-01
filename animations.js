export const createAnimations = (anims) => {
  anims.create({
    key: "mario-walk",
    frames: anims.generateFrameNumbers("mario", {
      start: 3,
      end: 2,
    }),
    frameRate: 12,
    repeat: -1,
  });
  anims.create({
    key: "mario-idle",
    frames: [{ key: "mario", frame: 0 }],
    frameRate: 12,
  });

  anims.create({
    key: "mario-jump",
    frames: [{ key: "mario", frame: 5 }],
    frameRate: 12,
  });

  anims.create({
    key: "mario-die",
    frames: [{ key: "mario", frame: 4 }],
    frameRate: 12,
  });
};
