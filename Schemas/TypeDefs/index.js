const {ApolloServer , gql} = require("apollo-server");

const typeDefs = gql `type People{
    name: String,
    height: String,
    mass: String,
    gender: String, 
    homeworld: String
    }

    input PersonInputFilter {
        name: String
      }
    
    type Query{
        getPeople: [People]
        getPerson(input: PersonInputFilter): [People]
    }`;


    module.exports = typeDefs;