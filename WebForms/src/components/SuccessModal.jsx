import React from "react";

const SuccessModal = ({ isOpen, onClose, timeSpent }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl">

                <h2 className="text-2xl font-bold text-green-600 mb-2">
                    🎉 Success!
                </h2>

                <p className="text-gray-600 mb-4">
                    Your account has been created successfully.
                </p>

                <p className="text-sm text-gray-500 mb-6">
                    ⏱ Time taken: <span className="font-semibold">{timeSpent}s</span>
                </p>

                <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    OK
                </button>

            </div>
        </div>
    );
};

export default SuccessModal;