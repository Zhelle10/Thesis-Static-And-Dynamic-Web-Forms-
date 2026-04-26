import React from "react";
import { useNavigate } from "react-router-dom";


const WelcomeMessage = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center border border-gray-100">

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Welcome to the Testing Phase 👋
                </h1>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    Thank you for participating in my thesis web form testing.
                    Your feedback is very important in improving the system’s usability,
                    performance, and overall experience.
                </p>



                <p className="text-sm text-gray-500 mb-6">
                    This testing session is part of an academic research project.
                    All responses will be used strictly for evaluation purposes.
                </p>

                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                    onClick={() => navigate("/static")}
                >
                    Start Testing
                </button>

                <p className="text-xs text-gray-400 mt-4">
                    Thank you for your time and support 🙏
                </p>
            </div>
        </div>
    );
};

export default WelcomeMessage;