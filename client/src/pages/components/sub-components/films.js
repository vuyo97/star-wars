import React,{useState} from 'react';
import { useQuery } from "@apollo/react-hooks"
import {Img} from 'react-image'
import gql from "graphql-tag"
import Logo from '../../../assets/logo2.png';
import noIMG from '../../../assets/placeholder.jpg';
import './sub.css';
import '../../../App.css';

const GET_FILMS =  gql`query ($filmUrls: [String]!){
    getFilms(urls : $filmUrls){
        title,
        url
      }
  }`

const Films = ({filmUrls}) => {
const {loading, data , error} = useQuery(GET_FILMS,{variables: {filmUrls}});
console.log(filmUrls)

const imgURL = 'https://starwars-visualguide.com/assets/img/films/'
function getImg(url) {return url.split('/')[url.split('/').length - 2];}

if(loading) return <div style={{width:'100px',height:'100px'}}><img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
</div>
if (error){console.log('e : ' + error.message)}
console.log(data)

       return (
            <>
            <div className="w3-row w3-col m12 filmContainer">
              {data.getFilms.map((film,f)=>{
                return (
                    <div className="w3-col m2 w3-animate-opacity" key={f}> 
                        <Img src={[`${imgURL + getImg(film.url)}.jpg`, `${noIMG}`]} className="filmImg" alt="film_thumbnail" />
                        <p><span>{film.title}</span></p>
                    </div>
                    ); 
                }) 
              }
            </div>
            </>

        );
    
}

export default Films;