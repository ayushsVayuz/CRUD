import React from 'react'
import Table from '../../components/Table';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-25">
            <div className="grid grid-cols-2 gap-10 ml-60 mr-60 text-[20px]">
                <p className="w-40 ">Total Users:</p>
                <div className="grid grid-cols-2 ml-40">
                    <Link to="/Add" className="w-30 ">Add User</Link>
                    <p className="w-30 ml-10 ">Search?</p>
                </div>
            </div>

            <div className="pt-20">
                <Table />
            </div>
    </div>
  );
}

export default Home;
