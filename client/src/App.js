import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';

import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import axios from 'axios';
import './App.css';

import Logo from './assets/logo2.png';
import loader from './assets/logo.png';
import FadeIn from 'react-fade-in';
import Carousel, { CarouselItem } from "./carousel/carousel";

// import clip from './assets/video.gif'; 
import Saber1 from './assets/darth.png'; 
import Saber2 from './assets/lsaber2.png'; 
import Saber3 from './assets/lsaber4.png'; 


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
const GET_PERSON =  gql`
  {
    getPerson(name : String){
      name,
      height,
      mass,
      gender,
      homeworld
    }
  }`

const GET_NEXT =  gql`
  {
    getPerson(url : String){
      name,
      height,
      mass,
      gender,
      homeworld
    }
  }
`
const header ={
  color:'cyan',
  fontWeight:'600',
  cursor:'pointer'
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export const GetNext = async ({url}) => {
  const { data } = await axios.get(`${url}`);
  console.log(data)
  this.setState({people: data.results})
  return data
  // const [GetNext,{loading,error,data}] = useQuery(GET_NEXT,{
  //   variables:'url'
  // });
  //console.log({url});
   

  //if (loading) return <h1 className="w3-animate-fading"><img src={loader} style={loaderLogo} alt="Star Wars Logo" /></h1>
  //if (error) return null;

  
}

const SearchPerson = ({name,height,mass,gender,homeworld}) => {
  const [show, setShow] = useState(false);
  function ShowModal(){
    setShow(true);
  }
  let data = {name,height,mass,gender,homeworld}
  console.log(data);
  
  return (
  <>
  <Modal style={{zIndex:'999'}} show={ShowModal} onHide={() => setShow(false)} dialogClassName="modal-90w"
  style={customStyles}
  contentLabel="Example Modal"
  >
  <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
        {name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
   
          <Card >
          <Card.Body>
            <Card.Text>
              <p color="blue"><strong>Height </strong> : {height}</p>
              <p color="blue"><strong>Mass </strong> : {mass}</p>
              <p color="blue"><strong>Gender </strong> : {gender}</p>
 
            </Card.Text>
            <Card.Link href={`${homeworld}`}>See HomeWorld</Card.Link>
          </Card.Body>
          </Card>
     
    </Modal.Body>
  </Modal>
  </>
 )
}

const People = ({people:{name,height,mass,gender,homeworld}}) => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(breakpoint);
  }

return(
  <>
    <div className="w3-col m12 l12 w3-hover-opacity">
      <Carousel >
      <CarouselItem style={{height:'100vh'}}>
      <Card >
      <Card.Body>
        <Card.Title><h1><a onClick={() => handleShow(true)} style={{cursor:'pointer'}}>{name}</a></h1></Card.Title>
        <Card.Text>
          <p><strong>Gender </strong> : {gender}</p>
          <p ><strong>Height </strong> : {height}</p>
         
          {/* <p color="blue"><strong>Homeworld </strong> : {homeworld.name}</p> */}
        </Card.Text>
        <Card.Link onClick={() => handleShow(true)} style={{cursor:'pointer'}}>View Details</Card.Link>
      </Card.Body>
      </Card>
      </CarouselItem>
    </Carousel>
      <Modal  
        className='w3-modal w3-animate-opacity'
        show={show} 
        style={{zIndex:'999'}}
        onHide={() => setShow(false)} 
      >
      <Modal.Body id='modal' className='w3-modal-content'>
      <Modal.Header>
        <h2 className='w3-modal-title w3-center'>{name}</h2>
        <span onClick={() => handleShow(false)} className="w3-button w3-display-topright">X</span>
      </Modal.Header>
          <Card >
          <Card.Body className='w3-container w3-center'>
            <Card.Text>
              <p color="blue"><strong>Height </strong> : {height}</p>
              <p color="blue"><strong>Mass </strong> : {mass}</p>
              <p color="blue"><strong>Gender </strong> : {gender}</p>
 
            </Card.Text>
            <Card.Link href={`${homeworld}`}>See HomeWorld</Card.Link>
          </Card.Body>
          </Card>
     
    </Modal.Body>
  </Modal>
  </div>
  </>  
)
}



function App() {
  const {loading , error, data } = useQuery(GET_PEOPLE);
  const items = data;
  

  function Items({ peopleData }) {
    //console.log(peopleData);
    return (
      <>
      <div class="container">
      {peopleData.map((people,i) => (
      <People people={people} key={i} /> 
      ))}
      </div>
      </>
    );
  }
 
  
  if (error) return <h1 className="w3-center w3-text-red ">Something went wrong!</h1>
  if (loading){
    return <div className="w3-center w3-text-cyan w3-black loaderContainer bg">
          <h1><span className='w3-animate-fading' className="loaderText">Entering the universe ...</span></h1>
          <img src={loader} className="loaderLogo"alt="Star Wars Logo" className='w3-animate-fading' />
          {/* <img src={clip} autoPlay muted loop /> */}
          </div>
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
 
  return (
    <div className="App w3-container" id="App">
      <FadeIn >
        <nav className="nav">
          <ul>
          <li className="w3-bar-item items">
            <img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
          </li>
          <li className="w3-bar-item items">
            <input type="search" className="w3-hover-opacity searchBtn" placeholder="Search the universe" />
          </li >
          {/* <li className="w3-bar-item">
            <button onClick={openModal} className="w3-black w3-border-cyan w3-text-cyan w3-round w3-hover-opacity">Open Modal</button>
          </li> */}
          </ul>
        </nav>

        <img src={Logo} className='banner' alt="Star Wars Logo" />
        <img src={Saber3} className='lsideSaber' alt="lightsaber" />
        <img src={Saber1} className='mSaber' alt="lightsaber" />
        <img src={Saber2} className='rsideSaber' alt="lightsaber" />

      <Pagination itemsPerPage={12} />

     </FadeIn>
    </div>
  )
}

export default App;
