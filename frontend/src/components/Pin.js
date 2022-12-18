import React , {useEffect, useState} from 'react'
import { Link , Navigate, useNavigate} from 'react-router-dom'
import { parse, v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { parseCookies } from 'nookies'

import {client , urlFor } from '../client'
import { saveQuery } from '../utils/data'

const Pin = ({pin:{postedBy , image, _id , destination}}) => {

  const [postHovered, setPostHovered] = useState(false)
  const [save, setSave] = useState(null)
  const navigate = useNavigate()

    const {email , id ,name ,picture } = parseCookies()
    const alreadySaved = !!(save?.filter(item => item.postedBy?._id === id))?.length 

    const savePin = (_id)=>{
      if(!alreadySaved){
        client.patch(_id).setIfMissing({save:[]})
        .insert('after' , 'save[-1]', [{
          _key:uuidv4(),
          userId:id,
          postedBy:{
            _type:'postedBy',
            _ref:id
          }
        }])
        .commit()
        .then(()=>{
          window.location.reload();
        })
      }
    }

    useEffect(() => {
      const query = saveQuery(_id)
      client.fetch(query).then((data)=>{
        setSave(data[0].save)
      })
    }, [])
    


    const deletePin = (_id)=>{
      client.delete(id).then(()=>{
        window.location.reload()
      })
    }

     return (
    <div className='m-2'>
      <div
      onMouseEnter={()=>setPostHovered(true)}
      onMouseLeave={()=>setPostHovered(false)}
      onClick={()=>navigate(`/post-detail/${_id}`)}
      className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out "
      >
      <img className='rounded-lg w-full' alt="user-post" src={urlFor(image).width(250).url()}/>
      {postHovered && (
        <div 
        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 z-50'
        style={{height:'100%'}}
        > 
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a 
            href={`${image?.asset?.url}?dl=`}
            download
            onClick={(e)=>e.stopPropagation()}
            className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-black text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
            >
              <MdDownloadForOffline/>
            </a>
          </div>
         
           {save?.length > 0 ? (
            <button disabled={save?.length >= 1} type='button' className={`bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none ${save?.length >= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
               {save?.length} Saved
            </button>
           ):(
              <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
              onClick={(e)=>{
                e.stopPropagation()
                savePin(_id)
              }}
              >
                Save
              </button>
           )}
        </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a 
                href={destination}
                target="_blank"
                rel='noreferrer'
                className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:shadow-md'
                >
                  <BsFillArrowUpRightCircleFill/>
                  {destination.length > 20 ? destination.slice(8,20) : destination.slice(8,28)}
                </a>
              )}
              {postedBy?._id === id && (
                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                onClick={(e)=>{
                  e.stopPropagation()
                  deletePin(_id)
                }}
                >
                  <AiTwotoneDelete/>
                </button>
              )}
            </div>

        </div>  
      )}
      </div>

      <Link to={`user-profile/${postedBy._id}`} className="flex gap-2 mt-2 items-center">
          <img
          className='w-8 h-8 rounded-full object-cover'
          src={postedBy.image}
          alt="user-profile"
          />
          <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>

    </div>
  )
}

export default Pin