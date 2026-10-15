import "./App.css";
import { useState } from "react";

import Noteform from "./Noteform";
import Searchbar from "./Searchbar";
import Notelist from "./Notelist";
import { Usenote } from "./context/notecontext";

function App() {
  const {
    notes,
    deletenote,
    searchnote,
    load,
    error,
  } = Usenote();

  const [editingnote, seteditingnote] = useState(null);
  const [search, setsearch] = useState("");

  const editnote = (note) => {
    seteditingnote(note);
  };

  const filterednotes = searchnote(search);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Note Pad
        </h1>

        <Noteform
          editingnote={editingnote}
          seteditingnote={seteditingnote}
        />

        <div className="my-6">
          <Searchbar
            search={search}
            setsearch={setsearch}
          />
        </div>

        {load && <p className="text-center">Loading notes...</p>}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!load && !error && (
          <Notelist
            notes={filterednotes}
            onedit={editnote}
            ondelete={deletenote}
          />
        )}
      </div>
    </div>
  );
}

export default App;

