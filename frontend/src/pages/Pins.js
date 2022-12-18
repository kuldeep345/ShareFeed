import React , { useState , useEffect} from 'react'
import { Routes , Route } from 'react-router-dom'
import {Navbar , Feed , PinDetails , CreatePin , Search} from '../components'

const Pins = ({user}) => {

  const [searchItem , setSearchItem] = useState('')

  return (
    <div className='px-2 md:px-5'>
      <div className="bg-gray-50">
        <Navbar searchItem={searchItem} setSearchItem={setSearchItem} user={user}/>
      </div>
      <div className="h-full">
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/category/:categoryId' element={<Feed/>}/>
          <Route path='/post-detail/:pinId' element={<PinDetails user={user}/>}/>
          <Route path='/create-post' element={<CreatePin user={user}/>}/>
          <Route path='/search' element={<Search searchItem={searchItem} setSearchItem={setSearchItem}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Pins