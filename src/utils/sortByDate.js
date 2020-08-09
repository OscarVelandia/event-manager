/**
 *
 * @param {[{date: string}]} elements
 * @param {string} dateKey
 */
export default function (elements, dateKey) {
  return [...elements].sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
}
