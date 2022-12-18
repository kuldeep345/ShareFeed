import React , { useState , useEffect , useRef} from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link , Navigate, Route , Routes } from 'react-router-dom'

import { Sidebar , Login , UserProfile } from '../components'
import { client } from '../client'
import logo from '../assets/logo.png'
import Pins from './Pins'
import { userQuery } from '../utils/data'
import { parseCookies } from 'nookies'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user , setUser] = useState(null)
  const scrollRef = useRef(null)
  const {id , name , picture , email} = parseCookies()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async()=>{
      const query = userQuery(id)
     await client.fetch(query).then((data) => {
        setUser(data[0])
      })
    }
    fetchData()
  }, [id])

  useEffect(() => {
    scrollRef.current.scroll(0,0)
    if(!id || !name || !picture || !email ){
      navigate('/login')
    }
  }, [])
  

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen duration-75 ease-out'>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user}/>
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
        <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>setToggleSidebar(true)}/>
        <Link to="/">
          <img src={logo} alt="logo" className="w-28"/>
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-28"/>
        </Link>
        </div>
        <div className={`fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 ${toggleSidebar ? 'translate-x-0' : '-translate-x-[600px]'} transition duration-500 ease-in`} >
            <div className="absolute w-full flex justify-end items-center p-2">
                <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=>setToggleSidebar(false)}/>
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
        </div>
      </div>
          
        <div className="pb-2 flex-1 h-screen" ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile/>}/>
          <Route path='/*' element={<Pins user={user && user}/>}/>
        </Routes>
        </div>
    </div>
  )
}

export default Home