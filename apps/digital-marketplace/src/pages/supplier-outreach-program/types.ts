export interface Bookings {
    availableDatesToBook: string[]; // 2025-01-11
    bookingsAvailability: {
        [date: string]: { [slot in 'AM' | 'PM']: boolean };
    };
}
