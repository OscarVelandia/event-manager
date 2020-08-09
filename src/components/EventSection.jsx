import React from 'react';
import Card from './Card';

export default function EventSection({ label, events = [] }) {
  const eventCard = events.map(
    ({ id, _label, description, location, date, categoryId }) => (
      <Card key={id} {...{ _label, description, location, date, categoryId }} />
    ),
  );

  return (
    <div>
      <h2>{label}</h2>
      {eventCard}
    </div>
  );
}
