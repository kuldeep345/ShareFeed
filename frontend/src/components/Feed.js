import React , { useContext, useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client' 
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { searchQuery ,feedQuery } from '../utils/data'
import { UserContext } from '../context/PinContext'

const Feed = () => {
  const { fetch , setFetch } = useContext(UserContext)
  const [ loading , setLoading] = useState(false)
  const [ pins , setPins] = useState(null)

  const { categoryId } = useParams()

  useEffect(() => {
    setTimeout(() => {
      setFetch(!fetch)
    }, 2000);
  }, [])
  

  useEffect(() => {
   setLoading(true)
   if(categoryId){
    const query = searchQuery(categoryId)
    client.fetch(query).then((data)=>{
      setPins(data)
      setLoading(false)
    })
   }
   else{
    client.fetch(feedQuery).then((data)=>{
      setPins(data)
      setLoading(false)
    })
   }

  }, [categoryId , fetch])
  

  if(loading) return <Spinner message="We are adding new ideas to your feed"/>

  if(!pins?.length) return <h2>No Posts available</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed