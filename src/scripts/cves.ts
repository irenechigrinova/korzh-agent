import {LEVELS, makeRandomInt} from "./utils.ts";

const eyesBlink = `
  <div class="eye blink"></div>
  <div class="eye blink d1"></div>
`;

const eyesDoubleBlink = `
  <div class="eye double-blink"></div>
  <div class="eye double-blink"></div>
`;

const eyesUp = `
  <div class="eye up"></div>
  <div class="eye up"></div>
`;

const fuck = `
  <svg class="middle-finger" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M479.93 317.12a37.33 37.33 0 0 0-28.28-36.19L416 272v-49.59c0-11.44-9.69-21.29-23.15-23.54l-38.4-6.4C336.63 189.5 320 200.86 320 216v32a8 8 0 0 1-16 0V50c0-26.28-20.25-49.2-46.52-50A48 48 0 0 0 208 48v200a8 8 0 0 1-16 0v-32c0-15.15-16.63-26.51-34.45-23.54l-30.68 5.12c-18 3-30.87 16.12-30.87 31.38V376a8 8 0 0 1-16 0v-76l-27.36 15A37.34 37.34 0 0 0 32 348.4v73.47a37.31 37.31 0 0 0 10.93 26.39l30.93 30.93A112 112 0 0 0 153.05 512h215A112 112 0 0 0 480 400z"/></svg>
`;

const accepted = `
  <img src="sign.png" alt="" class="sign" />
`;

const makeEyes = () => {
  const rand = makeRandomInt(1, 3);
  switch (rand) {
    default:
    case 1:
      return eyesBlink;
    case 2:
      return eyesDoubleBlink;
    case 3:
      return eyesUp;
  }
};

const makeLevel = (levels: string[]) => {
  const fullLevels = [...levels, "ok", "ok", "ok"];
  const rand = makeRandomInt(0, fullLevels.length - 1);
  return fullLevels[rand];
};

const checkAccepted = () => {
  const arr = [0, 0, 1];
  const rand = makeRandomInt(0, arr.length - 1);
  return Boolean(arr[rand]);
};

export default (state: Record<string, any>) => {
  const stage = document.createElement("div");
  const level = makeLevel(Object.keys(LEVELS));
  const isAccepted = level !== "ok" && state.cves.includes(level) ? checkAccepted() : false;

  stage.className = `stage ${level} ${isAccepted ? "accepted fuck" : ""}`;
  stage.innerHTML = `
    <figure class="cve"></figure>
    <div class="shadow"></div>
    <div class="eyes">${makeEyes()}</div>
    ${isAccepted ? accepted : ""}
    ${isAccepted ? fuck : ""}
  `;
  document.querySelector(".game")?.appendChild(stage);

  setTimeout(() => {
    if (!document.body.classList.contains("pause-all")) {
      stage.remove();
    }
  }, 8300);
  setTimeout(() => {
    if (isAccepted && !document.body.classList.contains("pause-all"))
      stage.classList.add("active");
  }, 6200);
  if (isAccepted) {
    const randInterval = makeRandomInt(1000, 5000);
    setTimeout(() => {
      if (!document.body.classList.contains("pause-all")) {
        stage.classList.add("active-accepted");
      }
    }, randInterval);
  }
};
