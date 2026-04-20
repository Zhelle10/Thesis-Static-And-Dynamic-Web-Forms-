import React, { useEffect, useState } from "react";

const FormTimer = ({ onTimeUpdate }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // send time to parent (optional)
    useEffect(() => {
        if (onTimeUpdate) {
            onTimeUpdate(seconds);
        }
    }, [seconds, onTimeUpdate]);

    const formatTime = () => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="text-right text-sm text-gray-500 mb-2">
            ⏱ Time: {formatTime()}
        </div>
    );
};

export default FormTimer;