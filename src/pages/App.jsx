import React, { useEffect, useState } from 'react';
import './App.css';
import useFetch from 'use-http';
import Button from '../components/Button';
import EventSection from '../components/EventSection';
import Loading from '../components/Loading';
import Error from '../components/Error';
import generateId from '../utils/generateId';

const BASE_PATH = process.env.REACT_APP_API_BASE_PATH;
const MAX_UPCOMING_EVENTS = 5;
const HIGHLIGHT_EVENTS_SECTION = {
  id: generateId(),
  label: `Upcoming ${MAX_UPCOMING_EVENTS} events`,
  limit: MAX_UPCOMING_EVENTS,
  events: [],
};
const RETRY_OPTIONS = { retries: 2, retryDelay: 3000 };

function App() {
  const [sections, setSections] = useState([]);
  const {
    get: getEvents,
    response: responseEvents,
    loading: isLoadingEvents,
    error: errorEvents,
  } = useFetch(`${BASE_PATH}/events`, RETRY_OPTIONS);
  const {
    get: getCategories,
    response: responseCategories,
    error: errorCategories,
  } = useFetch(`${BASE_PATH}/categories`, RETRY_OPTIONS);
  const hasFetchError = errorCategories || errorEvents;

  useEffect(() => {
    Promise.all([getCategories(), getEvents()]).then(([categories, events]) => {
      if (!responseEvents.ok && !responseCategories.ok) return;

      const parsedSection = [HIGHLIGHT_EVENTS_SECTION, ...categories].reduce(
        (parsedEvents, category, index) => {
          const _parsedEvents = [...parsedEvents];
          const isHighlightSection = categories.some(({ id }) => id === category.id);
          const eventsInCategory = events.filter(
            ({ categoryId }) => categoryId === category.id,
          );

          _parsedEvents[index] = {
            ...category,
            events: isHighlightSection
              ? eventsInCategory
              : events.slice(0, category.limit),
          };

          return _parsedEvents;
        },
        [],
      );

      setSections(parsedSection);
    });
  }, [getCategories, getEvents, responseEvents, responseCategories]);

  const handleCreateEventClick = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <main className="App">
      {isLoadingEvents && <Loading />}
      {hasFetchError && <Error />}
      {!sections.length ? (
        <h1>there are no events at this time</h1>
      ) : (
        <>
          <Button
            onClick={handleCreateEventClick}
            text="Create Event"
            type="open"
            icon="add"
          />

          {sections.map(({ id, label, events }) => (
            <EventSection key={id} {...{ label, events }} />
          ))}
        </>
      )}
    </main>
  );
}

export default App;
