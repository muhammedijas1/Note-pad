import { useEffect, useState } from "react";
import ColorPicker from "./Colorpicker";
import { Usenote } from "./context/notecontext";


function Noteform({editingnote,seteditingnote}) {
    const {notes,createnote,updatenote} = Usenote()
    
    const [title,settitle]=useState("")
    const [content,setcontent]=useState("")
    const [color,setcolor]=useState("white")
    const [error,seterror]=useState("")

      useEffect(() => {
    if (editingnote) {
      settitle(editingnote.title);
      setcontent(editingnote.content);
      setcolor(editingnote.color);
    } else {
      settitle("");
      setcontent("");
      setcolor("yellow");
    }

    seterror("");
  }, [editingnote]);

    const handlesubmit = async (e)=> {
      e.preventDefault()
    

    const trimmedtitle = title.trim()
    const trimmedcontent = content.trim()
    if(!trimmedcontent){
        seterror("content cannot be empty")
        return;
    }
    if(trimmedtitle.length > 100){
        seterror("Title cannot exceed 100 characters")
        return;
    }
    if(trimmedcontent.length > 5000){
        seterror("content cannot exceed 5000 characters")
        return;
    }


        const duplicate = notes.some(
      (note) =>
        note.id !== editingnote?.id &&
        note.title.toLowerCase() ===
        trimmedtitle.toLowerCase() &&
        note.content.toLowerCase() ===
        trimmedcontent.toLowerCase()
    );

    if (duplicate) {
      seterror("This note already exists");
      return;
    }


    try {
    if (editingnote) {
      await updatenote(editingnote.id, {
        title: trimmedtitle,
        content: trimmedcontent,
        color: color,
      });

    seteditingnote(null);
    } else {
      await createnote({
        title: trimmedtitle,
        content: trimmedcontent,
        color: color,
      });
    }
  

    settitle("");
    setcontent("");
    setcolor("yellow");
    seterror("");
    } catch (err) {
    seterror("Failed to save note. Please try again.");
    }
  }



    const cancelEdit = () => {
    seteditingnote(null);
    settitle("");
    setcontent("");
    setcolor("yellow");
    seterror("");
    };
    return(
        <form onSubmit={handlesubmit}
        className="rounded-lg bg-white p-5 shadow-sm"
        >
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
                {editingnote ? "edit note":"create note"}
            </h2>
        <div className="mb-4">
         <label className="mb-1 block text-sm font-medium text-gray-700">
          Title
        </label>

         <input
           value={title}
           onChange={(e) => settitle(e.target.value)}
           placeholder="Enter title"
           className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
         />
       </div>
       <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Content
        </label>

        <textarea
          value={content}
          onChange={(e) => setcontent(e.target.value)}
          placeholder="Enter content"
          className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        />
      </div>
            <ColorPicker
        color={color}
        setcolor={setcolor}
      />
      {error && (<p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}

      </p>
    )}

    <div className="mt-4 flex gap-2">

      <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        {editingnote ? "Update Note" : "Add Note"}
      </button>

      {editingnote && (
        <button
          type="button"
          onClick={cancelEdit}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
          Cancel
        </button>
      )}
    </div>
    </form>
  );
}

export default Noteform;



