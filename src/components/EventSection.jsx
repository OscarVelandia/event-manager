import React from 'react';
import Card from './Card';
import styles from './EventSection.module.css';

export default function EventSection({ label, events = [], onChange }) {
  return (
    <section>
      <h2 className={styles.sectionTitle}>{label}</h2>
      <div className={styles.cardContainer}>
        {events.map(
          ({
            id: eventId,
            label: eventLabel,
            hasSubscription,
            description,
            location,
            date,
          }) => (
            <Card
              key={eventId}
              {...{
                eventLabel,
                hasSubscription,
                description,
                location,
                date,
                eventId,
                onChange,
              }}
            />
          ),
        )}
      </div>
    </section>
  );
}
