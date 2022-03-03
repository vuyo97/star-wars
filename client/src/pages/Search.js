import React, { Component } from 'react';

const Search = () => {
    
        return (
            <div>
            <input type="search" className="w3-hover-opacity searchBtn" placeholder="Search the universe" onChange={(e) => operations.updateFilter("name", e.target.value)}
             type="string"/>
            </div>
        );
    
}

export default Search;