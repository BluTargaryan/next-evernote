'use client'
import NoteOperations from "./comps/NoteOperations"
import NoteDetails from './comps/NoteDetails'
import {useState} from 'react'



export default function Home() {
  //state to handle note id
  const [ID, setID] = useState(null);

  //func to get single note
const getSingleNote = (id) => {
  
  setID(id)
}


  return (
    <main>
      <div className='flex m-2'>
        <div className='w-80'>
          <NoteOperations
          getSingleNote={getSingleNote}/>
        </div>
        <div>
        <NoteDetails 
        ID={ID}/>
        </div>
      </div>
    </main>
  )
}
