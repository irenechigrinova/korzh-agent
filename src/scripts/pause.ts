export default () => {
    document.body.classList.add("pause-all");

    const dark = document.createElement("div");
    dark.classList.add("pause");
    document.body.appendChild(dark);

    let id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id);
    }

    dark.innerHTML = `
      <p>ИДИ РАБОТАЙ!</p>
      <button class="more">ХОЧУ ДАЛЬШЕ!</button>
    `;

    document.querySelector(".more")?.addEventListener("click", () => {
        dark.remove();
        document.body.classList.remove("pause-all");
    });
};
