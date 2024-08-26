import React from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Camera", "Location", "Intensity", "Last Activity", "View", "Action"];

const TABLE_ROWS = [
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "John Michael",
        email: "john@creative-tim.com",
        location: "65a, Hsidc Indl Estate, Faridabad, Faridabad",
        online: true,
        date: "23/04/18 12:20",
    },
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        location: "17/18, Adhyaru Indl Est, Sun Mill Compound, Lower Parel",
        online: false,
        date: "23/04/18 12:20",
    },
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        location: "5, Nr Kapol Bank, Laxmi Palace, Mathuradas Road, Kandivali (west)",
        online: false,
        date: "19/09/17 12:20",
    },
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        location: "9th Floor, Nariman Bhavan, Nariman Point",
        online: true,
        date: "24/12/08 12:20",
    },
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "Richard Gran",
        location: "12th Main, 1st Cross,1st Stage,hal, Indira Nagar",
        online: false,
        date: "04/10/21 12:20",
    },
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        location: "9th Floor, Nariman Bhavan, Nariman Point",
        online: true,
        date: "24/12/08 12:20",
    },
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "Richard Gran",
        location: "12th Main, 1st Cross,1st Stage,hal, Indira Nagar",
        online: false,
        date: "04/10/21 12:20",
    },
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        location: "9th Floor, Nariman Bhavan, Nariman Point",
        online: true,
        date: "24/12/08 12:20",
    },
    {
        videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        name: "Richard Gran",
        location: "12th Main, 1st Cross,1st Stage,hal, Indira Nagar",
        online: false,
        date: "04/10/21 12:20",
    },
];

const CamTable = () => {
    return (
        <div className="w-full">
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-2 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Camera list
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
                            <Button variant="outlined" size="sm">
                                view all
                            </Button>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Camera
                            </Button>
                        </div>
                    </div>
                    
                </CardHeader>
                <CardBody className="overflow-x-auto px-0">
                    <div className="min-w-full max-h-[515px]"> {/* Adjust max-height as needed */}
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${index === 0 ? '' : 'text-center'}`}
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
                                {TABLE_ROWS.map(
                                    ({ videoSrc, name, location, online, date }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const rowClasses = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";
                                        
                                        return (
                                            <tr key={name}>
                                                <td className={rowClasses}>
                                                    <div className="relative h-20 w-40 rounded-lg overflow-hidden">
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
                                                            className={`h-6 w-6 rounded-full ${online ? "bg-green-500" : "bg-red-500"}`}
                                                        />
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
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default CamTable;