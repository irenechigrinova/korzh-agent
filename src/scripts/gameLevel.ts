import { gsap } from "gsap";

export default (level: string) => {
    document.querySelector(".conveyor")!.className = `conveyor ${level}-level`;
    document.querySelectorAll('.stage').forEach(el => {
        el.classList.remove('min-level');
        el.classList.remove('mid-level');
        el.classList.remove('max-level');
        el.classList.add(`${level}-level`);
    })

    gsap.set('.alert', { opacity: 1 })

    gsap.to('.alert', {
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 1.5,
        onComplete: () => {
            setTimeout(() => {
                gsap.set('.alert', { opacity: 0 })
            }, 400)
        }
    });
}
