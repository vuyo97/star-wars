import React,{useState} from 'react';
import Logo from '../../assets/logo2.png';

import * as $ from 'jquery';

const Nav = ({items,handelProfile}) => {
  const { operations, models } = usePersonFilters();
  const [filteredData, setFilteredData] = useState([]);
  const [enteredWord, setEnteredWord] = useState([]);
  
  function usePersonFilters() {
    const [filters, _updateFilter] = useState({ 
        name: undefined
    });

    const updateFilter = (filterType, value) => {
        console.log(value)
        const newFilter = items.getPeople.filter((val) => {
         return val.name.toLowerCase().includes(value.toLowerCase());
        });
        console.log("Filter - " + JSON.stringify(newFilter));
        setFilteredData(newFilter);
        setEnteredWord(value);

      _updateFilter({
        [filterType]: value,
      });
    };
    return {
      models: { filters },
      operations: { updateFilter },
    };
    }
    $(".searchBtn" ).blur(function() {
      $(".dataResult" ).hide( "slow");
      setEnteredWord("");
    })
    $(".searchBtn" ).focus(function() {
      $(".dataResult" ).show( "slow");
    })


  return(
    <nav className="nav">
    <>
    <ul>
    <li className="w3-bar-item items">
    <img src={Logo} className="w3-hover-opacity App-logo" style={{height:'55px',width:'50px'}} alt="Star Wars Logo" />
    </li>
    <li className="w3-bar-item items searchDiv">
    <input  type="search" className="w3-hover-opacity searchBtn" placeholder="Search the universe"  
    onChange={(e) => operations.updateFilter("name", e.target.value)} value={enteredWord}/>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((prsn,k) => {
            return (
            <div>
            <a className="dataItem" key={k} onClick={() => handelProfile(true,{...prsn})}>
              <p>{prsn.name}</p>
            </a>
            </div>);
            }) 
          }
      </div>)
      }
    </li >
    </ul>
    </>
    </nav>
  )

}

export default Nav;