const colors = [
    "white",
    "blue",
    "purple",
    "yellow",
    "green",
    "pink",
];
function ColorPicker({color,setcolor}){
    return(
        <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">color:</p>
            <div className="flex gap-2">
            {colors.map((item)=>(
                <button
                type="button"
                key={item}
                onClick={()=> setcolor(item)}
                 className={`h-7 w-7 rounded-full border-2 ${
              item === color
                ? "border-black"
                : "border-gray-300"
            } ${
              item === "white"
                ? "bg-white"
                : item === "blue"
                ? "bg-blue-300"
                : item === "purple"
                ? "bg-purple-300"
                : item === "yellow"
                ? "bg-yellow-300"
                : item === "green"
                ? "bg-green-300"
                : "bg-pink-300"
            }`}
            ></button>
            ))}
            </div>
        </div>
    )
}
export default ColorPicker;