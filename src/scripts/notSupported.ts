export default () => {
  document.querySelector(".loading")?.remove();
  document.body.innerHTML = `
    <div style="padding: 32px; font-size: 16px">
        Только для ширины > 1000 пикселей
    </div>
  `;
};
