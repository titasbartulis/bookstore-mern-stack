import "./Loader.css";
import React from 'react';
import LoaderImg from "../../images/loader.svg";

const Loader = () => {
  return (
    <div className='loader flex flex-ai-c flex-c'>
      <img src = {LoaderImg} alt = "loader" />
    </div>
  )
}

export default Loader