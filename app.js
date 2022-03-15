const {ApolloServer} = require("apollo-server");
const typeDefs = require("./Schemas/TypeDefs/index");
const axios = require("axios");
var cors = require('cors')

require('dotenv').config();
const PORT = process.env.PORT || 5000;
//middleware
// var allowedOrigins = ['http://localhost:4000','http://localhost:5000',
//                       'https://sws-api.netlify.app/'];

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
                    console.log("All 83");
                }
                return collection;
            }
                       
            }
            // console.log(collection)
        
            return collection.map(({name,height,mass, gender,homeworld,url,films,starships})=>({
                    name,
                    height ,
                    mass,
                    gender,
                    homeworld,
                    url,
                    films,
                    starships
                }));
        }catch(error){
            throw error
        }
        },
       getProfile : async (parent, args, context, info) => {
            const { input } = args;
            console.log(input.name);
            collection = [];
            try{ 

            const result = await axios.get(`https://swapi.dev/api/people/?search=${input.name}`);
            console.log(result.data.results)
            collection = [...collection, ...result.data.results];

            return collection.map(({name,height,mass,gender,homeworld})=>({
                name,
                height,
                mass,
                gender,
                homeworld
                }));
                }
            catch(error){
            throw error
            }
        },
       getPlanet : async (parent, args, context, info) => {
            const { url } = args;
            try{ 
                 let collection = [];

                const result = await axios.get(`${url}`);
               // console.log(result.data)
                let data =[result.data]
                collection = [...collection, ...data];
                 
                console.log(collection)
            
                return collection.map(({name,rotation_period,orbital_period, diameter,climate,gravity,terrain,surface_water,population,url})=>({
                    name,
                    rotation_period,
                    orbital_period,
                    diameter,
                    climate,
                    gravity,
                    terrain,
                    surface_water,
                    population,
                    url
                    }));
            }catch(error){
                throw error
            }

        },
       getFilms : async (parent, args, context, info) => {
            const { urls } = args;
            //console.log(urls)

            try{ 
                 let collection = [];
                 let links=urls;

             for(let l=0;l<links.length;l++){
                const result = await axios.get(links[l]);
               // console.log(result.data);
                //console.log(l);

                let data =[result.data]
                collection = [...collection, ...data];
                }
               // console.log(collection)
            
                return collection.map(({title,url})=>({
                    title,url
                    }));
            }catch(error){
                throw error
            }

        },
       getStarships : async (parent, args, context, info) => {
        const { urls } = args;
        console.log(urls)

        try{ 
             let collection = [];
             let links=urls;

         for(let l=0;l<links.length;l++){
            const result = await axios.get(links[l]);
            console.log(result.data);
            console.log(l);

            let data =[result.data]
            collection = [...collection, ...data];
            }
           // console.log(collection)
        
            return collection.map(({name,url})=>({
                name,url
                }));
        }catch(error){
            throw error
        }
        }
    }
   
}
const server = new ApolloServer({cors: {
    origin: '*',	
    credentials: true},
    typeDefs,
    resolvers
})



server.listen(PORT,()=> console.log(`Server started at ${PORT}`)); 
