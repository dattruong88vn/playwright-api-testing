export interface BookingDate {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDate;
  additionalneeds: string;
  bookingid?: number;
}

export type NewBooking = { booking: Booking } & { bookingid: number };
