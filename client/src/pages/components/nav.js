import React,{useState, useEffect} from 'react';
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import Logo from '../../assets/logo2.png';
import loader from '../../assets/logo.png';




const Nav = () => {
    // const { operations, models } = usePersonFilters();
    // const { data, loading, error, refetch } = useQuery(GET_PERSON);
  
    // if (loading){
    //     return <div className="w3-center w3-text-cyan w3-black loaderContainer bg">
    //           <h1><span className='w3-animate-fading loaderText' >Querying the universe ...</span></h1>
    //           <img src={loader} className="loaderLogo w3-animate-fading" alt="Star Wars Loading Logo" />
    //           </div>
    //   }
    // if (error) return <div>error</div>;

    return(
        <nav className="nav">
        <ul>
        <li className="w3-bar-item items">
        <img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
        </li>
        <li className="w3-bar-item items">
        <input type="search" className="w3-hover-opacity searchBtn" placeholder="Search the universe" onChange={(e) => operations.updateFilter("name", e.target.value)}
          type="string"/>
        </li >
        <li className="w3-bar-item items">
        <button className="w3-bar-item items w3-text-cyan w3-inherit w3-round w3-border-cyan" onClick={() => refetch({albumsInput: { name: models.filters.name },})}> Search
      </button>
        </li >
        </ul>
        </nav>
    )

}

export default Nav;