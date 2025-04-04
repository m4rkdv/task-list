import React from 'react'
import { ModeToggle } from '../ModeToggle';
import SearchButton from './SearchButton';
import Link from 'next/link';


function TaskHeader() {
  return (
    <div className='flex justify-between items-center mb-6'>
        <AppTitle/>
        <div className='flex items-center gap-1'>
            <SearchButton/>
            <ModeToggle/>
        </div>
    </div>
  )
}

function AppTitle(){
  return (
    <div className='font-bold text-3xl flex gap-1 justify-center items-center'>
          <Link href="/">Task List</Link>
    </div>
    );
}

export default TaskHeader