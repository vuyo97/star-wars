import React from 'react';
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
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const GET_PEOPLE = gql`
  {
    people {
      name,
      height ,
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
 position: 'relative',
 height:'180px',
 width :'180px',
 margin:'-40px auto',
 zIndex: '9999'
}

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

const lsideSaber = {
  left:'-222px ',
  top:'0',
  position:'fixed',
  height:'100%',
  width :'85%',
  zIndex: '1'

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
 gridTemplate:'repeat(3,1fr)/repeat(3,1fr)',
 gridRowGap:'10px',
 position:'relative',
 zIndex: '1000', 
 justifyContent: 'center'
}



const People = ({ people: {name,height,mass,gender,homeworld } }) => (
  <div>
    <Carousel >
    <CarouselItem style={{height:'auto'}}>
    <Card >
    <Card.Body>
      <Card.Title><h1>{name}</h1></Card.Title>
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
)

function App() {
  const { loading, error, data } = useQuery(GET_PEOPLE)

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <div className="App" style={{padding: '52px'}}>
      <FadeIn >
     <img src={Logo} style={logo} alt="Star Wars Logo" />
     <img src={Saber1} style={lsideSaber} alt="lightsaber" />
      <img src={Saber2} style={rsideSaber} alt="lightsaber" />
     <img src={clip} style={video} alt="Star background" />
      <div style={container}> {data.people.map((people,i) =>(<People key={i} people={people}/>
      ))}
      </div>
    

     </FadeIn>
    
     
    </div>
  )
}

export default App;
