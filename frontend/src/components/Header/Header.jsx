import "./Header.css";
import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-ai-c flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>find your book of choice</h2><br />
                <p className='header-text fs-18 fw-3'>Have you found a book in our online store that has caught your eye and you wish to explore it in more depth? That's easy! Simply type in the name of the book, and we will provide you with all the information we have about it.</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header