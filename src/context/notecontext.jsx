import axios from "axios";
import { useState,useContext ,createContext, useEffect } from "react";
const notecontext = createContext()

const Api_Url = "http://localhost:3001/notes"

export function Noteprovider({children}){
    const [notes,setnote]=useState([])
    const [load,setload]=useState(false)
    const [error,seterror]=useState(null)


    const fetchnote = async()=>{
        setload(true)
        seterror(null)


        try{
            const response = await axios.get(Api_Url);
            setnote(response.data)
        }
        catch(error){
            seterror("failed to fetch")
        }
        finally{
            setload(false)
        }
    }

    useEffect(()=>{
        fetchnote()
    },[])


    const createnote = async (note) =>{
        seterror(null)

        const newnote = {
            title : note.title,
            content : note.content,
            color : note.color || "yellow",
        }

        try{
            const response = await axios.post (Api_Url,newnote);
            setnote((prev)=> ([...prev,response.data]))
        }
        catch(error){
            seterror("failed to add note")
            console.log(error);
        }
    }



    const updatenote = async (id,update) => {
        seterror(null)

        try{
            const response = await axios.patch(`${Api_Url}/${id}`, {
            ...update
        })

        setnote((prev)=>
            prev.map((note)=>
                String(note.id)===String(id) ? response.data : note
            )
        )
        return response.data
        }
        catch(error){
            seterror("failed to error")
            console.log(error)
        }

        
    }


    const deletenote = async (id)=>{
        seterror(null)

        try{
            const response = await axios.delete(`${Api_Url}/${id}`)

            setnote((prev)=>
                prev.filter((note)=> String(note.id)!==String(id))
            )
        }
        catch(error){
            seterror("failed to delete")
            console.log(error)
        }
    }


    const searchnote= (text) =>{
        const value = text.trim().toLowerCase()

        if(!value) return notes;

        return notes.filter((note)=>{
            return(
            (note.title || "").toLowerCase().includes(value)||
            (note.content || "").toLowerCase().includes(value))
        })
    }

    return(
        <notecontext.Provider value={{notes,load,error,fetchnote,createnote,updatenote,deletenote,searchnote}}>
            {children}
        </notecontext.Provider>
    )
}

export function Usenote(){
    const context = useContext(notecontext)

    if(!context) {
        throw new Error("useNotes must be used inside NotesProvider");
    }
    return context
}
