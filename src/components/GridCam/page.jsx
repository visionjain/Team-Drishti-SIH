import React, { useState, useRef, useEffect } from 'react';
import { TABLE_ROWS } from '@/components/Data/cameraData';
import { Button, Typography, CardFooter } from "@material-tailwind/react";
import VideoItem from './VideoItem';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

// Move getIntensityColor function to the top
const getIntensityColor = (intensity) => {
    const hue = ((1 - (intensity / 100)) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`; // Green to Yellow to Red gradient
};

const GridView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCamId, setSelectedCamId] = useState(null);
    const [selectedVideoSrc, setSelectedVideoSrc] = useState(null);
    const [selectedIntensity, setSelectedIntensity] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const rowsPerPage = 24; // 4 rows with 6 columns = 24 feeds per page
    const gridRef = useRef(null);

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

    // Scroll to top of the grid when page changes
    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    // Open Modal with selected video data
    const openModal = (camid, videoSrc, intensity, location) => {
        setSelectedCamId(camid);
        setSelectedVideoSrc(videoSrc);
        setSelectedIntensity(intensity);
        setSelectedLocation(location);
        setModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <div>
            <div ref={gridRef} className="grid grid-cols-6 gap-4 p-4">
                {currentRows.map((row, index) => (
                    <VideoItem
                        key={index}
                        videoSrc={row.videoSrc}
                        camid={row.camid}
                        intensity={row.intensity}
                        location={row.location} // Assuming you have a location field
                        openModal={openModal}
                    />
                ))}
            </div>
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

            {/* Modal */}
            <Dialog open={modalOpen} handler={closeModal} size="xl">
                <DialogHeader>Camera ID: {selectedCamId}</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col items-center">
                        {selectedVideoSrc && (
                            <div className="relative w-full h-80 rounded-lg overflow-hidden">
                                <video
                                    src={selectedVideoSrc}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {selectedLocation && (
                            <div className="mt-4 w-full text-center">
                                <Typography variant="h6">Location</Typography>
                                <Typography variant="body1" color="blue-gray">
                                    {selectedLocation}
                                </Typography>
                                <div className="flex justify-center items-center mt-2">
                                    <div
                                        className="h-6 w-6 rounded-full"
                                        style={{ backgroundColor: getIntensityColor(selectedIntensity) }}
                                    />
                                    <Typography variant="body1" color="blue-gray" className="ml-2">
                                       Intensity: {selectedIntensity}%
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
};

export default GridView;
