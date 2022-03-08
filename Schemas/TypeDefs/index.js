const {ApolloServer , gql} = require("apollo-server");

const typeDefs = gql`type People{
    name: String,
    height: String,
    mass: String,
    gender: String, 
    homeworld: String,
    url:String,
    films:[String],
    starships:[String]
    }

    type Planet{
      name: String,
      rotation_period: String,
      orbital_period: String,
      diameter: String,
      climate: String,
      gravity: String,
      terrain: String,
      surface_water: String,
      population: String,
      url: String
    }

    type Homeworld{
     name: String
    }

    type Films{
      title: String,
      url:String
    }
    
    type Ships{
      name: String,
      url:String
    }

    input PersonInput {
      name: String
    }

    input PlanetInput {
      PlanetInput: String!
    }
    
    type Query{
        getPeople: [People]
        getProfile(input: PersonInput): [People]
        getPlanet(url: String!): [Planet]!
        getFilms(urls: [String]!):[Films]
        getStarships(urls: [String]!):[Ships]
    }`;


    module.exports = typeDefs;