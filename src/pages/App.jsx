import React, { useEffect, useState } from 'react';
import useFetch from 'use-http';
import styles from './App.module.css';
import Button from '../components/Button';
import EventSection from '../components/EventSection';
import Loading from '../components/Loading';
import Error from '../components/Error';
import generateId from '../utils/generateId';
import Modal from '../components/Modal';
import EventCreationForm from '../components/EventCreationForm';
import parseEvents from '../utils/parseEvents';

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

const App = () => {
  const [sections, setSections] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const {
    get: getEvents,
    response: responseEvents,
    loading: isLoadingEvents,
    error: errorEvents,
  } = useFetch(`${BASE_PATH}/events`, RETRY_OPTIONS);
  const {
    get: getCategories,
    response: responseCategories,
    loading: isLoadingCategories,
    error: errorCategories,
  } = useFetch(`${BASE_PATH}/categories`, RETRY_OPTIONS);
  const {
    get: getSubscriptions,
    post: postSubscriptions,
    delete: deleteSubscriptions,
    response: responseSubscriptions,
    loading: isLoadingSubscriptions,
    error: errorSubscriptions,
  } = useFetch(`${BASE_PATH}/subscriptions`, RETRY_OPTIONS);
  const hasFetchError = errorCategories || errorEvents || errorSubscriptions;
  const isLoading = isLoadingEvents || isLoadingCategories || isLoadingSubscriptions;
  const [hasEvents, setHasEvents] = useState(true);

  useEffect(() => {
    Promise.all([getCategories(), getEvents(), getSubscriptions()]).then(
      ([_categories, _events, _subscriptions]) => {
        if (!responseEvents.ok || !responseCategories.ok || !responseSubscriptions.ok) {
          return;
        }

        const parsedEvents = parseEvents(
          [HIGHLIGHT_EVENTS_SECTION, ..._categories],
          _events,
          _subscriptions,
        );

        setSections(parsedEvents);
        setEvents(_events);
        setCategories(_categories);
        setSubscriptions(_subscriptions);
        setHasEvents(Boolean(_events.length));
      },
    );
  }, [
    getCategories,
    getEvents,
    getSubscriptions,
    responseEvents,
    responseCategories,
    responseSubscriptions,
  ]);

  const removeSubscription = (id) => {
    deleteSubscriptions(id).then((_) => {
      const filteredSubscriptions = subscriptions.filter(({ id: _id }) => _id !== id);
      const parsedEvents = parseEvents(
        [HIGHLIGHT_EVENTS_SECTION, ...categories],
        events,
        filteredSubscriptions,
      );

      setSubscriptions(filteredSubscriptions);
      setSections(parsedEvents);
    });
  };

  const updateSubscriptions = (payload) => {
    postSubscriptions(payload).then((_subscription) => {
      const updatedSubscriptions = [...subscriptions, _subscription];
      const parsedEvents = parseEvents(
        [HIGHLIGHT_EVENTS_SECTION, ...categories],
        events,
        updatedSubscriptions,
      );

      setSubscriptions(updatedSubscriptions);
      setSections(parsedEvents);
    });
  };

  const handleFavoriteEventCheckboxChange = ({ checked }, id) => {
    if (checked) {
      const payload = { id: generateId(), eventId: id };

      updateSubscriptions(payload);
    } else {
      const { id: deleteSubscriptionId } = subscriptions.find(
        ({ eventId }) => eventId === id,
      );

      removeSubscription(deleteSubscriptionId);
    }
  };

  return (
    <main className={styles.app}>
      {isLoading && <Loading />}
      {hasFetchError && <Error />}
      {!hasEvents && <h1>there are no events at this time</h1>}
      {Boolean(sections.length) && (
        <>
          <header className={styles.createEventContainer}>
            <Modal
              title="Create event"
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

          {sections.map(({ id, label, events: _events }) => (
            <EventSection
              key={id}
              events={_events}
              label={label}
              onChange={handleFavoriteEventCheckboxChange}
            />
          ))}
        </>
      )}
    </main>
  );
};

export default App;
