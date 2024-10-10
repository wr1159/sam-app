"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { Plant } from "@/types/plants";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

// User Location Marker Component
function UserLocationMarker() {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition([
                        position.coords.latitude,
                        position.coords.longitude,
                    ]);
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        console.error(
                            "User denied the request for Geolocation."
                        );
                    } else {
                        console.error("Error getting location:", error);
                    }
                },
                {
                    enableHighAccuracy: true, // Optional: more accurate GPS, but may take longer
                    timeout: 5000, // Optional: time to wait before giving up
                    maximumAge: 0, // Optional: avoid cached results
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        position && (
            <CircleMarker
                center={position}
                radius={10}
                color="red"
                fillColor="red"
                fillOpacity={0.7}
            >
                <Popup>You are here</Popup>
            </CircleMarker>
        )
    );
}

export default function ViewPlants() {
    const [submissions, setSubmissions] = useState<Plant[]>([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            const res = await fetch("/api/plants");
            const data: Plant[] = await res.json();
            setSubmissions(data);
        };
        fetchSubmissions();
    }, []);

    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Plant Submissions</h1>
            <MapContainer
                center={[1.3521, 103.8198]} // Default center (Singapore)
                zoom={5}
                className="h-[60vh] mb-8 w-[80vw]"
                worldCopyJump={true} // Enable map wrapping
                maxZoom={18} // Optional: Limit max zoom level
                minZoom={2} // Optional: Limit min zoom level
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Render user location marker */}
                <UserLocationMarker />

                <MarkerClusterGroup>
                    {submissions.map((submission) => (
                        <CircleMarker
                            key={submission.id}
                            center={[submission.latitude, submission.longitude]}
                            radius={8}
                            color="blue" // Change the circle color
                            fillColor="blue" // Fill color for the circle
                            fillOpacity={0.5} // Opacity of the fill color
                        >
                            <Popup>
                                <img
                                    src={submission.image_url}
                                    alt="Plant"
                                    className="w-32"
                                />
                                <p>Lat: {submission.latitude}</p>
                                <p>Lon: {submission.longitude}</p>
                            </Popup>
                        </CircleMarker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {submissions.map((submission) => (
                    <div
                        key={submission.id}
                        className="border rounded-lg shadow p-2"
                    >
                        <img
                            src={submission.image_url}
                            alt="Plant"
                            className="w-full h-40 object-cover rounded"
                        />
                        <p className="mt-2">Lat: {submission.latitude}</p>
                        <p>Lon: {submission.longitude}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
