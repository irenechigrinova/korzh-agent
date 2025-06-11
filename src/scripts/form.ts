import { gsap } from "gsap";
import { makeRandomInt, shuffleArray, LEVELS, renderLevel } from "./utils.ts";

const form = `
  <p>
    Кликни левой кнопкой мыши или нажми любую кнопку на клавиатуре, чтобы Корж Агент заблокировал ЦВЕ.<br/>
  </p>
  <ul>
    <li>Блокировать нужно только ЦВЕ, перечисленные ниже.</li>
    <li>ЦВЕ с принятым риском нужно игнорировать.</li>
    <li>За каждую успешно заблокированную ЦВЕ начисляется 1 балл.</li>
    <li>За каждый пропущенный таргет 1 балл снимается.</li>
    <li>Игра заканчивается, если был заблокирован не тот таргет<br/> или количество баллов стало меньше 0.</li>
  </ul>
  <div class="levels"></div>
  <div class="checkbox">
    <label for="agree">
      <input type="checkbox" name="agree" id="agree" />
      <div class="wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 109.76" style="enable-background:new 0 0 122.88 109.76" xml:space="preserve"><g><path class="st0" d="M0,52.88l22.68-0.3c8.76,5.05,16.6,11.59,23.35,19.86C63.49,43.49,83.55,19.77,105.6,0h17.28 C92.05,34.25,66.89,70.92,46.77,109.76C36.01,86.69,20.96,67.27,0,52.88L0,52.88z"/></g></svg>
      </div>
      <span>Строго 18+, наличие сцен насилия и обсценной лексики.</span>
    </label>
  </div>
  <button class="go" type="button">Начать</button>
`;

export default (state: Record<string, any>) => {
  const startTL = gsap.timeline();
  startTL.to(".bubble-shadow", { opacity: 0, duration: 0.4 });

  let counter = 0;

  const startSection = document.querySelector(".start")! as HTMLDivElement;

  startSection.classList.add("paused");
  startSection.style.transform = "rotate(0deg) scale(1)";
  startSection.style.animation = "none";

  startTL.to(".bubble", {
    duration: 1.2,
    attr: {
      d: "M 0.147 26.303 L 103.309 26.14 L 150.119 25.891 L 187.954 25.567 L 227.081 26.27 L 299.142 26.208 L 407.105 25.994 L 407.499 128.534 L 407.779 187.868 L 407.648 250.558 L 407.444 322.11 L 307.166 320.918 L 243.52 320.34 L 219.492 320.447 L 190.496 320.293 L 148.043 320.709 L 109.007 320.384 L 37.084 320.664 L -0.357 320.604 L 0.007 217.122 L -0.056 174.84 L -0.176 126.149 L 0.274 101.603 L 0.226 65.281 L 0.147 26.303 Z",
    },
    ease: "power2.out",
  });

  startTL.to(".transform", {
    transform: "translate(-324px, -288px) scale(0.5)",
    duration: 1.2,
    ease: "power4.inOut",
    delay: -1.2,
  });

  startTL.to(".transform", {
    duration: 1,
    text: "Дока",
    ease: "power4.inOut",
    delay: -1,
    onComplete: () => {
      const formDiv = document.createElement("div");
      formDiv.className = "form";
      document.body.querySelector(".start")?.appendChild(formDiv);
      formDiv.innerHTML = form;

      const selectedLevelsLength = makeRandomInt(1, 4);
      const cves = shuffleArray(
        Object.keys(LEVELS).filter((key) => key !== "ok")
      ).slice(0, selectedLevelsLength);

      state.cves = cves;
      document.querySelector(".levels")!.innerHTML = cves
        .map((level) => renderLevel(level as string))
        .join("");

      document.querySelector("input")!.addEventListener("change", (e) => {
        if (
          document.querySelector(".checkbox label")?.classList.contains("error")
        ) {
          document.querySelector(".checkbox label")?.classList.add("ok");
        }
        if (!(e.target as HTMLInputElement).checked) {
          document.querySelector(".checkbox label")?.classList.remove("ok");
          document.querySelector(".checkbox label")?.classList.remove("error");
        }
      });

      document.querySelector(".go")!.addEventListener("mouseenter", (e) => {
        if (counter === 4) return;
        const agreed = (document.querySelector("#agree") as HTMLInputElement)
          .checked;
        const target = e.target as HTMLButtonElement;
        const transform = target.style.transform;
        const label = document.querySelector(".checkbox label");
        if (!agreed) {
          counter += 1;
          if (counter === 4) {
            startTL.to(".checkbox span", {
              duration: 1,
              text: "Ебать тебя не должно",
              ease: "power4.inOut",
            })
            target.style.transform = `translateX(0px)`;
            document.querySelector(".checkbox label")?.classList.remove("ok");
            document.querySelector(".checkbox label")?.classList.remove("error");
            return;
          }
          if (!transform) {
            target.style.transform = "translateX(250px)";
          } else {
            const newTransform = transform.includes("250") ? "0px" : "250px";
            target.style.transform = `translateX(${newTransform})`;
          }
          if (!label?.classList.contains("error")) {
            label?.classList.add("error");
          }
        }
      });

      document.querySelector(".go")!.addEventListener("click", () => {
        if ((document.querySelector("#agree") as HTMLInputElement)
            .checked) {
          state.screen = "box";
        }
      });
    },
  });
};
