import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Button from './Button';

const Modal = ({ children, activator, closeHandler, submitHandler, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRoot = document.getElementById('modal-root');

  const handleCloseModal = (event) => {
    event.preventDefault();
    const enterKeycode = 13;
    const isEventClick = !event.which;

    if (event.which === enterKeycode || isEventClick) {
      setIsOpen(false);
      closeHandler(event);
    }
  };

  const handleSubmitModal = (event) => {
    event.preventDefault();
    setIsOpen(false);
    submitHandler(event);
  };

  return (
    <>
      {activator(setIsOpen)}
      {ReactDOM.createPortal(
        <div
          className={`
            ${styles.basePosition}
            ${styles.wrapper}
            ${isOpen ? '' : styles.hidden}`}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.modalTitle}>{title}</h2>
              <Button onClick={handleCloseModal} type="close" icon="close" />
            </div>
            {children}
            <div className={styles.footer}>
              <Button onClick={handleCloseModal} type="cancel" text="CANCEL" />
              <Button onClick={handleSubmitModal} type="submit" text="OK" />
            </div>
          </div>
          <div
            onClick={handleCloseModal}
            onKeyPress={handleCloseModal}
            role="button"
            aria-label="Modal backdrop"
            tabIndex="0"
            className={`${styles.basePosition} ${styles.backdrop}`}
          />
        </div>,
        modalRoot,
      )}
    </>
  );
};

export default Modal;
