"use client";
import Image from 'next/image';
import React from 'react';
import { FaCameraRetro } from 'react-icons/fa';
import { Tooltip, Card, IconButton } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiFillAlert } from "react-icons/ai";
const Home = () => {
  const router = useRouter(); // Initialize useRouter

  const handleCameraClick = () => {
      router.push('/camera'); // Navigate to /camera
  };
  const handleHomeClick = () => {
      router.push('/'); // Navigate to /camera
  };
  const handleAlertClick = () => {
      router.push('/alertdash'); // Navigate to /camera
  };
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex flex-1">
        <div className="w-26 bg-[#424242] p-2 pb-1">
          <div className="bg-white h-full rounded-xl flex flex-col items-center">
          <Tooltip content="SIH'24" placement="right">
                            <div className="relative border-2 border-black w-12 h-12 m-1 rounded-xl cursor-pointer">
                                <a href="https://www.sih.gov.in/" target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/sih.png"
                                        alt="SIH Logo"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="rounded-xl"
                                    />
                                </a>
                            </div>
                        </Tooltip>
                        <Tooltip content="SRM KTR ❤️" placement="right">
                            <div className="relative border-2 border-black w-12 h-12 m-1 rounded-xl cursor-pointer">
                                <a href="https://www.srmist.edu.in/" target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/srm.png"
                                        alt="SRM Logo"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="rounded-xl"
                                    />
                                </a>
                            </div>
                        </Tooltip>
                        {/* Add the camera button */}
                        <Tooltip content="Analysis Dashboard" placement="right">
                            <IconButton
                                variant="outlined"
                                size="lg"
                                className="m-1"
                                onClick={handleHomeClick} 
                            >
                                <MdOutlineSpaceDashboard size={30} /> {/* Increase icon size */}
                            </IconButton>
                        </Tooltip>
                        <Tooltip content="View Camera's" placement="right">
                            <IconButton
                                variant="outlined"
                                size="lg"
                                className="m-1"
                                onClick={handleCameraClick} // Handle camera button click
                            >
                                <FaCameraRetro size={30} /> {/* Increase icon size */}
                            </IconButton>
                        </Tooltip>
                        <Tooltip content="Police Alert Dashboard" placement="right">
                            <IconButton
                                variant="outlined"
                                size="lg"
                                className="m-1"
                                onClick={handleAlertClick} // Handle camera button click
                            >
                                <AiFillAlert size={30} /> {/* Increase icon size */}
                            </IconButton>
                        </Tooltip>
          </div>
        </div>
        <div className="flex-1 bg-[#424242] h-full pt-2 pl-2 pr-2">
          <Card className="h-full w-full">
          </Card>
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
