import React from "react";

export default function ThankYouMessage() {
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
            </div>
        </div>
    );
}
