import sortByDate from './sortByDate';

const parseEvents = (categories, events, subscriptions) => {
  const eventsWithSubscription = events.map((event) => ({
    ...event,
    hasSubscription: subscriptions.some(({ eventId }) => eventId === event.id),
  }));
  const eventsSorted = sortByDate(eventsWithSubscription, 'date');

  return categories.reduce((parsedEvents, category, index) => {
    const _parsedEvents = [...parsedEvents];
    const eventsInCategory = eventsSorted.filter(
      ({ categoryId }) => categoryId === category.id,
    );

    _parsedEvents[index] = {
      ...category,
      events: category.isHighlightSection
        ? eventsSorted.slice(0, category.limit)
        : eventsInCategory,
    };

    return _parsedEvents;
  }, []);
};

export default parseEvents;
