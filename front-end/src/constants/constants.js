import * as THREE from "three";
export const FALL_TIME = 2;

export const MOBILE_BREAKPOINT = 900;

export const characterPosition = { x: 0, y: -0.55, z: 0 };

export const HIT_MARGIN = {
  MOBILE: { upper: 0.04, lower: -0.4 },
  DESKTOP: { upper: 0.07, lower: -0.07 },
};


export const TARGET_SCALE = {
  MOBILE: new THREE.Vector3(0.4, 0.4, 0.4),
  DESKTOP: new THREE.Vector3(0.2, 0.2, 0.2),
};

export const NOTE_SCALE = {
  MOBILE: new THREE.Vector3(0.5, 0.5, 0.5),
  DESKTOP: new THREE.Vector3(0.2, 0.2, 0.2),
};

export const NOTE_START_POSITION = {
  MOBILE: new THREE.Vector3(0, 1, 0.5),
  DESKTOP: new THREE.Vector3(0, 0.2, 0.5)
}

export const NOTE_DROPPER_GROUP_SCALE = {
  MOBILE: new THREE.Vector3(0.45, 0.45, 0.45),
  DESKTOP: new THREE.Vector3(1, 1, 1),
};

export const NOTE_DROPPER_GROUP_POSITION = {
  MOBILE: { x: 0, y: -0.27, z: 0 },
  DESKTOP: { x: 0, y: 0, z: 0 },
};

export const KEYCODES = {
  KeyA: "A",
  KeyB: "B",
  KeyC: "C",
  KeyD: "D",
  KeyE: "E",
  KeyF: "F",
  KeyG: "G",
  KeyH: "H",
  KeyI: "I",
  KeyJ: "J",
  KeyK: "K",
  KeyL: "L",
  KeyM: "M",
  KeyN: "N",
  KeyO: "O",
  KeyP: "P",
  KeyQ: "Q",
  KeyR: "R",
  KeyS: "S",
  KeyT: "T",
  KeyU: "U",
  KeyV: "V",
  KeyW: "W",
  KeyX: "X",
  KeyY: "Y",
  KeyZ: "Z",
  Keya: "a",
  Keyb: "b",
  Keyc: "c",
  Keyd: "d",
  Keye: "e",
  Keyf: "f",
  Keyg: "g",
  Keyh: "h",
  Keyi: "i",
  Keyj: "j",
  Keyk: "k",
  Keyl: "l",
  Keym: "m",
  Keyn: "n",
  Keyo: "o",
  Keyp: "p",
  Keyq: "q",
  Keyr: "r",
  Keys: "s",
  Keyt: "t",
  Keyu: "u",
  Keyv: "v",
  Keyw: "w",
  Keyx: "x",
  Keyy: "y",
  Keyz: "z",
  ShiftLeft: "(Shift)",
  ControlLeft: "(Ctrl)",
  AltLeft: "(Alt)",
  MetaLeft: "(Meta)",
  Digit0: "0",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Escape: "Esc",
  Backspace: "Backspace",
  Tab: "Tab",
  Enter: "Enter",
  CapsLock: "Caps Lock",
  ArrowLeft: "←",
  ArrowUp: "↑",
  ArrowRight: "→",
  ArrowDown: "↓",
  Space: "Space",
  Comma: ",",
  Period: ".",
  Slash: "/",
  Backquote: "`",
  BracketLeft: "[",
  BracketRight: "]",
  Semicolon: ";",
  Quote: "'",
  Equal: "=",
  Minus: "-",
  Underscore: "_",
};
