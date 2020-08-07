import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getEvents } from '../utils/api/services';

export default function EventSection({ title, limit }) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    return () => {
      getEvents().then(setEvents);
    };
  }, []);

  const eventCard = () => {
    if (limit) setEvents(events.slice(0, limit));

    return events.map(({ id, label, description, location, date, categoryId }) => (
      <Card key={id} {...{ label, description, location, date, categoryId }} />
    ));
  };

  return (
    <div>
      <h2>{title}</h2>
      {eventCard}
    </div>
  );
}
