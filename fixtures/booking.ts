import { expect, test as base } from "@playwright/test";

import BookingApi from "@/api/booking";

import { mockBookingData } from "@/data/booking-data";
import { NewBooking } from "@/models/booking";

interface BookingFixtures {
  bookingApi: BookingApi;
  bookingCreate: NewBooking;
}

export const test = base.extend<BookingFixtures>({
  // API
  bookingApi: async ({ request }, use) => {
    const bookingApi = new BookingApi(request);
    await use(bookingApi);
  },

  bookingCreate: async ({ bookingApi }, use) => {
    const response = await bookingApi.createBooking(mockBookingData());
    expect(response.status()).toBe(200);
    const booking: NewBooking = await response.json();
    await use(booking);
  },
});

export { expect } from "@playwright/test";
