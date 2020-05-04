const Event = require("./../../models/events");
const User = require("./../../models/users");
const { dateToString } = require("./../../helpers/dateHelper");
const {findCreator} = require("./resolversHelpers")


const transformEvent = (event) => {
  return {
    ...event._doc,
    creator: () => findCreator(event._doc.creator),
    date: dateToString(event._doc.date),
  };
};


const eventResolver = {
    
    events: async (args) => {
      try {
        const events = await Event.find();
        return events.map((event) => {
          return transformEvent(event)
        });
      } catch (error) {
        throw error;
      }
    },
    createEvents: async (args, req) => {
      const { title, description, price, date } = args.eventInput;
      const {isAuth, userId} = req;
      if(!isAuth){
        throw new Error ("Unauthorized!")
      }
      const newEvent = new Event({
        title,
        description,
        price,
        date,
        creator: userId,
      });
  
      try {
        const user = await User.findById(userId);
  
        if (!user) {
          throw new Error("User dont exist!");
        }
        const event = await newEvent.save();
        user.createdEvents.push(newEvent);
        await user.save();
  
        return transformEvent(event)
      } catch (error) {
        throw error;
      }
    }
}

module.exports = eventResolver;