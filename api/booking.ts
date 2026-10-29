import { APIRequestContext } from "@playwright/test";

import { BOOKING_ENDPOINT } from "@/utils/route";

import { Booking } from "@/models/booking";

class BookingApi {
  constructor(private request: APIRequestContext) {}

  getBookingDetail(id: number) {
    return this.request.get(`${BOOKING_ENDPOINT}/${id}`);
  }

  createBooking(data: Booking) {
    return this.request.post(BOOKING_ENDPOINT, { data });
  }
}

export default BookingApi;
