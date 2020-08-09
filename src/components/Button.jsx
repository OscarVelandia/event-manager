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

export default function Button({ onClick, type, text, icon }) {
  const buttonType = BUTTON_TYPE[type];
  const iconType = `${buttonType}Icon`;

  return (
    <button
      onClick={onClick}
      type={BUTTON_TYPE[type]}
      className={`${styles[buttonType]} ${styles.button}`}>
      {text && <span>{text}</span>}
      {icon && (
        <img
          alt={`${icon} icon`}
          src={ICONS[icon]}
          className={`${styles[iconType]} ${styles.button}`}
        />
      )}
    </button>
  );
}
