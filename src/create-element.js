const createElement = (template, elem, className) => {
  const newElement = document.createElement(elem);
  className.forEach((item) => {
    newElement.classList.add(item);
  });
  newElement.innerHTML = template;
  return newElement;
};

export {createElement};
