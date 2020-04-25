const Event = require('./../../models/events');
const User = require('./../../models/users');

const { dateToString } = require("./../../helpers/dateHelper");



const findEvent = async (event) => {
  const fetchedEvent = await Event.findById(event);
  console.log(fetchedEvent)
  return {
    ...fetchedEvent._doc,
    creator: findCreator(fetchedEvent._doc.creator),
  };
};
const findEvents = async (eventsList) => {
  try {
    const data = await Event.find({ _id: { $in: eventsList } });
    return data.map((event) => {
      return {
        ...event._doc,
        creator: () => findCreator(event.creator._id),
      };
    });
  } catch (error) {
    throw error;
  }
};
const findCreator = async (id) => {
  try {
    const user = await User.findById(id);
    return {
      ...user._doc,
      createdEvents: () => findEvents(user.createdEvents),
    };
  } catch (error) {
    throw error;
  }
};

const transformBooking = async (booking) => {
  return {
    ...booking._doc,
    user: () => findCreator(booking._doc.user),
    event: () => findEvent(booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.createdAt),
  };
};



module.exports = {
  findEvent,
  findEvents,
  findCreator,
  transformBooking
};
