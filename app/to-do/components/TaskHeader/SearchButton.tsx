import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IoSearch } from 'react-icons/io5'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React from 'react'

function SearchButton() {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className='cursor-pointer'>
                <IoSearch className='text-[20px]'/>
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <Input id='search' placeholder='Buscar una tarea...' className='mt-2' />
        </PopoverContent>
    </Popover>
  )
}

export default SearchButton