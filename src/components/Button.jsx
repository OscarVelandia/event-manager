import React from 'react';
import styles from './Button.module.css';
import add from '../assets/icons/add.png';
import close from '../assets/icons/close.png';

const ICONS = {
  add,
  close,
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
