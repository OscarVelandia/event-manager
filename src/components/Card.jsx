import React from 'react';
import styles from './Card.module.css';

export default function Card({ label, description, location, date, categoryId }) {
  return (
    <div>
      <h3>{label}</h3>
      <li>{description}</li>
      <li>{location}</li>
      <div className={styles.footer}>
        <li>{date}</li>
        <label htmlFor={categoryId}>
          <input type="checkbox" id={categoryId} name="categoryId" />
        </label>
      </div>
    </div>
  );
}
