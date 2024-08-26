"use client";
import CamTable from '@/components/CamTable/page';
import React from 'react'


const Home = () => {
    return (
        <div className="flex h-screen w-screen">
            <div className="w-24 bg-[#424242] p-2">
                <div className='bg-white h-full rounded-xl'> Sidebar  </div>
            </div>
            <div className="flex-1 bg-[#424242] pt-2 pl-2 pr-2">
                <CamTable/>
            </div>
        </div>
    )
}

export default Home;
