import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@material-tailwind/react';

const getIntensityColor = (intensity) => {
    const hue = ((1 - (intensity / 100)) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`; // Green to Yellow to Red gradient
};

const VideoItem = ({ videoSrc, camid, intensity, location, openModal, className }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={ref}
            className={`relative ${className} bg-gray-100 rounded-lg overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cam ID Label */}
            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded z-10">
                Cam {camid}
            </div>

            {/* Intensity Indicator */}
            <div
                className="absolute top-2 right-2 h-4 w-4 rounded-full border-2 border-white z-10"
                style={{ backgroundColor: getIntensityColor(intensity) }}
            />

            {/* Video Element */}
            <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 object-cover w-full h-full"
                style={{ zIndex: 1 }} // Ensure video is behind the labels
            />

            {/* Hover Button */}
            {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <Button variant="outlined" className="bg-white text-black" onClick={() => openModal(camid, videoSrc, intensity, location)}>
                        View Feed
                    </Button>
                </div>
            )}
        </div>
    );
};

export default VideoItem;
