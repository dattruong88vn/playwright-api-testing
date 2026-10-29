import { NON_EXISTENT_BOOKING_ID } from "@/utils/constants";

import { mockBookingData } from "@/data/booking-data";
import { expect, test } from "@/fixtures";
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
    const responseBookingDetail = await bookingApi.getBookingDetail(
      bookingCreate.bookingid,
    );
    expect(responseBookingDetail.status()).toBe(200);
    const responseBodyBookingDetail = await responseBookingDetail.json();
    expect(responseBodyBookingDetail).toEqual(bookingCreate.booking);
  });

  test("returns 404 when the booking does not exist", async ({
    bookingApi,
  }) => {
    const responseBookingDetail = await bookingApi.getBookingDetail(
      NON_EXISTENT_BOOKING_ID,
    );
    expect(responseBookingDetail.status()).toBe(404);
    expect(await responseBookingDetail.text()).toBe("Not Found");
  });
});

test.describe("/booking: update booking", () => {
  const invalidCases = [
    {
      name: "rejects an update without a token",
      data: {
        firstname: "Changed",
        totalprice: 999,
        depositpaid: false,
      },
      token: undefined,
    },
    {
      name: "rejects an update with invalid token",
      data: {
        firstname: "Changed again",
        totalprice: 1234,
        depositpaid: false,
      },
      token: "dummy token",
    },
  ];

  for (const { name, data, token } of invalidCases) {
    test(
      name,
      async ({ bookingCreate: { booking, bookingid }, bookingApi }) => {
        const newData = mockBookingData(data);
        const responseUpdateBooking = await bookingApi.updateBooking(
          bookingid,
          newData,
          token,
        );
        expect(responseUpdateBooking.status()).toBe(403);
        expect(await responseUpdateBooking.text()).toBe("Forbidden");

        const responseBookingDetail =
          await bookingApi.getBookingDetail(bookingid);
        expect(responseBookingDetail.status()).toBe(200);
        expect(await responseBookingDetail.json()).toEqual(booking);
      },
    );
  }

  // valid token
  test("replaces the whole booking with the new data", async ({
    bookingCreate: { bookingid, booking },
    bookingApi,
    token,
  }) => {
    const newData = mockBookingData({
      firstname: "Dat",
      lastname: "truong",
      totalprice: 88568,
      depositpaid: false,
      bookingdates: { checkin: "2020-01-01", checkout: "2020-01-10" },
      additionalneeds: "Dinner",
    });
    const updateResponse = await bookingApi.updateBooking(
      bookingid,
      newData,
      token,
    );
    expect(updateResponse.status()).toBe(200);
    const updateResponseBody = await updateResponse.json();
    expect(updateResponseBody).not.toEqual(booking);
    expect(updateResponseBody).toEqual(newData);

    const detailResponse = await bookingApi.getBookingDetail(bookingid);
    expect(detailResponse.status()).toBe(200);
    expect(await detailResponse.json()).toEqual(newData);
  });
  //// booking does not exist

  //// missing data: firstname, lastname...
});
