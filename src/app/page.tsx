"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

export default function Formulario() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [generatedURL, setGeneratedURL] = useState("");

    // Function that shortens the URL using a generated uuid and shortened using the first segment
    // of the uuid, it should always be shorter than the original url
    function shortenURL(url: string) {
        // Should start with the basestring of this app
        const baseURL = "http://localhost:3000";
        try {
            const uuid = uuidv4();
            // Shorten the uuid using the first segment
            const shortenedUUID = uuid.split("-")[0];
            // It should always be shorter than the original url
            const shortenedURL = `${baseURL}/${shortenedUUID}`;
            console.log("shortened url:", shortenedURL);
            setGeneratedURL(shortenedURL);
        } catch (error) {
            console.log("Error in shortenURLhounction:", error);
            Swal.fire({
                title: "Error",
                text: "Error in shortenURL function",
                icon: "error",
                confirmButtonText: "Ok",
            });
            setError("Error in shortenURL function");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-6">
                <h2 className="text-2xl font-bold text-center text-black">
                    Shortener
                </h2>

                {/* Input field */}
                <div>
                    <input
                        id="url"
                        name="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-zinc-400"
                        placeholder="Insert your url"
                    />
                </div>

                {/* Error message */}
                {error && <div className="text-red-600 text-sm">{error}</div>}

                {/* Button to shorten the URL */}
                <button
                    onClick={() => {
                        shortenURL(url);
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Generate
                </button>

                {/* Generated URL */}
                {generatedURL && (
                    <div className="flex flex-col items-center justify-center text-black">
                        <label
                            htmlFor="generatedURL"
                            className="block mb-1 font-semibold"
                        >
                            Generated URL
                        </label>
                        <input
                            id="generatedURL"
                            name="generatedURL"
                            type="text"
                            value={generatedURL}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            readOnly
                        />

                        <div className="flex w-full gap-5 justify-center mt-3">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(generatedURL);
                                }}
                                className="w-1/2 bg-blue-600 text-white py-2 my-1 rounded-lg hover:bg-blue-700 transition"
                            >
                                Copy
                            </button>
                            <button
                                onClick={() => {
                                    window.open(generatedURL, "_blank");
                                }}
                                className="w-1/2 bg-blue-600 text-white py-2 my-1 rounded-lg hover:bg-blue-700 transition"
                            >
                                Go to URL
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
