import React from "react";
import { PageModulaire, Product, Infos, Licensing } from "../types/schema";

export const _linkResolver = (
  node: PageModulaire | Product | Infos | Licensing | any
) => {
  // console.log(node);
  // console.log(node._type);
  if (!node || !node._type) return "/";
  if (node._type === "home") return "/";
  if (node._type === "infos") return "/infos";
  if (node._type === "trials") return "/trials";
  if (node._type === "licensing") return "/licensing";
  switch (node._type) {
    case "product":
      return `/product/${node.slug?.current}`;

    default:
      return `/${node.slug?.current}`;
  }
};

export const _preloadImages = (urls: Array<string | any>) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

export const _revealEmail = (input: string) => {
  return input.replace("(at)", "@");
};

export const _slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const _date = (d: string) => {
  const date: Date = new Date(d);

  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
  });
};

// export const _throttle = (func, wait) => {
//   let waiting = false;
//   return function () {
//     if (waiting) {
//       return;
//     }

//     waiting = true;
//     setTimeout(() => {
//       func.apply(this, arguments);
//       waiting = false;
//     }, wait);
//   };
// };

export const _randomNum = (number: number) => {
  const min = number * -1;
  const max = number * 1;
  return Math.random() * (max - min) + min;
};
