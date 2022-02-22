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
        getPeople : async () => {
        try{ 
            const url = "https://swapi.dev/api/people/";
            let collection = [];
            let pageNo = 1;
            const { data } = await axios.get(`${url}`);
            let res = data;

            while(res.results){
            console.log(res.next+" - page " +pageNo)
            //console.log(res)

            //console.log(pageNo)
            if (res.next != null) {
                collection = [...collection, ...res.results];
                const { data } = await axios.get(res.next);
                res = data;
                pageNo++
            }else{
                if(res.next == null && res.results){
                    collection = [...collection, ...res.results];
                    console.log(res.results);
                }
                return collection;
            }
           // pageNo++;
          //   if(res.next!=null){
                //  const { data } = await axios.get(res.next);
                //  res = data;
             //   }
            
           // const { data } = await axios.get(`${url}/?page=${pageNo}`);
            
            }
            // console.log(collection)
        
            return collection.map(({name,height,mass, gender,homeworld,next})=>({
                    name,
                    height ,
                    mass,
                    gender,
                    homeworld,
                    next
                }));
        }catch(error){
            throw error
        }
        },
       getPerson : async (_parents,{name}) => {
        try{ 
        const result = await axios.get(`https://swapi.dev/api/people/?search=${name}`);
        console.log(result.data.results)
        return result.data.results.map(({name,height,mass,gender,homeworld})=>({
            name,
            height,
            mass,
            gender,
            homeworld,
            next
            }));
            }catch(error){
            throw error
        }
        }//,
    //    getNext : async (_parents,{url}) => {
    //     try{ const result = await axios.get(`${url}`);
    //     console.log(result.data.results)
    //     return result.data.results.map(({name,height,mass, gender,homeworld,next})=>({
    //         name,
    //         height ,
    //         mass,
    //         gender,
    //         homeworld,
    //         next
    //     }));
    //     }catch(error){
    //     throw error
    // }
    //   }
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