import React from 'react';
import styles from './Button.module.css';

const ICONS = {
  plus: 'https://img.icons8.com/ios-glyphs/24/000000/plus-math.png',
  close: 'https://img.icons8.com/ios-glyphs/24/000000/multiply.png',
};

const BUTTON_TYPE = {
  cancel: 'cancel',
  submit: 'submit',
  close: 'close',
  open: 'open',
};

export default function Button({ onClick, text, type, icon }) {
  return (
    <button
      onClick={onClick}
      type={BUTTON_TYPE[type]}
      className={`${styles[type]} ${styles.button}`}>
      <span>{text}</span>
      <img alt={`${icon} icon`} src={ICONS[icon]} />
    </button>
  );
}
