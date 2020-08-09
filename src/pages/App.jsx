import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';
import styles from './App.module.css';
import Button from '../components/Button';
import EventSection from '../components/EventSection';
import Loading from '../components/Loading';
import Error from '../components/Error';
import generateId from '../utils/generateId';
import sortByDate from '../utils/sortByDate';
import Modal from '../components/Modal';
import EventCreationForm from '../components/EventCreationForm';

const BASE_PATH = process.env.REACT_APP_API_BASE_PATH;
const MAX_UPCOMING_EVENTS = 5;
const HIGHLIGHT_EVENTS_SECTION = {
  id: generateId(),
  label: `Upcoming ${MAX_UPCOMING_EVENTS} events`,
  limit: MAX_UPCOMING_EVENTS,
  isHighlightSection: true,
  events: [],
};
const RETRY_OPTIONS = { retries: 2, retryDelay: 3000 };

function App() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
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
  const [hasEvents, setHasEvents] = useState(true);

  const parseEvents = (_categories, events) => {
    return _categories.reduce((parsedEvents, category, index) => {
      const _parsedEvents = [...parsedEvents];
      const eventsInCategory = events.filter(
        ({ categoryId }) => categoryId === category.id,
      );

      _parsedEvents[index] = {
        ...category,
        events: category.isHighlightSection
          ? events.slice(0, category.limit)
          : eventsInCategory,
      };

      return _parsedEvents;
    }, []);
  };

  useEffect(() => {
    Promise.all([getCategories(), getEvents()]).then(([_categories, events]) => {
      if (!responseEvents.ok && !responseCategories.ok) return;

      const sortedEventsByDate = sortByDate(events, 'date');
      const parsedEvents = parseEvents(
        [HIGHLIGHT_EVENTS_SECTION, ..._categories],
        sortedEventsByDate,
      );

      setSections(parsedEvents);
      setCategories(_categories);
      setHasEvents(Boolean(events.length));
    });
  }, [getCategories, getEvents, responseEvents, responseCategories]);

  return (
    <main className={styles.app}>
      {isLoadingEvents && <Loading />}
      {hasFetchError && <Error />}
      {!hasEvents && <h1>there are no events at this time</h1>}
      {Boolean(sections.length) && (
        <>
          <header className={styles.createEventContainer}>
            <Modal
              activator={({ setIsOpen }) => (
                <Button
                  onClick={() => setIsOpen(true)}
                  text="Create Event"
                  type="open"
                  icon="add"
                />
              )}>
              <EventCreationForm {...{ categories }} />
            </Modal>
          </header>

          {sections.map(({ id, label, events }) => (
            <EventSection key={id} {...{ label, events }} />
          ))}
        </>
      )}
    </main>
  );
}

export default App;
