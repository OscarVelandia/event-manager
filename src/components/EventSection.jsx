import React from 'react';
import Card from './Card';
import styles from './EventSection.module.css';

export default function EventSection({ label, events = [] }) {
  return (
    <section>
      <h2 className={styles.sectionTitle}>{label}</h2>
      <div className={styles.cardContainer}>
        {events.map(
          ({ id, label: eventLabel, description, location, date, categoryId }) => (
            <Card key={id} {...{ eventLabel, description, location, date, categoryId }} />
          ),
        )}
      </div>
    </section>
  );
}
