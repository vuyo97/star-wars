const {ApolloServer} = require("apollo-server");
const PORT = process.env.PORT || 5000;

//const schema = require("./Schemas/resolvers/index");
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
                    console.log("All 83");
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
             console.log(collection)
        
            return collection.map(({name,height,mass, gender,homeworld,url})=>({
                    name,
                    height ,
                    mass,
                    gender,
                    homeworld,
                    url
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
            //console.log(url);
            //let collection = [];
            try{ 
                // const url = "https://swapi.dev/api/people/";
                 let collection = [];
                // let pageNo = 1;
                // const { data } = await axios.get(`${url}`);
                // let res = data;
                    //console.log(res)

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