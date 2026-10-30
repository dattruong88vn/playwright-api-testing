import BookingApi from "@/api/booking";

import { mockBookingData } from "@/data/booking-data";
import { expect, test as base } from "@/fixtures/auth";
import { NewBooking } from "@/models/booking";

interface BookingFixtures {
  bookingApi: BookingApi;
  bookingCreate: NewBooking;
  bookingIds: number[];
}

export const test = base.extend<BookingFixtures>({
  // API
  bookingApi: async ({ request }, use) => {
    const bookingApi = new BookingApi(request);
    await use(bookingApi);
  },

  bookingCreate: async ({ bookingApi, bookingIds }, use) => {
    const response = await bookingApi.createBooking(mockBookingData());
    expect(response.status()).toBe(200);
    const booking: NewBooking = await response.json();
    await use(booking);
    bookingIds.push(booking.bookingid);
  },

  bookingIds: async ({ token, bookingApi }, use) => {
    const ids: number[] = [];
    await use(ids);
    for (const id of ids) {
      await bookingApi.deleteBooking(id, token); // không assert
    }
  },
});

export { expect } from "@playwright/test";
