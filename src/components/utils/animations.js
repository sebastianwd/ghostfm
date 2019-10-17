const translateIn = {
  initial: { translateZ: -80, opacity: 0 },
  animate: { translateZ: 0, opacity: 1 },
  exit: { translateZ: -80, opacity: 0 },
  styles: { transition: "transform 500ms ease, opacity 500ms ease" },
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  styles: { transition: "all 300ms ease-in-out" },
}
const slideIn = {
  initial: { translateX: -20, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  styles: { transition: "all 300ms ease-in-out" },
}

export { translateIn, fadeIn, slideIn }
