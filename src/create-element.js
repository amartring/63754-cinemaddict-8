const createElement = (template, elem, classNames) => {
  const newElement = document.createElement(elem);
  classNames.forEach((item) => newElement.classList.add(item));
  newElement.innerHTML = template;
  return newElement;
};

export {createElement};
