'use client'
import {Roboto } from 'next/font/google'
import {useState, useEffect} from 'react'
import {app, db} from '../config/firebaseConfig'
import { collection, addDoc ,getDocs} from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const dbInstance = collection(db, 'notes');
const roboto = Roboto({ weight:['400'], subsets:['latin']})


export default function NoteOperations({getSingleNote}) {
    //state to det input visibility
    const [isInputVisible, setInputVisible] = useState(false);
//state fr noteTitle
    const [noteTitle, setNoteTitle] = useState('');
    //for reactquill value
    const [noteDesc, setNoteDesc] = useState('')
    //state to store notes
    const [notesArray, setNotesArray]= useState([]);

//get notes after loading page
    useEffect(() => {
        getNotes();
    }, [])
//

//function to, well, getNotes
const getNotes = () => {
    getDocs(dbInstance)
        .then((data) => {
            setNotesArray(data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }));
        })
}
    //function to display title input
const inputToggle = () => {
    setInputVisible(!isInputVisible)
}
//func to save note value
const addDesc = (value) => {
    setNoteDesc(value)
  }

//function to save note to firebase
const saveNote = () => {
    addDoc(dbInstance, {
        noteTitle: noteTitle,
        noteDesc: noteDesc
    })
    .then(() => {
        setNoteTitle('')
        setNoteDesc('')
        getNotes()
    })
}
    return (
        <>
        <div>
            <button 
            onClick={inputToggle}
            className={`w-60 h-8 cursor-pointer bg-black 
            text-gray-200 border-black ${roboto}`}>
                Add a New Note
                </button>
            </div>
           {
            isInputVisible ?(
                <>
                <div className='w-60 h-8 outline-none rounded 
                border-gray-700 m-1 border-solid border-2'>
                <input className='focus:outline-none'
                type="text" 
                placeholder='Enter the Title'
                onChange={(e) => setNoteTitle(e.target.value)}
                value={noteTitle}/>
              
            </div>

<div className='w-60 '>
<ReactQuill 
onChange={addDesc}
value={noteDesc}/>
</div>
</>
            ):(<></>)
           }

           <button
           onClick={saveNote}
           className={`w-60 h-8 cursor-pointer bg-red-950
 text-gray-200 ${roboto}`}>
           Save Note
           </button>

           <div>
                {notesArray.map((note) => {
                    return (
                        <div 
                        className={`m-2 border-solid rounded-lg
                        w-60 text-center cursor-pointer ${roboto}
                        hover:bg-red-800 hover:text-gray-300`}
                        onClick={() => getSingleNote(note.id)}
                        key={note.id}>
                            <h3>{note.noteTitle}</h3>
                        </div>
                    )
                })}
            </div>
        </>
    )
}