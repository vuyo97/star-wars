import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
//import Nav from './components/nav';
import Background from './components/background';
import People from './components/people';
import Profile from './components/profile';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

import axios from 'axios'
import Logo from '../assets/logo2.png';
import loader from '../assets/logo.png';
import * as $ from 'jquery';
import '../App.css';
import "./Search.css";
import "./components/comp.css";


const customStyles = {
  content: {
    zIndex:'999',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
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
  
const GET_PERSON =  gql`query Query($personInput: PersonInputFilter){
    getPerson(input : $personInput ) {
        name
        height
        mass
        gender
        homeworld
      }
  }`


const Home = () => {
  const { operations, models } = usePersonFilters();
  const {loading , error, data} = useQuery(GET_PEOPLE);
  const [filteredData, setFilteredData] = useState([]);
  const [enteredWord, setEnteredWord] = useState([]);

  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({});

  const HandleView = async (breakpoint,value) => {
    const {data} = await axios.get(`https://swapi.dev/api/people/?search=${value.name}`);
    console.log(data.results);
    setProfile(data.results[0]);
     console.log(value)
    setShow(breakpoint);
  }

  const clearInput = () => {
    //setFilteredData([]);
    setEnteredWord("");
  };

  
  

      $(".searchBtn" ).blur(function() {
        $(".dataResult" ).hide( "slow");
       // clearInput();
      })
      $(".searchBtn" ).focus(function() {
        $(".dataResult" ).show( "slow");
      })

      const items = data;
      if (error) return <h1 className="w3-center w3-text-red ">Something went wrong!</h1>
      if (loading){
        return <div className="w3-center w3-text-cyan w3-black loaderContainer bg">
              <h1><span className='loaderText' >Entering the universe ...</span></h1>
              <img src={loader} className="loaderLogo w3-animate-fading" alt="Star Wars Logo" />
              {/* <img src={clip} autoPlay muted loop /> */}
              </div>
      }

  function usePersonFilters() {
        const [filters, _updateFilter] = useState({ 
            name: undefined
        });

        const updateFilter = (filterType, value) => {
            console.log(value)
            const newFilter = items.getPeople.filter((val) => {
             return val.name.toLowerCase().includes(value.toLowerCase());
            });
            console.log("Filter - " + JSON.stringify(newFilter));
            setFilteredData(newFilter);
           // setEnteredWord(newFilter);

          _updateFilter({
            [filterType]: value,
          });
        };
        return {
          models: { filters },
          operations: { updateFilter },
        };
  }

  function Items({ peopleData }) {
    return (
      <>
      <div className="container">
      {peopleData.map((people,i) => (
      <People people={people} key={i} onClick={HandleView} /> 
      ))}
      </div>
      </>
    );
  }

  function Pagination({ itemsPerPage }) {
    const [people, setPeople] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
    //  console.log(data.getPeople);
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setPeople(items.getPeople.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.getPeople.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % items.getPeople.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items peopleData={people} />
        <ReactPaginate
          nextLabel="next "
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="prev"
          pageClassName={`paginationItem ${itemOffset === people ? 'active' : null}`}
          pageLinkClassName="span"
          previousClassName={`prev ${itemOffset === 1 ? 'disabled' : ''}`}
          previousLinkClassName=""
          nextClassName={`next ${itemOffset === people ? 'disabled' : ''}`}
          nextLinkClassName=""
          breakLabel="..."
          breakClassName="paginationItem"
          breakLinkClassName="span"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }
  
  function closeModal() {
    console.log("Home component")
    setShow(false);
    setProfile({});
  }

  return(
    <div className="Home">
        {/* <Nav /> */}
        <nav className="nav">
        <>

        <ul>
        <li className="w3-bar-item items">
        <img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
        </li>
        <li className="w3-bar-item items searchDiv">
        <input  type="search" className="w3-hover-opacity searchBtn" placeholder="Search the universe"  
        onChange={(e) => operations.updateFilter("name", e.target.value)}/>
          {filteredData.length !== 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((prsn,k) => {
                return (
                <div>
                <a className="dataItem" key={k} onClick={() => HandleView(true,{...prsn})}>
                  <p>{prsn.name}</p>
                </a>
                </div>);
                }) 
              }
          </div>)
          }
        </li >
        </ul>
        {show &&
        (<Profile personData={profile} handelModal={closeModal}/>)
        }
        </>
        </nav>
        <Background />
        <Pagination itemsPerPage={12} />
    </div>
  )
    
}

export default Home;
