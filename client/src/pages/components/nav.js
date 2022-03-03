import React,{useState, useEffect} from 'react';
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import Logo from '../../assets/logo2.png';
import loader from '../../assets/logo.png';
import Search from '../Search';




const Nav = () => {
    return(
      <nav className="nav">
      <ul>
      <li className="w3-bar-item items">
      <img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
      </li>
      <li className="w3-bar-item items">
      <input type="search" className="w3-hover-opacity searchBtn" placeholder="Search the universe"  
      onChange={(e) => operations.updateFilter("name", e.target.value)}
         />
        {filteredData.length !== 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a className="dataItem" onClick={()=> showPerson(value)}>
                  <p>{value.name}</p>
                </a>
              );
            })}
          </div>
        )}
      </li >
      </ul>
      </nav>
    )

}

export default Nav;