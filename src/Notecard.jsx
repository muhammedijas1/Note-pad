function Notecard({
  note,
  onedit,
  ondelete,
}) {
  const noteColor =
    note.color === "blue"
      ? "bg-blue-100"
      : note.color === "purple"
      ? "bg-purple-100"
      : note.color === "yellow"
      ? "bg-yellow-100"
      : note.color === "green"
      ? "bg-green-100"
      : note.color === "pink"
      ? "bg-pink-100"
      : "bg-white";
  return (
    <div className={`min-w-0 rounded-lg p-4 shadow-sm ${noteColor}`}>


      <h3 className="mb-2 text-lg font-semibold text-gray-800">{note.title || "Untitled"}</h3>

      <p className="mb-4 break-words whitespace-pre-wrap text-gray-700">{note.content}
      </p>

      <div className="flex gap-2">

        <button onClick={() => onedit(note)}
          className="rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
          >
          Edit
        </button>

        <button onClick={() => ondelete(note.id)}
          className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
          >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Notecard;