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

const plugins = [TextPlugin, EasePack, CSSPlugin, CustomEase, Observer];
gsap.registerPlugin(...plugins);

const initialState: Record<string, any> = {
  screen: "start",
  cves: [],
  score: 0,
};

const state = new Proxy(initialState, {
  set(obj, prop, value) {
    console.log(prop, value);
    if (prop === "screen" && value === "form") {
      form(state);
    }
    if (prop === "screen" && value === "game") {
      game(state);
    }
    if (prop === "screen" && value === "box") {
      console.log("qqq");
      box(state);
    }
    if (prop === "screen" && value === "fail") {
      fail(state);
    }
    if (prop === "score") {
      updateScore(value);
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
