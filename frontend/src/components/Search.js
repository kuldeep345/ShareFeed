import React , { useState , useEffect } from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery , searchQuery } from '../utils/data'
import Spinner from './Spinner'

const Search = ({ searchItem }) => {
  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(searchItem){
      setLoading(true)
      const query = searchQuery(searchItem.toLowerCase())

      client.fetch(query)
      .then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
    else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data);
        setLoading(false)
      })
    }
  }, [searchItem])
  

  return (
    <div>
      {loading && <Spinner message="Searching for posts"/>}
      {pins?.length !== 0 && <MasonryLayout pins={pins}/>}
      {pins?.length === 0 && searchItem !== '' && !loading && (
        <div className="mt-10 text-center text-xl">No Posts Found!</div>
      )}
    </div>
  )
}

export default Search