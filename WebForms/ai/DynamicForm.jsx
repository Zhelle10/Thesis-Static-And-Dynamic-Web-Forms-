import React, { useState } from "react";
import FormTimer from "/src/components/FormTimer";

const DynamicForm = () => {
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
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [timeSpent, setTimeSpent] = useState(0);

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "email") {
            if (value.length > 0 && !isValidEmail(value)) {
                setErrors((prev) => ({
                    ...prev,
                    email: "Please enter valid email address",
                }));
            } else {
                setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.email;
                    return updated;
                });
            }
        }
    };

    const validate = () => {
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = "This field is required";
            }
        });

        if (formData.email && formData.confirmEmail) {
            if (formData.email !== formData.confirmEmail) {
                newErrors.confirmEmail = "Emails do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsTimerRunning(false);

        console.log("Submitted Data:", formData);
        console.log("Time spent:", timeSpent);
    };

    const showEmailWarning =
        formData.email.length > 0 && !isValidEmail(formData.email);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3 sm:p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
                <h1 className="text-xl sm:text-2xl md:text-[26px] font-bold text-center text-blue-600 mb-2">
                    Bite And Breakfast Inn
                </h1>

                <p className="text-center text-gray-600 text-sm sm:text-base mb-2">
                    “Where every bed comes with extra guests.”
                </p>

                {/* GLOBAL EMAIL WARNING */}
                {showEmailWarning && (
                    <p className="text-center text-red-500 text-sm mb-2 px-2">
                        Please enter valid email address
                    </p>
                )}

                <FormTimer
                    onTimeUpdate={setTimeSpent}
                    isRunning={isTimerRunning}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6">
                    {Object.keys(formData).map((field) => (
                        <div key={field} className="flex flex-col">
                            <input
                                type={
                                    field.includes("password")
                                        ? "password"
                                        : "text"
                                }
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field}
                                className="border p-3 rounded-md text-sm sm:text-base focus:outline-blue-500 w-full"
                            />

                            {errors[field] && (
                                <span className="text-red-500 text-xs sm:text-sm mt-1">
                                    {errors[field]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full mt-5 sm:mt-6 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DynamicForm;