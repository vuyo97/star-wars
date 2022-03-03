import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
//import Nav from './components/nav';
import Background from './components/background';
import People from './components/people';
//import Profile from './components/profile';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

import axios from 'axios'
import Logo from '../assets/logo2.png';
import loader from '../assets/logo.png';
import * as $ from 'jquery';import '../App.css';
import "./Search.css";


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

const GetPerson = (name) => {
    //const {loading , error, data} = useQuery(GET_PERSON);
    const {loading,error,data} = useQuery(GET_PERSON,{
        variables:'name'
      });
      // const {refetch} = useQuery(GET_PERSON,{variables:{personInput:{name : String}}}
  //     ,{onSuccess:(data) => {
  //       console.log(data.getPerson)
  //       // items=response
  //     }}
  //     );
    console.log(data)
   // this.setState({people: data.results})
    return data
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
  const [filteredData, setFilteredData] = useState([]);

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({});

  function closeModal() {
    setShow(false);
    setProfile({});
  }

      $(".searchBtn" ).blur(function() {
        $(".dataResult" ).hide( "slow");
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

        const clearInput = () => {
          setFilteredData([]);
         // setWordEntered("");
        };

        const updateFilter = (filterType, value) => {
            console.log(value)
            const newFilter = items.getPeople.filter((val) => {
             return val.name.toLowerCase().includes(value.toLowerCase());
            });
            console.log("Filter - " + JSON.stringify(newFilter));
            setFilteredData(newFilter);

          _updateFilter({
            [filterType]: value,
          });
        };
        return {
          models: { filters },
          operations: { updateFilter },
        };
  }

  // const ShowPerson = (View,{personData}) => {
  //   //  const [view,setView] = useState(false);
  //   //  function handleView(View) {
  //   //   setView(View);
  //   //  }
  //   //  handleView(View);
  //   // const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'
  //   // function getImg({url}) {
  //   //   return url.split('/')[url.split('/').length - 2];
  //   // }
  //   // //handleView(true);

  //   // const person = [val];
  //   return(
  //   <div  class="w3-modal">
  //   <div class="w3-modal-content">
  //     <div class="w3-container">
  //     <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-display-topright">&times;</span>
  //     <p>Some text in the Modal..</p>
  //     <p>Some text in the Modal..</p>
  //   </div>
  //   </div>
  //   </div>
  //   )
  // }

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

  const HandleView = async (breakpoint,value) => {
    const {data} = await axios.get(`https://swapi.dev/api/people/?search=${value.name}`);
    console.log(data.results);
  
    setProfile(data.results[0]);
    // console.log(breakpoint)
    // console.log(count)
    // console.log(value)
    // console.log(setProfile)
    setShow(breakpoint);
    setFullscreen(breakpoint); 
    
    // return (
    //   <>   
    //   {selectedPerson.map((person,p) => ( 
    //      <Profile personData = {person}  key={p}/>
    //   ))} 
    //   </>
    // )
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
  
  const Profile = ({personData:{name,height,mass,gender,homeworld,url,hair_color,eye_color,skin_color,birth_year}}) => {
    //const [show, setShow] = useState(false);
    const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'
    function getImg({url}) {
      return url.split('/')[url.split('/').length - 2];
    }
    
     console.log(fullscreen);
      return(
      <>
      <Modal  
      className='w3-modal w3-animate-opacity w3-profmodal'
      show={show} 
      style={{zIndex:'999'}}
      fullscreen={fullscreen}
      onHide={() => setShow(false)}
    >
    <Modal.Body id='profilemodal' className='w3-modal-content'>
    <Modal.Header>
      <h2 className='w3-modal-title w3-center'>{name}</h2>
      <span onClick={() => closeModal(false)} className="w3-button w3-display-topright">X</span>
    </Modal.Header>
        <Card >
        <Card.Body className='w3-container w3-row' >
            <div className="w3-col m4 w3-animate-opacity">
            <div className="w3-col m12 w3-center">
            <img src={`${imgURL + getImg({url})}.jpg`} className="profavi"/>
            </div>
            </div>
            <div className="w3-col m8">
              <h3>Details</h3>
              <div className="w3-col m12">
                <table className="w3-table-all w3-hoverable ">
                  <tr className="w3-cyan w3-text-black">
                    <th><strong>Birth Year </strong></th>
                    <th><strong>Hair Color </strong></th>
                    <th><strong>Eye Color </strong></th>
                    <th><strong>Skin Color </strong></th>
                    <th><strong>Height </strong></th>
                    <th><strong>Mass </strong></th>
                    <th><strong>Gender </strong></th>
                    <th><strong>Homeworld </strong></th>
                    <th></th>
                  </tr>
                  <tr className="w3-black w3-text-cyan">
                    <td>{birth_year}</td>
                    <td>{hair_color}</td>
                    <td>{eye_color}</td>
                    <td>{skin_color}</td>
                    <td>{height}</td>
                    <td>{mass}</td>
                    <td>{gender}</td>
                    <td><a href={`${homeworld}`}>See HomeWorld</a></td>
                    </tr>
                </table> 
              </div>
              <div className="w3-col w3-container m12 w3-row">
                <div className="w3-col m6" style={{border:'1px solid cyan',borderRadius:'10px'}}>
                <h3>Planets</h3>
    
                </div>
                <div className="w3-col m6" style={{border:'1px solid cyan',borderRadius:'10px'}}>
                <h3>Films</h3>

                </div>
              </div>
            </div>
       
        </Card.Body>
        </Card>
      </Modal.Body>
      </Modal>
         
         </>
         )
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
        (<Profile personData={profile} />)
        }
        </>
        </nav>
        <Background />
        <Pagination itemsPerPage={12} />
    </div>
  )
    
}

export default Home;