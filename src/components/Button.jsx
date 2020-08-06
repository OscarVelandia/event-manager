import React from 'react';

const ICONS = {
  plus: 'https://img.icons8.com/ios-glyphs/96/000000/plus-math.png',
  close: 'https://img.icons8.com/ios-glyphs/60/000000/multiply.png',
};

const BUTTON_TYPE = {
  cancel: 'cancel',
  submit: 'submit',
  close: 'close',
  open: 'open',
};

export default function Button({ onClick, text, type, icon }) {
  return (
    <button onClick={onClick} type={BUTTON_TYPE[type]} className={`style.${type}`}>
      {text}
      <img alt={`${icon} icon`} src={ICONS[icon]} />
    </button>
  );
}
