"use client";

import { usePathname } from "next/navigation";

export default function Formulario() {
    // gets url from the dynamic route
    const url = usePathname();
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-6">
                <h2 className="text-2xl font-bold text-center text-black">
                    Redirected to url: {url}
                </h2>
            </div>
        </div>
    );
}
