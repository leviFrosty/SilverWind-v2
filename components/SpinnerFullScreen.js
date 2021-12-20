import React from 'react'
import Spinner from './Spinner';

export default function SpinnerFullScreen() {
  return (
    <div className='w-full h-[80vh] flex items-center justify-center'>
      <Spinner />
    </div>
  )
}
