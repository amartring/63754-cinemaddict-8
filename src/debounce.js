const DEBOUNCE_INTERVAL = 5000;

export const debounce = (calback) => {
  window.setTimeout(calback, DEBOUNCE_INTERVAL);
};
