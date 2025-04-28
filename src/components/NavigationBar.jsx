import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <nav className="bg-sky-500 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
             
                <h1 className="text-2xl sm:text-3xl font-bold text-white">CRUD</h1>

              
                <div className="flex gap-6 text-lg">
                    <Link to="/home" className="hover:text-white font-semibold">Home</Link>
                    <Link to="/about" className="hover:text-white font-semibold">About</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;