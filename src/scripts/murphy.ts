import {makeRandomInt} from "./utils.ts";

export default () => {
    const rand = makeRandomInt(0, 5);
    if (rand > 2) {
        (document.querySelector('.murphy') as HTMLImageElement)!.style.opacity = "1";
        setTimeout(() => {
            (document.querySelector('.murphy') as HTMLImageElement)!.style.opacity = "0";
        }, 3000)
    }
}
