import Notecard from "./Notecard";

function Notelist({
  notes,
  onedit,
  ondelete,
}) {
  if (notes.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No notes found
      </p>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Notecard
          key={note.id}
          note={note}
          onedit={onedit}
          ondelete={ondelete}
        />
      ))}
    </div>
  );
}

export default Notelist;