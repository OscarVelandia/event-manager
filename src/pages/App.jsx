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
import sortByDate from '../utils/sortByDate';

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
  category: '',
  location: '',
  date: '',
};

const App = () => {
  const [hasEvents, setHasEvents] = useState(true);
  const [sections, setSections] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newEventForm, setNewEventForm] = useReducer(
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

        setHasEvents(Boolean(_events.length));
        setSections(parsedEvents);
        setEvents(_events);
        setCategories(_categories);
        setSubscriptions(_subscriptions);
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

    setSections(parsedEvents);
    setSubscriptions(newSubscriptions);
  };

  const removeSubscription = (subscriptionId) => {
    deleteSubscriptions(subscriptionId).then(() => {
      const filteredSubscriptions = subscriptions.filter(
        ({ id }) => id !== subscriptionId,
      );

      updateEventsSubscription(filteredSubscriptions);
    });
  };

  const addSubscription = (newSubscription) => {
    postSubscriptions(newSubscription).then((addedSubscription) => {
      const updatedSubscriptions = [...subscriptions, addedSubscription];

      updateEventsSubscription(updatedSubscriptions);
    });
  };

  const handleFavoriteEventCheckboxChange = ({ checked }, id) => {
    if (checked) {
      const newSubscription = { id: generateId(), eventId: id };

      addSubscription(newSubscription);
    } else {
      const { id: subscriptionId } = subscriptions.find(({ eventId }) => eventId === id);

      removeSubscription(subscriptionId);
    }
  };

  const handleCreateEventFormChange = ({ value }, inputName) => {
    setNewEventForm({ [inputName]: value });
  };

  const handleModalClose = () => {
    setNewEventForm(INITIAL_EVENT_FORM_STATE);
  };

  const handleModalSubmit = () => {
    const { label, location, description, date, category } = newEventForm;

    const newEvent = {
      id: generateId(),
      label,
      description,
      location,
      date,
      categoryId: Number(category),
    };

    postEvents(newEvent).then((addedEvent) => {
      const updatedSection = sections.map((section) => {
        return section.id === Number(category)
          ? { ...section, events: sortByDate([...section.events, addedEvent], 'date') }
          : section;
      });

      setEvents((oldEvents) => [...oldEvents, addedEvent]);
      setSections(updatedSection);
      handleModalClose();
    });
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
              activator={(setIsOpen) => (
                <Button
                  onClick={() => setIsOpen(true)}
                  text="Create Event"
                  type="open"
                  icon="add"
                />
              )}>
              <EventCreationForm
                formData={newEventForm}
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
