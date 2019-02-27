export default (name, count, isActive = false) => {
  return `
  <a
    href="#${name.toLowerCase().split(` `).slice(0, 1)}"
    class="main-navigation__item ${isActive ? ` main-navigation__item--active` : ``}">
      ${name}
      ${count ? `
        <span
          class="main-navigation__item-count">
            ${count}
        </span>
      `
    : ``}
  </a>
  `;
};
