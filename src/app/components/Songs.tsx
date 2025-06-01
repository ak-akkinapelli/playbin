"use client";

import { useEffect, useState } from "react";

const Songs = () => {
    const [songs, setSongs] = useState<{ id: number; name: string; url: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadSongs();
    }, []);

    useEffect(() => {
        if (songs.length > 0) {
            console.log("Song URLs:", songs.map((song) => song.url));
        }
    }, [songs]);

    const loadSongs = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/getAllSongs");
            const data = await response.json();

            if (!data.songs || data.songs.length === 0) {
                setError("No audio files found in R2 bucket.");
                return;
            }

            setSongs(data.songs);
        } catch (err) {
            console.error("Error loading songs:", err);
            setError("Failed to fetch songs from Cloudflare R2.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-white rounded-lg border">
                <h2 className="text-2xl font-bold mb-4">🎵 Songs from R2</h2>
                <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <p>Loading songs from Cloudflare R2...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-white rounded-lg border border-red-200">
                <h2 className="text-2xl font-bold mb-4">🎵 Songs from R2</h2>
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-red-700 font-semibold">Error: {error}</p>
                    <button
                        onClick={loadSongs}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg border">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">🎵 Songs from R2</h2>
                <span className="text-sm text-gray-500">
                    {songs.length} song{songs.length !== 1 ? "s" : ""} found
                </span>
            </div>

            {songs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                    <p className="text-lg mb-2">No songs found</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {songs.map((song) => (
                        <div key={song.id} className="p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{song.name}</h3>
                                </div>
                                <audio controls>
                                    <source src={song.url} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Songs;
