import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import Planet from './sub-components/planet';
import Films from './sub-components/films';
import Starships from './sub-components/starships';
import '../../App.css';


const Profile = ({personData:{name,height,mass,gender,homeworld,url,hair_color,eye_color,skin_color,birth_year,films,starships}
  ,handelModal}) => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(true);

  const imgURL = 'https://starwars-visualguide.com/assets/img/characters/'
  function getImg({url}) {return url.split('/')[url.split('/').length - 2];}
  
   console.log({handelModal});
    return(
    <>
    <Modal  
    className='w3-modal w3-animate-opacity w3-profmodal'
    style={{zIndex:'999'}}
    show={show}
    fullscreen={fullscreen}
    onHide={() => setShow(false)}
  >
  <Modal.Body id='profilemodal' className='w3-modal-content'>
  <Modal.Header>
    
    <span onClick={handelModal} className="w3-button w3-display-topright">X</span>
  </Modal.Header>
      <Card >
      <Card.Body className='w3-container w3-row' >
          <div className="w3-col m4 w3-animate-opacity aviContainer">
          <div className="w3-col m12 w3-center">
          <img src={`${imgURL + getImg({url})}.jpg`} className="profavi"/>
          </div>
          </div>
          <div className="w3-col m8">
          <div className='w3-center w3-blue w3-text-black w3-col m12 profName'><h2>{name}</h2></div>
            <div className="w3-col m12">
              <table className="w3-table-all w3-hoverable ">
                <tbody>
                <tr className="w3-cyan w3-text-black">
                  <th><strong>Birth Year </strong></th>
                  <th><strong>Hair Color </strong></th>
                  <th><strong>Eye Color </strong></th>
                  <th><strong>Skin Color </strong></th>
                  <th><strong>Height </strong></th>
                  <th><strong>Mass </strong></th>
                  <th><strong>Gender </strong></th>
                </tr>
                <tr className="w3-black w3-text-cyan">
                  <td>{birth_year}</td>
                  <td>{hair_color}</td>
                  <td>{eye_color}</td>
                  <td>{skin_color}</td>
                  <td>{height}</td>
                  <td>{mass}</td>
                  <td>{gender}</td>
                  </tr>
                </tbody>
              </table> 
            </div>
            <div className="w3-col m12 detailBox">
              <div className="w3-col m6" style={{border:'1px solid cyan'}}>
              <div class="w3-card">
                <header class="w3-container w3-cyan">
                  <h3>Planets</h3>
                </header>
                <div class="w3-container">
                 {homeworld &&
                   (<Planet planetUrl={homeworld} />)
                  }
                </div>
              </div>
              </div>
              <div className="w3-col m6" style={{border:'1px solid cyan'}}>
              <div class="w3-card">
                <header class="w3-container w3-cyan">
                  <h3>Films</h3>
                </header>

                <div class="w3-container">
                  {films && (<Films filmUrls={films} /> )}               
                </div>

              </div>

              </div>
            </div>
            <div className="w3-col m12 ">
            <div className="w3-col m12" style={{border:'1px solid cyan'}}>
              <div class="w3-card">
                <header class="w3-container w3-cyan">
                  <h3>Starships</h3>
                </header>
                <div class="w3-container">
                  {starships.length != 0 ? (<Starships shipUrls={starships} />):(
                  <div className="w3-col m12 w3-center w3-animate-opacity w3-text-cyan">
                    <h4>No related Starships</h4>
                  </div>
                  )}       
                </div>
                </div>
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
export default Profile;