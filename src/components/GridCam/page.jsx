import React, { useState, useRef, useEffect } from 'react';
import { TABLE_ROWS } from '@/components/Data/cameraData';
import { Button, Typography, CardFooter } from "@material-tailwind/react";
import VideoItem from './VideoItem'; // Import the VideoItem component

const GridView = () => {
    const [currentPage, setCurrentPage] = useState(1);
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

    return (
        <div>
            <div ref={gridRef} className="grid grid-cols-6 gap-4 p-4">
                {currentRows.map((row, index) => (
                    <VideoItem
                        key={index}
                        videoSrc={row.videoSrc}
                        camid={row.camid}
                        intensity={row.intensity}
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
        </div>
    );
}

export default GridView;
