import React,{useState} from 'react';
import {useQuery } from "@apollo/react-hooks"
import {Img} from 'react-image'
import gql from "graphql-tag"
import Logo from '../../../assets/logo2.png';
import noIMG from '../../../assets/placeholder.jpg';
import './sub.css';
import '../../../App.css';

const GET_SHIPS =  gql`query ($shipUrls: [String]!){
    getStarships(urls : $shipUrls){
        name,
        url
      }
  }`

const Starships = ({shipUrls}) => {
const {loading, data , error} = useQuery(GET_SHIPS,{variables: {shipUrls}});
console.log(shipUrls)

const imgURL = 'https://starwars-visualguide.com/assets/img/starships/'
function getImg(url) {return url.split('/')[url.split('/').length - 2];}

if(loading) return <div style={{width:'100px',height:'100px'}}><img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
</div>
if (error){console.log('e : ' + error.message)}
console.log(data)

       return (
            <>
            <div className="w3-row w3-col m12 filmContainer">
            {data.getStarships.map((ship,s)=>{
                return(
                <div className="w3-col m2 w3-animate-opacity" key={s}> 
                    <Img src={[`${imgURL + getImg(ship.url)}.jpg`, `${noIMG}`]} className="filmImg" alt="starship_thumb" />
                    <p><span>{ship.name}</span></p>
                </div>)
            }) 
            }
            </div>
            </>
        );
    
}

export default Starships;