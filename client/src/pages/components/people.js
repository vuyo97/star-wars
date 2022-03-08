import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Carousel, { CarouselItem } from "./carousel/carousel";
import '../../App.css';
import { HandleView } from '../Home';

const People = ({people:{name,height,mass,gender,homeworld,url},onClick}) => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'

  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(breakpoint);
    }

    function getImg({url}) {
      return url.split('/')[url.split('/').length - 2];
    }
  
  
  return(
    <>
      <div className="w3-col m12 l12 w3-hover-opacity">
        <Carousel >
        <CarouselItem style={{height:'100vh'}}>
        <Card >
        <Card.Body>
          <Card.Title><h1 className="card-titles"><a onClick={() => handleShow(true)} style={{cursor:'pointer'}}>{name}</a></h1></Card.Title>
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
          fullscreen={fullscreen}
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
                <div className="w3-col m12 w3-animate-opacity">
                <div className="w3-col m12">
                <img src={`${imgURL + getImg({url})}.jpg`} className="avi"/>
                </div>
                </div>
                <div className="w3-col m12 ">
                <p><strong>Height </strong> : {height}</p>
                <p><strong>Mass </strong> : {mass}</p>
                <p><strong>Gender </strong> : {gender}</p>
                </div>
              </Card.Text>
              <p><button className="w3-button w3-round w3-cyan w3-text-black " onClick={()=> onClick(true,{name})}>Profile</button></p>
            </Card.Body>
            </Card>
       
      </Modal.Body>
    </Modal>
    </div>
    </>  
  )
  }

  export default People;