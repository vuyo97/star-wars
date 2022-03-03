import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import '../../App.css';


const Profile = ({personData:{name,height,mass,gender,homeworld,url}}) => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'
    console.log("profile");

  
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
            <Card.Body className='w3-container w3-row'>
              <Card.Text>
                <div className="w3-col m4 w3-animate-opacity">
                <div className="w3-col m12">
                <img src={`${imgURL + getImg({url})}.jpg`} className="avi"/>
                </div>
                </div>
                <div className="w3-col m8">
                <p color="blue"><strong>Height </strong> : {height}</p>
                <p color="blue"><strong>Mass </strong> : {mass}</p>
                <p color="blue"><strong>Gender </strong> : {gender}</p>
                </div>
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

export default Profile;