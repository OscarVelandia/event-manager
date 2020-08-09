import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Button from './Button';

const Modal = ({ children, activator, submitEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRoot = document.getElementById('modal-root');

  const handleCloseModal = (event) => {
    event.preventDefault();
    const enterKeycode = 13;
    const isEventClick = !event.which;

    if (event.which === enterKeycode || isEventClick) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {activator({ setIsOpen })}
      {ReactDOM.createPortal(
        <div
          className={`
            ${styles.basePosition}
            ${styles.wrapper}
            ${isOpen ? '' : styles.hidden}`}>
          <div
            onClick={handleCloseModal}
            onKeyPress={handleCloseModal}
            role="button"
            aria-label="Modal backdrop"
            tabIndex="0"
            className={`${styles.basePosition} ${styles.backdrop}`}
          />

          <div className={styles.content}>
            <div>
              <div className={styles.header}>
                <Button onClick={handleCloseModal} type="close" icon="close" />
              </div>
              {children}
              <div className={styles.footer}>
                <Button onClick={handleCloseModal} type="cancel" text="CANCEL" />
                <Button onClick={submitEvent} type="submit" text="OK" />
              </div>
            </div>
          </div>
        </div>,
        modalRoot,
      )}
    </>
  );
};

export default Modal;
