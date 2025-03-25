import { useRouteError } from "react-router-dom";
import React from "react";

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md border border-red-400">
                <h1 className="text-5xl font-bold text-red-600 mb-4">Oops!!</h1>
                <h2 className="text-xl text-gray-700 mb-4">Something went wrong!!</h2>
                <h3 className="text-lg text-gray-600">{err.status}: {err.statusText}</h3>
                <button 
                    onClick={() => window.history.back()} 
                    className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Error;
