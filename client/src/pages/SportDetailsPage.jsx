import React from 'react'
import { useParams } from 'react-router-dom'
import SportDetails from '../components/AllSports/SportDetails/SportDetails';
export default function SportDetailsPage() {
  const {  sportId } = useParams();
  return (
    <div className='Page'>
        <SportDetails sportId={sportId}/>
    </div>
  )
}
