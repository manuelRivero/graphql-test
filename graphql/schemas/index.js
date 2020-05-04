const {buildSchema} = require('graphql');

const Schema = buildSchema(`

        type Booking {
            _id:ID!
            event:Event!
            user:User!
            createdAt:String!
            updatedAt:String!

        }

        type Event {
            _id:ID!
            title:String!
            description:String!
            price:String!
            date:String!
            creator:User!
        }
        type User {
            _id:ID!
            name:String
            email:String!
            password:String
            createdEvents:[Event!]
        }
        type AuthData {
            _id: ID!
            token: String!
            tokenExpiration: Int!
        }
        input eventInput {
            title:String
            description:String
            price:Float
            date:String
        }
        input userInput {
            name:String
            email:String
            password:String
        }
        type RootQuery {
            events: [Event!]!
            booking: [Booking!]!
            login(email:String!, password:String!): AuthData
        }
        type RootMutation {
            createEvents(eventInput: eventInput): Event
            createUser(userInput: userInput): User
            bookEvent(eventId: ID!): Booking!
            cancelBooking(eventId: ID!): Booking!
        }
        schema {
            query:RootQuery
            mutation:RootMutation
        }
    `)

    module.exports = Schema;