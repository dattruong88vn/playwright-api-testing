import { NON_EXISTENT_BOOKING_ID } from "@/utils/constants";

import { mockBookingData } from "@/data/booking-data";
import { expect, test } from "@/fixtures/booking";
import { NewBooking } from "@/models/booking";

test.describe("/booking: create new booking", () => {
  test("creates a booking and returns the submitted data", async ({
    bookingApi,
  }) => {
    const data = mockBookingData();
    const response = await bookingApi.createBooking(data);
    expect(response.status()).toBe(200); // Restful-Booker trả 200 khi tạo thành công, không dùng 201
    const responseBody: NewBooking = await response.json();
    expect(responseBody.bookingid).toEqual(expect.any(Number));
    expect(responseBody.booking).toEqual(data);
  });
});

test.describe("/booking: get detail booking", () => {
  test("get with valid booking id", async ({ bookingCreate, bookingApi }) => {
    const response = await bookingApi.getBookingDetail(bookingCreate.bookingid);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual(bookingCreate.booking);
  });

  test("returns 404 when the booking does not exist", async ({
    bookingApi,
  }) => {
    const response = await bookingApi.getBookingDetail(NON_EXISTENT_BOOKING_ID);
    expect(response.status()).toBe(404);
    expect(await response.text()).toBe("Not Found");
  });
});
