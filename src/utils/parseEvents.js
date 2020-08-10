import sortByDate from './sortByDate';

const parseEvents = (_categories, _events, _subscriptions) => {
  const eventsWithSubscription = _events.map((event) => ({
    ...event,
    hasSubscription: _subscriptions.some(({ eventId }) => eventId === event.id),
  }));
  const eventsSorted = sortByDate(eventsWithSubscription, 'date');

  return _categories.reduce((parsedEvents, category, index) => {
    const _parsedEvents = [...parsedEvents];
    const eventsInCategory = eventsSorted.filter(
      ({ categoryId }) => categoryId === category.id,
    );

    _parsedEvents[index] = {
      ...category,
      events: category.isHighlightSection
        ? eventsWithSubscription.slice(0, category.limit)
        : eventsInCategory,
    };

    return _parsedEvents;
  }, []);
};

export default parseEvents;
