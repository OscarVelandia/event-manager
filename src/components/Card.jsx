import React from 'react';
import styles from './Card.module.css';

export default function Card({ eventLabel, description, location, date, categoryId }) {
  return (
    <div className={styles.cardContainer}>
      <h3>{eventLabel}</h3>
      <li>{description}</li>
      <li>{location}</li>
      <div className={styles.footer}>
        <li>{date}</li>
        <label htmlFor={categoryId}>
          <input
            type="checkbox"
            id={categoryId}
            name="categoryId"
            className={styles.checkbox}
          />
        </label>
      </div>
    </div>
  );
}
