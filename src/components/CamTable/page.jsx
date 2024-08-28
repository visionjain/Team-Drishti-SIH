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
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Camera ID", "Camera", "Location", "Intensity", "Last Activity", "View", "Action"];

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
    const rowsPerPage = 10;
    const tableRef = useRef(null);

    // Sort TABLE_ROWS by intensity in descending order
    const sortedRows = [...TABLE_ROWS].sort((a, b) => b.intensity - a.intensity);

    // Calculate total pages
    const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

    // Get current rows based on the current page
    const currentRows = sortedRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handle next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Handle previous page
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
                                                            <Button variant="outlined" size="sm">
                                                                View Feed
                                                            </Button>
                                                        </td>
                                                        <td className={`${rowClasses} text-center`}>
                                                            <Tooltip content="Edit Camera">
                                                                <IconButton variant="text">
                                                                    <PencilIcon className="h-4 w-4" />
                                                                </IconButton>
                                                            </Tooltip>
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
        </div>
    );
}

export default CamTable;