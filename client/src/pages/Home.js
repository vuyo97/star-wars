import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
//import Nav from './components/nav';
import Background from './components/background';
import People from './components/people';

import axios from 'axios'
import Logo from '../assets/logo2.png';
import loader from '../assets/logo.png';
import '../App.css';



  
const GET_PEOPLE =  gql`query {
    getPeople{
        name
        height
        mass
        gender
        homeworld
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

  

const GetPerson = ({name}) => {
    //const {loading , error, data} = useQuery(GET_PERSON);
    const {loading,error,data} = useQuery(GET_PERSON,{
        variables:'name'
      });
    console.log(data)
   // this.setState({people: data.results})
   // return data
    // const [GetNext,{loading,error,data}] = useQuery(GET_NEXT,{
    //   variables:'url'
    // });
    //console.log({url});
     
  
    //if (loading) return <h1 className="w3-animate-fading"><img src={loader} style={loaderLogo} alt="Star Wars Logo" /></h1>
    //if (error) return null;
  return(
      <div>
          {data.getPerson.map((person,i)=>{
              console.log(person);
          })}
      </div>
  )
    
  }
const Home = () => {
  const { operations, models } = usePersonFilters();
  const {loading , error, data} = useQuery(GET_PEOPLE);
  const {refetch} = useQuery(GET_PERSON,{variables:{personInput:{name : String}}}
      ,{onSuccess:(data) => {
        console.log(data)
        // items=response
      }}
      );

      const items = data;
      if (error) return <h1 className="w3-center w3-text-red ">Something went wrong!</h1>
      if (loading){
        return <div className="w3-center w3-text-cyan w3-black loaderContainer bg">
              <h1><span className='w3-animate-fading loaderText' >Entering the universe ...</span></h1>
              <img src={loader} className="loaderLogo w3-animate-fading" alt="Star Wars Logo" />
              {/* <img src={clip} autoPlay muted loop /> */}
              </div>
      }

 function usePersonFilters() {
        const [filters, _updateFilter] = useState({ 
            name: undefined
        });
      
        const updateFilter = (filterType, value,e) => {
            console.log(value)
    
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
    //console.log(peopleData);
    return (
      <>
      <div className="container">
      {peopleData.map((people,i) => (
      <People people={people} key={i} /> 
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
      console.log(data.getPeople);
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

  return(
    <div className="Home">
        {/* <Nav /> */}
        <nav className="nav">
        <ul>
        <li className="w3-bar-item items">
        <img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
        </li>
        <li className="w3-bar-item items">
        <input className="w3-hover-opacity searchBtn" placeholder="Search the universe" onChange={(e) => operations.updateFilter("name", e.target.value)}
          type="string" />
        </li >
        <li className="w3-bar-item items">
        <button className="w3-bar-item items w3-text-cyan w3-black w3-round w3-border-cyan" 
        onClick={() => refetch({personInput: { name: models.filters.name }})}>Search
      </button>
        </li >
        </ul>
        </nav>
        <Background />
        <Pagination itemsPerPage={12} />
    </div>
  )
    
}

export default Home;