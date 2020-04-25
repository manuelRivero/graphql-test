const Booking = require("./../../models/booking");
const {transformBooking} = require("./resolversHelpers")

const bookingResolver = {
  booking: async (args) => {
    let bookingList = [];
    try {
      const bookings = await Booking.find();
      bookings.map((booking) => {
        bookingList.push(transformBooking(booking));
      });
      return bookingList;
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args) => {
    const event = args.eventId;
    try {
      const fetchEvent = Event.findById(event);

      if (!fetchEvent) {
        throw new Error("event does no exist! ");
      }
      // const user = await User.findById("5e95df01ab86041b24b9cbc5");
      let newBooking = new Booking({
        event,
        user: "5e95df01ab86041b24b9cbc5",
      });

      const booking = await newBooking.save();
      return transformBooking(booking);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = bookingResolver;
