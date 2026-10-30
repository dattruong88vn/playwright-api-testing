import { APIRequestContext, APIResponse } from "@playwright/test";

import { BOOKING_ENDPOINT } from "@/utils/route";

import { Booking, PartialBooking } from "@/models/booking";

class BookingApi {
  constructor(private request: APIRequestContext) {}

  private authHeaders(token?: string): Record<string, string> {
    return token ? { Cookie: `token=${token}` } : {};
  }

  getBookingDetail(id: number): Promise<APIResponse<Booking>> {
    return this.request.get(`${BOOKING_ENDPOINT}/${id}`);
  }

  createBooking(data: Booking) {
    return this.request.post(BOOKING_ENDPOINT, { data });
  }

  updateBooking(id: number, data: Booking, token?: string) {
    return this.request.put(`${BOOKING_ENDPOINT}/${id}`, {
      data,
      headers: this.authHeaders(token),
    });
  }

  partialUpdateBooking(id: number, data: PartialBooking, token?: string) {
    return this.request.patch(`${BOOKING_ENDPOINT}/${id}`, {
      data,
      headers: this.authHeaders(token),
    });
  }

  deleteBooking(id: number, token?: string) {
    return this.request.delete(`${BOOKING_ENDPOINT}/${id}`, {
      headers: this.authHeaders(token),
    });
  }
}

export default BookingApi;
