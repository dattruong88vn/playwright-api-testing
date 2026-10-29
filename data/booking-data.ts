import { Booking, BookingDate } from "@/models/booking";

export const mockBookingData = (
  overrides: Partial<Omit<Booking, "bookingdates" | "bookingid">> & {
    bookingdates?: Partial<BookingDate>;
  } = {},
): Omit<Booking, "bookingid"> => {
  return {
    firstname: "Dat",
    lastname: "Truong",
    totalprice: 11511,
    depositpaid: true,
    additionalneeds: "Breakfast",
    ...overrides,
    bookingdates: {
      checkin: "1987-11-26",
      checkout: "1988-01-15",
      ...overrides.bookingdates,
    },
  };
};
