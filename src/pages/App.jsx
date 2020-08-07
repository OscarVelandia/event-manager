import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '../components/Button';
import EventSection from '../components/EventSection';
import { getCategories } from '../utils/api/services';
import generateId from '../utils/generateId';

const MAX_UPCOMING_EVENTS = 5;
const DEFAULT_SECTION = {
  id: generateId(),
  label: `Upcoming ${MAX_UPCOMING_EVENTS} events`,
  limit: MAX_UPCOMING_EVENTS,
};

function App() {
  const [sections, setSections] = useState([DEFAULT_SECTION]);

  useEffect(() => {
    getCategories().then((categories) => setSections(sections.concat(categories)));
    console.log(sections);
  }, [sections]);

  const handleCreateEventClick = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <main className="App">
      <Button
        onClick={handleCreateEventClick}
        text="Create Event"
        type="open"
        icon="add"
      />

      {sections.map(({ id, label, limit }) => (
        <EventSection key={id} title={label} limit={limit} />
      ))}
    </main>
  );
}

export default App;
