import React, {useEffect,useState} from 'react';
import ReactPaginate from 'react-paginate';
import People from './people';
import { useQuery } from "@apollo/react-hooks";
import loader from '../../assets/logo.png';
import gql from "graphql-tag"

function Items({ peopleData }){
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

  const GET_PEOPLE = gql`
    {
    getPeople{
        name,
        height,
        mass,
        gender,
        homeworld
        }
    }
    `

  
  const Pagination = ({ itemsPerPage }) => {
    const {loading , error, data } = useQuery(GET_PEOPLE);
    const [people, setPeople] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    
    const items = data;

    useEffect(() => {
      //console.log(data.getPeople);
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setPeople(items.getPeople.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.getPeople.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items.getPeople]);
  
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % items.getPeople.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };

    if (error) return <h1 className="w3-center w3-text-red ">Something went wrong!</h1>
    if (loading){
      return <div className="w3-center w3-text-cyan w3-black loaderContainer bg">
            <h1><span className='w3-animate-fading loaderText'>Entering the universe ...</span></h1>
            <img src={loader} className="loaderLogo w3-animate-fading" alt="Star Wars Logo"/>
            {/* <img src={clip} autoPlay muted loop /> */}
            </div>
    }
  
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

  export default Pagination;
