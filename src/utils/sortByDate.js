/**
 *
 * @param {[{date: string}]} elements
 * @param {string} dateKey
 */
const sortByDate = (elements, dateKey) => {
  return [...elements].sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
};

export default sortByDate;
