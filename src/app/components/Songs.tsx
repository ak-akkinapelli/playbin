"use client";

import { useEffect, useState } from "react";

interface Song {
    id: number;
    name: string;
    url: string;
}

const Songs = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadSongs();
    }, []);

    const loadSongs = async () => {
        const baseUrl = "/api/getAllSongs";

        try {
            setLoading(true);
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            if (!data.songs || data.songs.length === 0) {
                setError("No audio files found in R2 bucket.");
                return;
            }

            setSongs(data.songs);
            setError(null);
        } catch (err) {
            console.error("Error loading songs:", err);
            setError("Failed to fetch songs from R2 bucket.");
        } finally {
            setLoading(false);
        }
    };

    // Simple audio type detection with FLAC support
    const getAudioType = (url: string) => {
        const extension = url.split('.').pop()?.toLowerCase() || '';

        const types: Record<string, string> = {
            'flac': 'audio/flac',
            'wav': 'audio/wav',
            'aiff': 'audio/aiff',
            'm4a': 'audio/mp4',
            'aac': 'audio/aac',
            'ogg': 'audio/ogg',
            'mp3': 'audio/mpeg'
        };

        return types[extension] || 'audio/mpeg';
    };

    // Get quality indicator
    const getQualityBadge = (url: string) => {
        const extension = url.split('.').pop()?.toLowerCase() || '';

        const qualities: Record<string, { label: string; color: string }> = {
            'flac': { label: 'FLAC Lossless', color: 'bg-green-500' },
            'wav': { label: 'WAV Uncompressed', color: 'bg-blue-500' },
            'aiff': { label: 'AIFF Uncompressed', color: 'bg-blue-400' },
            'm4a': { label: 'M4A High Quality', color: 'bg-purple-500' },
            'aac': { label: 'AAC', color: 'bg-orange-500' },
            'ogg': { label: 'OGG', color: 'bg-teal-500' },
            'mp3': { label: 'MP3', color: 'bg-gray-500' }
        };

        const quality = qualities[extension] || qualities['mp3'];

        return (
            <span className={`px-2 py-1 rounded text-xs font-bold text-white ${quality.color}`}>
                {quality.label}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="p-6 bg-white rounded-lg border">
                <h2 className="text-2xl font-bold mb-4">🎵 High-Quality Music</h2>
                <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <p>Loading songs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-white rounded-lg border border-red-200">
                <h2 className="text-2xl font-bold mb-4">🎵 High-Quality Music</h2>
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
                <h2 className="text-2xl font-bold">🎵 High-Quality Music</h2>
                <span className="text-sm text-gray-500">
                    {songs.length} song{songs.length !== 1 ? "s" : ""}
                </span>
            </div>

            {songs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                    <p className="text-lg mb-2">No songs found</p>
                    <p className="text-sm">Upload FLAC or WAV files for best quality</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {songs.map((song) => (
                        <div key={song.id} className="p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-lg">{song.name}</h3>
                                        {getQualityBadge(song.url)}
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <audio controls preload="metadata">
                                        <source src={song.url} type={getAudioType(song.url)} />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Songs;