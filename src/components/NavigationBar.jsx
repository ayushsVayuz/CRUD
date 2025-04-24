import React from "react";
import { Link } from "react-router-dom";


function NavigationBar() {
    return (
        <nav className="grid grid-cols-2 gap-150 bg-sky-500">
            <h1 className="pl-30 text-[40px]">CRUD</h1>
            <div className="grid grid-cols-2 gap-15 text-[20px] pt-3 w-50 ml-30">
                <Link to="/home" className="w-20 hover:text-white font-semibold">Home</Link>
                <Link to="/about" className=" w-20 hover:text-white font-semibold">About</Link>
            </div>
           
        </nav>
    );
}

export default NavigationBar;