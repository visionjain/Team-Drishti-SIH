import React from 'react';
import { useInView } from 'react-intersection-observer';

const getIntensityColor = (intensity) => {
    const hue = ((1 - (intensity / 100)) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`; // Green to Yellow to Red gradient
};

const VideoItem = ({ videoSrc, camid, intensity }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <div
            ref={ref}
            className="relative h-24 w-full bg-gray-100 rounded-lg overflow-hidden"
        >
            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded z-10">
                Cam {camid}
            </div>
            <div
                className="absolute top-2 right-2 h-4 w-4 rounded-full border-2 border-white z-10"
                style={{ backgroundColor: getIntensityColor(intensity) }}
            />
            <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 object-cover w-full h-full"
                style={{ zIndex: 1 }} // Ensure video is behind the labels
            />
        </div>
    );
}

export default VideoItem;
