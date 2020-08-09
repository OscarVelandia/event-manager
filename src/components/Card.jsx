import React from 'react';
import styles from './Card.module.css';

export default function Card({ eventLabel, description, location, date, categoryId }) {
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.title}>{eventLabel}</h3>
      <p className={styles.description}>
        <span>{description}</span>
      </p>
      <p>{location}</p>
      <div className={styles.footer}>
        <p>{date}</p>
        <label className={styles.checkbox} htmlFor={categoryId}>
          <input type="checkbox" id={categoryId} name="categoryId" />
        </label>
      </div>
    </div>
  );
}
