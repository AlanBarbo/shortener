"use client";

import Swal from "sweetalert2";
import { useState } from "react";

import TextInput from "../components/TextInput";

import { shortenURL } from "../utils/functions/shorten";

export default function Formulario() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [generatedURL, setGeneratedURL] = useState("");

    // Function that shortens the URL using a generated uuid and shortened using the first segment
    // of the uuid, it should always be shorter than the original url
    function handleShorten() {
        try {
            const result = shortenURL(url);
            setGeneratedURL(result);
        } catch (error) {
            console.error("Error en shortenURL:", error);
            Swal.fire({
                title: "Error",
                text: (error as Error).message,
                icon: "error",
                confirmButtonText: "Ok",
            });
            setError((error as Error).message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-6">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-black">
                    Shortener
                </h2>
                {/* Input URL field */}
                <div>
                    <TextInput
                        id="url"
                        name="url"
                        value={url}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUrl(e.target.value)
                        }
                        placeholder="Insert your url"
                    />
                </div>
                {/* Error message */}
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {/* Button to shorten the URL */}
                <button
                    onClick={handleShorten}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Generate
                </button>
                {/* Generated URL */}
                {generatedURL && (
                    <div className="flex flex-col items-center justify-center text-black">
                        {/* Generated URL */}
                        <label
                            htmlFor="generatedURL"
                            className="block mb-1 font-semibold"
                        >
                            Generated URL
                        </label>
                        <TextInput
                            id="generatedURL"
                            name="generatedURL"
                            value={generatedURL}
                            placeholder="Insert your url"
                            readOnly
                        />
                        {/* Buttons to copy and open the generated URL */}
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
