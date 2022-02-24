import React,{useState} from 'react';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Carousel, { CarouselItem } from "./carousel/carousel";
import '../../App.css';


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

  export default People;