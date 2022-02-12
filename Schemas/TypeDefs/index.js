const {ApolloServer , gql} = require("apollo-server");

const typeDefs = gql `type People{
    name: String,
    height: String,
    mass: String,
    gender: String, 
    homeworld: String
    }
    
    type Query{
        people : [People]
    }`;


    module.exports = typeDefs;