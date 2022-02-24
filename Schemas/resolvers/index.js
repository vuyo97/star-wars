const axios = require("axios");
const graphql =  require("graphql");
const asyncWrapper = require("../../middleware/async");
const {GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList} = graphql;

const PeopleType = new GraphQLObjectType({
    name:"People",
    fields: () =>({
        name :{type:GraphQLString},
        height :{type:GraphQLString},
        mass :{type:GraphQLString},
        gender :{type:GraphQLString},
        homeworld :{type:GraphQLString}
    })
});

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

const RootQuery= new GraphQLObjectType({
    name:"RootQueryType",
    fields : {
        getPeople: {
        type : new GraphQLList(PeopleType),
       // args :{ name :{type: GraphQLString}},
        resolve (parent,args) {
            const results = asyncWrapper(async () =>  {await axios.get("https://swapi.dev/api/people/?page=2")});
            console.log(results);
//console.log(resolver.Query.people)
            return [results];
         }
       }
    }
});

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields :{
        createPerson :{
            type : PeopleType,
            args : {
                name :{type:GraphQLString},
                height :{type:GraphQLString},
                mass :{type:GraphQLString},
                gender :{type:GraphQLString},
                homeworld :{type:GraphQLString}
            },
            resolve(parent,args){
            //DB insert statement
            return args;
            }
        }
    }
});

module.exports = resolvers;