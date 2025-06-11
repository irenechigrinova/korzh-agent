import { gsap } from "gsap";
import {
  TextPlugin,
  EasePack,
  CSSPlugin,
  CustomEase,
  Observer,
} from "gsap/all";

import "./main.scss";

import start from "./scripts/start";
import game from "./scripts/game";
import form from "./scripts/form";
import box from "./scripts/box.ts";
import updateScore from "./scripts/score.ts";
import notSupported from "./scripts/notSupported.ts";
import fail from "./scripts/fail.ts";
import murphy from "./scripts/murphy.ts";

const plugins = [TextPlugin, EasePack, CSSPlugin, CustomEase, Observer];
gsap.registerPlugin(...plugins);

const initialState: Record<string, any> = {
  screen: "start",
  cves: [],
  score: 0,
};

const state = new Proxy(initialState, {
  set(obj, prop, value) {
    if (prop === "screen" && value === "form") {
      form(state);
    }
    if (prop === "screen" && value === "game") {
      game(state);
    }
    if (prop === "screen" && value === "box") {
      (document.querySelector('#main-theme') as HTMLAudioElement).volume = 0.5;
      document.querySelectorAll(".audio-el").forEach((item) => {
        (item as HTMLAudioElement).volume = 1;
      });


      (document.querySelector('#main-theme') as HTMLAudioElement).play();
      box(state);
    }
    if (prop === "screen" && value === "fail") {
      fail(state);
    }
    if (prop === "score") {
      updateScore(value);
      if (obj.score > value) {
        murphy();
      }
      if (value < 0) {
        fail(state)
      }
    }
    return Reflect.set(obj, prop, value);
  },
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 1000) {
    notSupported();
  } else {
    start(state);
  }
});
