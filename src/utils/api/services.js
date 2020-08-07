import { get } from './request';

export function getEvents() {
  return get('events');
}

export function postEvent() {}

export function getCategories() {
  return get('categories');
}
