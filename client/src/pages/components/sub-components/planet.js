import React,{useState} from 'react';
import { useQuery } from "@apollo/react-hooks"
import {Img} from 'react-image'
import gql from "graphql-tag"
import Logo from '../../../assets/logo2.png';
import noIMG from '../../../assets/placeholder.jpg';
import './sub.css';
import '../../../App.css';

const GET_PLANET =  gql`query ($planetUrl: String!){
    getPlanet(url : $planetUrl){
        name,
        rotation_period,
        orbital_period,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water,
        population,
        url
      }
  }`

const Planet = ({planetUrl}) => {
const {loading, data , error} = useQuery(GET_PLANET,{variables: {planetUrl}});
console.log(planetUrl)

const imgURL = 'https://starwars-visualguide.com/assets/img/planets/'
function getImg(url) {return url.split('/')[url.split('/').length - 2];}

if(loading) return <div style={{width:'100px',height:'100px'}}><img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
</div>
if (error){console.log('e : ' + error.message)}

       return (
            <>
            <div>
              {data.getPlanet.map((planet,p)=>{
                return (
                <div className="w3-row w3-col m12 w3-animate-opacity planetContainer" key={p}>
                    <div className="w3-col m3"> 
                        <Img src={[`${imgURL + getImg(planet.url)}.jpg`, `${noIMG}`]} className="planetImg" alt="planet_thumbnail" />
                    </div>
                    <div className="w3-col m8 planetDetails"> 
                        <span>Name : {planet.name}</span>
                        <span>Population  : {planet.population}</span>
                        <span>Rot. Period : {planet.rotation_period}</span>
                        <span>Orb. Period : {planet.orbital_period}</span>
                        <span>Diameter : {planet.diameter}</span>
                        <span>Climate : {planet.climate}</span>
                        <span>Terraine : {planet.terrain}</span>
                        <span>Surface water : {planet.surface_water}</span>
                    </div>
                </div>
                    ); 
                }) 
              }
            </div>
            </>

        );
    
}

export default Planet;