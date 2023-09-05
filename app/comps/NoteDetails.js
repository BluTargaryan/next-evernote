import { app, db } from '../../app/config/firebaseConfig'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { doc, collection,getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

const dbInstance = collection(db, 'notes');

export default function NoteDetails({ID}) {
    //states to edit notes
    const [noteTitle, setNoteTitle] = useState('');
const [noteDesc, setNoteDesc] = useState('');
    //state handling edit perms
    const [isEdit, setIsEdit] = useState(false);
    //state to get note
    const [singleNote, setSingleNote] = useState({})
    //get notes
    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setSingleNote(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })[0]);
            })
    }

    useEffect(() => {
        getNotes();
    }, [])
    useEffect(() => {
        getSingleNote();
      }, [ID])

//func to delete notes
const deleteNote = (id) => {
    const collectionById = doc(db, 'notes', id)

    deleteDoc(collectionById)
        .then(() => {
            window.location.reload()
        })
}

      //func to update docs
      const editNote = (id) => {
        const collectionById = doc(db, 'notes', id)

        updateDoc(collectionById, {
            noteTitle: noteTitle,
            noteDesc: noteDesc,
        })
        .then(() => {
            window.location.reload()
        })
    }

//func to give edit perms
const getEditData = () => {
    setIsEdit(true);
    setNoteTitle(singleNote.noteTitle);
        setNoteDesc(singleNote.noteDesc)
  }

    //func to get single note
    const getSingleNote =async () => {
        if (ID) {
            const singleNote = doc(db, 'notes', ID)
            const data = await getDoc(singleNote)
            setSingleNote({ ...data.data(), id: data.id })
        }
    }
    return (
        <>
        <div>
   <button
   className='w-20 h-8 bg-red-900 text-gray-300 cursor-pointer m-2'
   onClick={getEditData}
   >Edit</button>
    <button
       className='w-20 h-8 bg-red-900 text-gray-300 cursor-pointer m-2'
       onClick={() => deleteNote(singleNote.id)}
    >Delete</button>
 </div>
            <h2>{singleNote.noteTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}></div>
            {isEdit ? (
                <div>
                <div className='w-60 h-8 outline-none rounded 
                border-gray-700 m-1 border-solid border-2'>
                <input className='focus:outline-none'
                type="text" 
                placeholder='Enter the Title'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}/>
            </div>

<div className='w-60 '>
<ReactQuill 
onChange={setNoteDesc}
value={noteDesc}/>
</div>
<button
   className='w-30 h-10 bg-red-900 text-gray-300 cursor-pointer m-2'
   onClick={() => editNote(singleNote.id)}>
    Update Note
   </button>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}