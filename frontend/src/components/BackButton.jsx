import React from 'react'
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/home' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-16 py-4 rounded-lg w-fit flex'
      >
        <BsArrowLeft className='fs-24 lh-32' />
      </Link>
    </div>
  )
}

export default BackButton