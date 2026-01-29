export const fadeInOut = (duration: number = 500) => {
  const easing = "cubic-bezier(0.87, 0, 0.13, 1)";
  // const easing = "ease";

  // Animation de sortie
  document.documentElement.animate(
    [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
    {
      duration: duration,
      easing: easing,
      fill: "forwards",
      pseudoElement: "::view-transition-old(the-main)",
    }
  );

  // Animation d'entrée
  document.documentElement.animate(
    [
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    ],
    {
      duration: duration,
      easing: easing,
      fill: "forwards",
      pseudoElement: "::view-transition-new(the-main)",
    }
  );
};
