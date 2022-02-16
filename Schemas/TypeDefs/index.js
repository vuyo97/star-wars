const {ApolloServer , gql} = require("apollo-server");

const typeDefs = gql `type People{
    name: String,
    height: String,
    mass: String,
    gender: String, 
    homeworld: String
    }
    
    type Query{
        getPeople : [People]
        getPerson(name: String): [People]
    }`;


    module.exports = typeDefs;