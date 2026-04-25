{
    /* 
       *ALWAYS change the URL/API address when changing hotspot or network. 
  
       *URL
        backend: URL:5000 OR 5000/api/static to see the datas
        frontend: URL:5153
  */
}

import React, { useState } from "react";
import FormTimer from "/src/components/FormTimer";
import SuccessModal from "/src/components/SuccessModal";
import ErrorModal from "/src/components/ErrorModal";

const API_URL = "http://192.168.0.197:5000"; // 🔁 change if IP changes. BACKEND: /api/static

const StaticForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        postCode: "",
        state: "",
        country: "",
        nationality: "",
        mobile: "",
        email: "",
        confirmEmail: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [timeSpent, setTimeSpent] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "postCode") {
            const onlyNumbers = value.replace(/\D/g, "");
            if (onlyNumbers.length <= 5) {
                setFormData({ ...formData, postCode: onlyNumbers });
            }
            return;
        }

        if (name === "mobile") {
            const onlyNumbers = value.replace(/\D/g, "");
            setFormData({ ...formData, mobile: onlyNumbers });
            return;
        }

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = "This field is required";
            }
        });

        if (!/^\d{4,5}$/.test(formData.postCode)) {
            newErrors.postCode = "Postcode must be 4–5 digits";
        }

        if (!/^\d{8,11}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile number must be 8-11 digits";
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must be at least 8 characters, include 1 uppercase letter and 1 number";
        }

        if (formData.email !== formData.confirmEmail) {
            newErrors.confirmEmail = "Emails do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ FIXED: modal close handler (MISSING BEFORE)
    const handleCloseModal = () => {
        setShowSuccess(false);

        setFormData({
            name: "",
            address: "",
            city: "",
            postCode: "",
            state: "",
            country: "",
            nationality: "",
            mobile: "",
            email: "",
            confirmEmail: "",
            password: "",
        });

        setErrors({});
        setTimeSpent(0);
        setIsTimerRunning(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            setErrorMessage("Please fix the errors and try again.");
            setShowError(true);
            return;
        }

        setIsTimerRunning(false);

        console.log("📤 Sending data:", { ...formData, timeSpent });

        try {
            const res = await fetch(`${API_URL}/api/static`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    timeSpent
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Server error");
            }

            // ✅ SHOW MODAL ONLY HERE
            setShowSuccess(true);

        } catch (error) {
            console.error("❌ FULL ERROR:", error);
            setErrorMessage(error.message);
            setShowError(true);
        }

    };
    const handleCloseError = () => {
        setShowError(false);
        setErrorMessage("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            {/* ✅ MODAL MUST BE HERE (NOT INSIDE handleSubmit) */}
            <SuccessModal
                isOpen={showSuccess}
                onClose={handleCloseModal}
                timeSpent={timeSpent}
            />
            <ErrorModal
                isOpen={showError}
                onClose={handleCloseError}
                message={errorMessage}
            />

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl px-8 py-6 w-full max-w-3xl"
            >

                <h1 className="text-[26px] font-bold text-center text-blue-600 mb-2">
                    Bite And Breakfast Inn
                </h1>

                <p className="text-center text-gray-600 mb-2">
                    “Where every bed comes with extra guests.”
                </p>

                <FormTimer
                    onTimeUpdate={setTimeSpent}
                    isRunning={isTimerRunning}
                />

                <div className="grid grid-cols-2 gap-1">
                    {Object.keys(formData).map((field) => (
                        <div key={field} className={field === "password" ? "col-span-2" : ""}>
                            <label className="text-sm text-gray-600 capitalize">
                                {field}
                            </label>

                            <input
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                type={field.includes("password") ? "password" : "text"}
                                inputMode={field === "postCode" || field === "mobile" ? "numeric" : "text"}
                                className="w-full border border-gray-300 rounded-lg p-2"
                            />

                            {errors[field] && (
                                <p className="text-red-500 text-[12px]">
                                    {errors[field]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6"
                >
                    Create Account
                </button>

            </form>
        </div>
    );
};

export default StaticForm;