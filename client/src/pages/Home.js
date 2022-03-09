import React,{useState} from 'react';
import gql from "graphql-tag";
import axios from 'axios';
import { useQuery } from "@apollo/react-hooks";
import Nav from './components/nav';
import Background from './components/background';
import Pagination from './components/pagination';
import Profile from './components/profile';
import loader from '../assets/logo.png';
import '../App.css';
import "./Search.css";
import "./components/comp.css";

const GET_PEOPLE =  gql`query {
    getPeople{
        name
        height
        mass
        gender
        homeworld
        url
      }
  }`
  
const Home = () => {
  const {loading , error, data} = useQuery(GET_PEOPLE);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({});

  const HandleView = async (breakpoint,value) => {
    const {data} = await axios.get(`https://swapi.dev/api/people/?search=${value.name}`);
    //console.log(data.results);
    setProfile(data.results[0]);
    setShow(breakpoint);
  }

  if (error) return <h1 className="w3-center w3-text-red ">Something went wrong!</h1>
  if (loading){
    return <div className="w3-center w3-text-cyan w3-black loaderContainer bg">
          <h1><span className='loaderText' >Entering the universe ...</span></h1>
          <img src={loader} className="loaderLogo w3-animate-fading" alt="Star Wars Logo" />
          {/* <img src={clip} autoPlay muted loop /> */}
          </div>
  }
  
  function closeModal() {
    setShow(false);
    setProfile({});
  }

  return(
    <div className="Home">
        <Nav items={data} handelProfile={HandleView} />
        {show &&
          (<Profile personData={profile} handelModal={closeModal}/>)
        }
        <Background />
        <Pagination itemsPerPage={12} data={data} handleModal={HandleView} />
    </div>
  )
    
}

export default Home;
