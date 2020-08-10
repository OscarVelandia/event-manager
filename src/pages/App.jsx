import React, { useEffect, useState, useReducer } from 'react';
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
const INITIAL_EVENT_FORM_STATE = {
  label: '',
  description: '',
  categoryLabel: '',
  location: '',
  date: '',
};

const App = () => {
  const [sections, setSections] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [createEventForm, setCreateEventForm] = useReducer(
    (data, newData) => ({ ...data, ...newData }),
    INITIAL_EVENT_FORM_STATE,
  );
  const {
    get: getEvents,
    post: postEvents,
    response: responseEvents,
    loading: isLoadingEvents,
    error: errorEvents,
  } = useFetch(`${BASE_PATH}/events`, RETRY_OPTIONS);
  const {
    get: getCategories,
    post: postCategories,
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

  const updateEventsSubscription = (newSubscriptions) => {
    const parsedEvents = parseEvents(
      [HIGHLIGHT_EVENTS_SECTION, ...categories],
      events,
      newSubscriptions,
    );

    setSubscriptions(newSubscriptions);
    setSections(parsedEvents);
  };

  const removeSubscription = (subscriptionId) => {
    deleteSubscriptions(subscriptionId).then(() => {
      const filteredSubscriptions = subscriptions.filter(
        ({ id }) => id !== subscriptionId,
      );

      updateEventsSubscription(filteredSubscriptions);
    });
  };

  const updateSubscriptions = (payload) => {
    postSubscriptions(payload).then((_subscription) => {
      const updatedSubscriptions = [...subscriptions, _subscription];

      updateEventsSubscription(updatedSubscriptions);
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

  const handleCreateEventFormChange = ({ value }, inputName) => {
    setCreateEventForm({ [inputName]: value });
  };

  const createEvent = (newCategory) => {
    const { label, location, description, date } = createEventForm;

    const payload = {
      id: generateId(),
      label,
      description,
      location,
      date,
      categoryId: newCategory.id,
    };

    postEvents(payload).then((addedEvent) => {
      const updatedEvents = [...events, addedEvent];
      const updatedSection = { ...newCategory, events: [addedEvent] };

      setEvents(updatedEvents);
      setSections((oldSections) => [...oldSections, updatedSection]);
    });
  };

  const handleModalSubmit = () => {
    const { categoryLabel } = createEventForm;
    const categoryPayload = { id: generateId(), label: categoryLabel };

    postCategories(categoryPayload).then((category) => {
      setCategories((oldCategories) => [...oldCategories, category]);
      createEvent(category);
    });
  };

  const handleModalClose = () => {
    setCreateEventForm(INITIAL_EVENT_FORM_STATE);
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
              submitHandler={handleModalSubmit}
              closeHandler={handleModalClose}
              title="Create event"
              activator={({ setIsOpen }) => (
                <Button
                  onClick={() => setIsOpen(true)}
                  text="Create Event"
                  type="open"
                  icon="add"
                />
              )}>
              <EventCreationForm
                categories={categories}
                onChange={handleCreateEventFormChange}
              />
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
