import React from 'react';
import Modal from 'react-modal';

import Logo from './assets/logo2.png';
import FadeIn from 'react-fade-in';
import Carousel, { CarouselItem } from "./carousel/carousel";


import clip from './assets/video.gif'; 
import Saber1 from './assets/darth.png'; 
import Saber2 from './assets/lsaber2.png'; 
import Saber3 from './assets/lsaber34.png'; 
import Saber4 from './assets/lsaber4.png'; 

import Card from 'react-bootstrap/Card'
import './App.css';
import { useQuery,useLazyQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"


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
  }
`
const header ={
  color:'cyan',
  fontWeight:'600'
}

const logo = {
  position: "absolute",
  height: '78%',
  width: '55%',
 left :'360px',
 top :'0'
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

const video = {
  objectFit: 'cover',
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: '0',
  left: '0',
}

const carousel = {
  position:'relative',
  display: 'grid',
  gridTemplate: 'repeat(3,1fr)',
  alignContent: 'space-evenly',
  justifyContent: 'center',
  alignItems: 'end',
}

const msideSaber = {
  left:'62px ',
  top:'0',
  position:'fixed',
  height:'100%',
  width :'85%',

 }
const lsideSaber = {
  left:'14px ',
  top:'0',
  position:'fixed',
  height:'100%',
  width :'28%',

 }

const rsideSaber = {
 right:'0',
 top:'0',
 position:'fixed',
 height:'100%',
 width :'28%',
 zIndex: '1'
}
const container = {
 right:'0',
 top:'0',
 display:'grid',
 gridTemplateColumns:'repeat(4,1fr)',
 position:'relative',
 zIndex: '1000', 
 justifyContent: 'center'
}

function SearchPerson({name}){
  
  // const { loading, error, data } = useLazyQuery(GET_PERSON, {
  //   variables: { name },
  //   skip: !name,
  //   pollInterval: 500,
  // });

  // if (error) return null;
  // if (error) return console.log('----' + error)
  
  return (
  <p>data</p>
  )

}

const People = ({people: {name,height,mass,gender,homeworld } }) => (
  <>
    <div>
      <Carousel >
      <CarouselItem style={{height:'100vh'}}>
      <Card >
      <Card.Body>
        <Card.Title><h1><a onClick={() => SearchPerson({name})}>{name}</a></h1></Card.Title>
        <Card.Text>
          <p color="blue"><strong>Height </strong> : {height}</p>
          <p color="blue"><strong>Mass </strong> : {mass}</p>
          <p color="blue"><strong>Gender </strong> : {gender}</p>
        </Card.Text>
        <Card.Link href={`${homeworld}`}>See HomeWorld</Card.Link>
      </Card.Body>
      </Card>
      </CarouselItem>
    </Carousel>
  </div>
  </>
)




function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const {loading , error, data } = useQuery(GET_PEOPLE)
  // const [SearchPerson] = useLazyQuery(GET_PERSON, {
  //   variables: { name },
  //   skip: !name,
  //   pollInterval: 500,
  // });

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
 
  return (
    <div className="App" style={{padding: '52px' ,background:'black'}}>
      <FadeIn >
        <img src={Logo} style={logo} alt="Star Wars Logo" />
        <img src={Saber4} style={lsideSaber} alt="lightsaber" />
        <img src={Saber1} style={msideSaber} alt="lightsaber" />
        <img src={Saber2} style={rsideSaber} alt="lightsaber" />
        <button onClick={openModal}>Open Modal</button>

        {/* <img src={clip} style={video} alt="Star background" /> */}
        <div style={container}> 
          {data.getPeople.map((people,i) =>(<People key={i.name} people={people} />
          ))}
        </div>
        <div>
    
 
  </div>
     </FadeIn>
    </div>
  )
}

export default App;
