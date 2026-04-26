import React from "react";
import { useNavigate } from "react-router-dom";
    
export default function ThankYouMessage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-md p-6 sm:p-10 text-center">
                <div className="text-4xl sm:text-5xl mb-3">🙏</div>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    Thank You for Your Participation!
                </h1>



                <div className="border-t pt-4 text-xs sm:text-sm text-gray-500">
                    — Maricel
                </div>

                <button onClick={() => navigate("/")}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                    Back to home
                </button>
            </div>
        </div>
    );
}
