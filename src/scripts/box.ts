import { gsap } from "gsap";

const content = `
  <div class="box-wrapper">
      <div class="box">
        <div class="side front text box-element">
          Korzh Agent
        </div>
        <div class="side left box-element"></div>
        <div class="side back box-element"></div>
        <div class="side right box-element"></div>
        <div class="side bottom box-element"></div>
        <div class="flap front box-element"></div>
        <div class="flap back box-element"></div>
        <div class="flap left box-element"></div>
        <div class="flap right box-element"></div>
        <div class="korzh-box"></div>
      </div>
    </div>
`;

export default (state: Record<string, any>) => {
  const korzhTL = gsap.timeline();

  const start = document.querySelector(".start");

  start?.classList.remove("paused");
  start?.classList.add("form-hidden");

  setTimeout(() => {
    start?.remove();
    const section = document.createElement("section");
    section.className = "box-section";
    document.body.appendChild(section);
    section.innerHTML = content;
  }, 700);

  setTimeout(() => {
    document.querySelector(".box-wrapper")?.classList.add("active");
  }, 3000);

  setTimeout(() => {
    korzhTL.set(".korzh-box", { opacity: 1 });
  }, 3200);

  setTimeout(() => {
    korzhTL.to(".korzh-box", {
      top: 0,
      ease: "bounce.inOut",
      onComplete: () => {
        setTimeout(() => {
          document.querySelector(".box-wrapper")?.classList.add("hidden");
        }, 1500);
        setTimeout(() => {
          state.screen = "game";
        }, 3000);
      },
    });
  }, 3500);
};
