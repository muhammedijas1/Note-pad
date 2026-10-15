// import { Usenote } from "./context/notecontext";
// const {searcnote} = Usenote()

function Searchbar({search,setsearch}){
    return(
        <div>
            <input
            value={search}
            onChange={(e)=> setsearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
            />
        </div>
    )
}
export default Searchbar;