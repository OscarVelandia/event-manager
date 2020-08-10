import React from 'react';
import Card from './Card';
import styles from './EventSection.module.css';

const EventSection = ({ label, events = [], onChange }) => {
  return (
    <section>
      <h2 className={styles.sectionTitle}>{label}</h2>
      <div className={styles.cardContainer}>
        {events.length ? (
          events.map(
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
          )
        ) : (
          <h3 className={styles.noEventsTitle}>There are no events at this time.</h3>
        )}
      </div>
    </section>
  );
};

export default EventSection;
