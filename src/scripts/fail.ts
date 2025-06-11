import { makeRandomInt } from "./utils.ts";

const texts = ["Ой вей", "Как так-то блять", "Пиздец", "Ой всё"];

export default (state: Record<string, any>) => {
  document.body.classList.add("pause-all");

  (document.querySelector(`#fail`) as HTMLAudioElement)?.play();

  const dark = document.createElement("div");
  dark.classList.add("dark");
  document.body.appendChild(dark);

  setTimeout(() => {
    dark.innerHTML = `
      <img src="fail.png" alt="fail" />
      <p>${texts[makeRandomInt(0, texts.length - 1)]}</p>
      <button class="more">Продолжить?</button>
    `;

    document.querySelector(".more")?.addEventListener("click", () => {
      state.score = 0;
      dark.remove();
      document.body.classList.remove("pause-all");
    });
  }, 2000);
};
