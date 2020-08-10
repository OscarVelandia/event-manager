import React from 'react';
import styles from './Card.module.css';
import Input from './Input';

const Card = ({
  eventLabel,
  hasSubscription,
  description,
  location,
  date,
  eventId,
  onChange,
}) => {
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.title}>{eventLabel}</h3>
      <p className={styles.description}>
        <span>{description}</span>
      </p>
      <p>{location}</p>
      <div className={styles.footer}>
        <p>{date}</p>
        <Input
          type="checkbox"
          id={eventId}
          hasLabel={false}
          isSelected={hasSubscription}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Card;
