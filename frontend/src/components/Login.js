import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
import {client} from '../client'
import Cookie from 'js-cookie'

const Login = () => {
    const navigate = useNavigate()
  const handleLogin = async(credentials)=>{
    const {picture , name , email ,sub} = jwtDecode(credentials.credential)

    const doc = {
      _id:sub,
      _type:'user',
      userName:name,
      email,
      image:picture
    }

    await client.createIfNotExists(doc).then(()=>{
      navigate('/')
      Cookie.set('id',sub)
      Cookie.set('name',name)
      Cookie.set('email',email)
      Cookie.set('picture',picture)
    })

  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover brightness-[0.3]'
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(credentials)=>handleLogin(credentials)}
              onError={() => {
                console.log('Login Failed');
              }}
            />;
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login