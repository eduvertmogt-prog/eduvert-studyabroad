export const bookingEvent = "eduvert-open-booking";

export function openBooking() {
  window.dispatchEvent(new Event(bookingEvent));
}
