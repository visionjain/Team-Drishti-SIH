"use client";
import CamTable from '@/components/CamTable/page';
import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col h-screen w-screen">
            <div className="flex flex-1">
                <div className="w-24 bg-[#424242] p-2 pb-1">
                    <div className="bg-white h-full rounded-xl">Sidebar</div>
                </div>
                <div className="flex-1 bg-[#424242] h-full pt-2 pl-2 pr-2">
                    <CamTable />
                </div>
            </div>
            <div className="bg-gray-800 w-full text-center py-2">
                <div className=' bg-white mb- ml-2 mr-2 p-1 rounded-xl'>
                &#169; Team DRISHTI - SIH
                </div>
            </div>
        </div>
    );
}

export default Home;
