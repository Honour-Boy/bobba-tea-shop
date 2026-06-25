const Alert = ({msg, setMsg}) => {
    const style = msg.show === true ? "flex" : "hidden"
    
    return(
        <div className={`${style} absolute inset-1/3 inset-y-1/3 lg:w-1/3 md:w-1/2 w-3/4 min-h-[150px] max-h-[200px] p-3 flex-col gap-4 items-center justify-center bg-white-100 rounded-xl`}>
            <div className="text-[30px] font-semibold">
                <h1>Message!!!</h1>
            </div>
            <div className="text-[20px]">
                <h2>{msg.value}</h2>
            </div>
            <div className="w-[60px] h-[35px] bg-tertiary text-white flex items-center justify-center rounded-lg hover:bg-[#73907c]">
                <button className="w-full h-full" onClick={() => setMsg(true)}>OK</button>
            </div>
        </div>
    )
}

export default Alert;