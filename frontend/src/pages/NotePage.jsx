import React, { useState, useEffect } from 'react'
import arrowLeft from '../assets/left-arrow.png'
import { Link } from 'react-router-dom'

const NotePage = () => {

    let noteId = window.location.pathname.split('/').pop()
    let [note, setNote] = useState({ body: '' })

    useEffect(() => {
        getNote()
    }, [noteId])


    let getNote = async () => {
        if (noteId === 'new') {
            setNote({ body: '' })
            return
        }

        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        await fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }


    let updateNote = async () => {
        await fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }


    let deleteNote = async () => {
        await fetch(`/api/notes/${noteId}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
    }

    let handleSubmit = async () => {
        console.log('NOTE:', note)
        if (noteId !== 'new' && note.body == '') {
            await deleteNote()
        } else if (noteId !== 'new') {
            await updateNote()
        } else if (noteId === 'new' && note?.body) {
            await createNote()
        }
        window.location.href = '/'
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
        console.log('Handle Change:', note)
    }

    return (
        <div className="note" >
            <div className="note-header">
                <h3>
                    <img src={arrowLeft} alt="Back" onClick={handleSubmit} style={{cursor:'pointer', width:'24px'}} />
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage