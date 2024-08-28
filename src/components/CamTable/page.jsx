"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import GridView from '@/components/GridCam/page';
import { TABLE_ROWS } from '@/components/Data/cameraData';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Camera ID", "Camera", "Location", "Intensity", "Last Activity", "View"];

const TABS = [
    {
        label: "Table",
        value: "all",
    },
    {
        label: "Grid",
        value: "monitored",
    },
];


const getIntensityColor = (intensity) => {
    const hue = ((1 - (intensity / 100)) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`; // Green to Yellow to Red gradient
};

const CamTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("all");
    const [modalOpen, setModalOpen] = useState(false); // State for modal
    const [selectedCamId, setSelectedCamId] = useState(null); // State for selected camera ID
    const [videoSrc, setVideoSrc] = useState(null); // State for video source
    const [location, setLocation] = useState(""); // State for location
    const [intensity, setIntensity] = useState(0); // State for intensity
    const rowsPerPage = 10;
    const tableRef = useRef(null);
    // Sort TABLE_ROWS by intensity in descending order
    const sortedRows = [...TABLE_ROWS].sort((a, b) => b.intensity - a.intensity);
    const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
    const currentRows = sortedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Scroll to top of the table when page changes
    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    const openModal = (camId, videoSrc, location, intensity) => {
        setSelectedCamId(camId);
        setVideoSrc(videoSrc); // Set the video source
        setLocation(location); // Set the location
        setIntensity(intensity); // Set the intensity
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCamId(null);
        setVideoSrc(null);
        setLocation(""); // Clear the location
        setIntensity(0); // Clear the intensity
        setModalOpen(false);
    };


    return (
        <div>
            <div className="w-full">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-2 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Camera&#39;s
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    See information about all cameras
                                </Typography>
                            </div>
                            <div className="flex flex-col items-center justify-between md:flex-row">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    />
                                </div>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Tabs value={activeTab} className="w-full md:w-max">
                                    <TabsHeader>
                                        {TABS.map(({ label, value }) => (
                                            <Tab
                                                key={value}
                                                value={value}
                                                onClick={() => setActiveTab(value)}
                                            >
                                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                            </Tab>
                                        ))}
                                    </TabsHeader>
                                </Tabs>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="overflow-x-auto px-0">
                        {activeTab === "all" ? (
                            <div className="min-w-full max-h-[472px]" ref={tableRef}>
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head, index) => (
                                                <th
                                                    key={head}
                                                    className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${index === 1 ? 'text-center' : index === 0 ? 'text-left' : 'text-center'}`}
                                                >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRows.map(
                                            ({ videoSrc, camid, location, intensity, date }, index) => {
                                                const isLast = index === currentRows.length - 1;
                                                const rowClasses = isLast
                                                    ? "p-4"
                                                    : "p-4 border-b border-blue-gray-50";

                                                return (
                                                    <tr key={`${camid}-${index}`}>
                                                        <td className={`${rowClasses} text-left`}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {camid}
                                                            </Typography>
                                                        </td>
                                                        <td className={`${rowClasses} text-center`}>
                                                            <div className="relative h-20 w-48 rounded-lg overflow-hidden mx-auto">
                                                                <video
                                                                    src={videoSrc}
                                                                    autoPlay
                                                                    muted
                                                                    playsInline
                                                                    className="absolute inset-0 object-cover"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className={`${rowClasses} text-center`}>
                                                            <div className="flex flex-col items-center">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {location}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={`${rowClasses} text-center`}>
                                                            <div className="flex justify-center items-center">
                                                                <div
                                                                    className="h-6 w-6 rounded-full"
                                                                    style={{ backgroundColor: getIntensityColor(intensity) }}
                                                                />
                                                                <div className='text-sm text-black'>&nbsp;&nbsp;{intensity}%</div>
                                                            </div>
                                                        </td>
                                                        <td className={`${rowClasses} text-center`}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {date}
                                                            </Typography>
                                                        </td>
                                                        <td className={`${rowClasses} text-center`}>
                                                            <Button
                                                                variant="outlined"
                                                                size="sm"
                                                                onClick={() => openModal(camid, videoSrc, location, intensity)} // Pass location and intensity
                                                            >
                                                                View Feed
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <GridView />
                        )}
                    </CardBody>

                    {activeTab === "all" && (
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Page {currentPage} of {totalPages}
                            </Typography>
                            <div className="flex gap-2">
                                <Button variant="outlined" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                    Previous
                                </Button>
                                <Button variant="outlined" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    Next
                                </Button>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </div>

            {/* Modal for Camera ID */}
            <Dialog open={modalOpen} handler={closeModal} size="xl">
                <DialogHeader>Camera ID: {selectedCamId}</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col items-center">
                        {videoSrc && (
                            <div className="relative w-full h-80 rounded-lg overflow-hidden">
                                <video
                                    src={videoSrc}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {videoSrc && (
                            <div className="mt-4 w-full text-center">
                                <Typography variant="h6">Location</Typography>
                                <Typography variant="body1" color="blue-gray">
                                    {location}
                                </Typography>
                                <div className="flex justify-center items-center mt-2">
                                    <div
                                        className="h-6 w-6 rounded-full"
                                        style={{ backgroundColor: getIntensityColor(intensity) }}
                                    />
                                    <Typography variant="body1" color="blue-gray" className="ml-2">
                                       Intensity: {intensity}%
                                    </Typography>
                                </div>
                            </div>
                        )}
                        <div className="flex mt-4 gap-4">
                            <Button variant="outlined" color="red" onClick={() => console.log("Alert triggered")}>
                                Alert
                            </Button>
                            <Button variant="outlined" color="gray" onClick={() => console.log("False Alert triggered")}>
                                False Alert
                            </Button>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={closeModal} className="mr-1">
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default CamTable;