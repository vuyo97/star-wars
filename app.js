const {ApolloServer , gql} = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`type People{
    name: String,
    height: String,
    mass: String,
    gender: String, 
    homeworld: String}
    
    type Query{
        people : [People]
    }`;

    const resolvers = {
        Query:{
            people : async () => {
                try{
                    const result = await axios.get("https://swapi.dev/api/people/");
                    return result.data.results.map(({name,height,mass, gender,homeworld})=>({
                         name,
                         height ,
                         mass,
                         gender,
                         homeworld
                     }))
                }catch(error){
                    throw error
                }
            }
        }
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.listen().then(({url})=> console.log(`Server started at ${url}`)); 