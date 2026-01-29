export const slideInOutX = (direction: string, duration: number = 500) => {
  // const easing = "cubic-bezier(0.87, 0, 0.13, 1)";
  const easing = "ease";
  const x: number = direction === "e" ? -35 : 35;
  const clipPath =
    direction === "e"
      ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
      : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

  // Animation de sortie
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateX(0)",
      },
      {
        // opacity: 0,
        transform: `translateX(${x}%)`,
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
        clipPath: clipPath,
        transform: `translateX(${(x / 2) * -1}%)`,
      },
      {
        transform: "translateX(0)",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
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
