import { expect, test as base } from "@playwright/test";

import BookingApi from "@/api/booking";

import { mockBookingData } from "@/data/booking-data";
import { NewBooking } from "@/models/booking";

interface ApiFixtures {
  bookingApi: BookingApi;
}

interface BookingFixtures {
  bookingCreate: NewBooking;
}

export const test = base.extend<ApiFixtures & BookingFixtures>({
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

    // delete booking
  },
});

export { expect } from "@playwright/test";
