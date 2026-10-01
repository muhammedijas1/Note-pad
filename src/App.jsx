
import './App.css'
import { useEffect, useState } from "react";

import Noteform from "./Noteform";
import Searchbar from "./Searchbar";
import Notelist from "./Notelist";

function App() {
  const [notes, setnotes] = useState(() => {
    const savednotes = localStorage.getItem("notes");

    return savednotes
      ? JSON.parse(savednotes)
      : [];
  });

  const [editingnote, seteditingnote] = useState(null);

  const [search, setsearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    );
  }, [notes]);


  const deletenote = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    setnotes(
      notes.filter((note) => note.id !== id)
    );
  };

  const editnote = (note) => {
    seteditingnote(note);
  };


  const filterednotes = notes.filter((note) => {
    const text = search.toLowerCase();

    return (
      note.title.toLowerCase().includes(text) ||
      note.content.toLowerCase().includes(text)
    );
  });

  return (
  <div className="min-h-screen bg-gray-100 px-4 py-8"> 
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Note Pad</h1>

      <Noteform
        notes={notes}
        setnotes={setnotes}
        editingnote={editingnote}
        seteditingnote={seteditingnote}
      />

      

      <div className="my-6">
          <Searchbar
            search={search}
            setsearch={setsearch}
          />
      </div>

      

      <Notelist
        notes={filterednotes}
        onedit={editnote}
        ondelete={deletenote}
      />
    </div>
  </div>
  );
}

export default App;
