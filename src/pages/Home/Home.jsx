import React from 'react'
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import Totaluser from '../../components/Totaluser';
import Searchuser from '../../components/Searchuser';

const Home = () => {
  return (
    <div className="pt-15">
            <div className="grid grid-cols-2 gap-10 ml-60 mr-60 text-[20px]">
                <div className="w-40 "><Totaluser/></div>
                <div className="grid grid-cols-2 ">
                    <Link to="/Add" className="w-30 font-medium text-sky-800 text-center border-2 border-sky-800 rounded-3xl">Add User</Link>
                    <div ><Searchuser /></div>
                </div>
            </div>

            <div className="pt-10">
                <Table />
            </div>
    </div>
  );
}

export default Home;
