import React from "react";

const ErrorModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center">

                <h2 className="text-xl font-bold text-red-600 mb-3">
                    ❌ Error
                </h2>

                <p className="text-gray-700 mb-5">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;