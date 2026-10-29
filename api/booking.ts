import { APIRequestContext, APIResponse } from "@playwright/test";

import { BOOKING_ENDPOINT } from "@/utils/route";

import { Booking } from "@/models/booking";

class BookingApi {
  constructor(private request: APIRequestContext) {}

  getBookingDetail(id: number): Promise<APIResponse<Booking>> {
    return this.request.get(`${BOOKING_ENDPOINT}/${id}`);
  }

  createBooking(data: Booking) {
    return this.request.post(BOOKING_ENDPOINT, { data });
  }

  updateBooking(id: number, data: Booking, token?: string) {
    return this.request.put(`${BOOKING_ENDPOINT}/${id}`, {
      data,
      headers: { Cookie: `token=${token}` },
    });
  }
}

export default BookingApi;
