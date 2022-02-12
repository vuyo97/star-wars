const {ApolloServer , } = require("apollo-server");
const express = require("express");
const app = express();
const PORT = 4000;
//const {graphqlHTTP} = require("express-graphql");
const schema = require("./Schemas/index");
const typeDefs = require("./Schemas/TypeDefs/index");
const axios = require("axios");

//const {resolvers} = require("./Schemas/index");

const resolvers = {
    Query:{
        people : async () => {
            try{
                const result = await axios.get("https://swapi.dev/api/people/");
                console.log(result.data.results)
                return result.data.results.map(({name,height,mass, gender,homeworld})=>({
                    name,
                    height ,
                    mass,
                    gender,
                    homeworld
                }));
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

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql :true
// }));
  
// app.listen(PORT, ()=>{
//   console.log(`Server running on ${PORT}`)
// })