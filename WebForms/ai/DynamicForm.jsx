import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormTimer from "/src/components/FormTimer";
import SuccessModal from "/src/components/SuccessModal";
import ErrorModal from "/src/components/ErrorModal";

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
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const getPasswordStrength = (password) => {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1)
            return { label: "Weak", color: "text-red-500", bar: "bg-red-500", width: "25%" };

        if (score === 2 || score === 3)
            return { label: "Medium", color: "text-yellow-500", bar: "bg-yellow-500", width: "60%" };

        return { label: "Strong", color: "text-green-500", bar: "bg-green-500", width: "100%" };
    };

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

        if (!/^\d{4,5}$/.test(formData.postCode)) {
            newErrors.postCode = "Postcode must be 4–5 digits";
        }

        if (!/^\d{8,11}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile number must be 8-11 digits";
        }

        const passwordStrengthCheck = getPasswordStrength(formData.password);
        if (passwordStrengthCheck.label === "Weak") {
            newErrors.password = "Password must be Medium or Strong";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            setErrorMessage("Please fix the errors and try again.");
            setShowError(true);
            return;
        }

        setIsTimerRunning(false);

        try {
            const res = await fetch("http://localhost:5000/api/dynamic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    timeSpent,
                }),
            });

            if (!res.ok) throw new Error("Server error");

            setShowSuccess(true);

            console.log("Form submitted successfully:", { ...formData, timeSpent });

        } catch (error) {
            setErrorMessage(error.message);
            setShowError(true);
        }
    };

    // ✅ SUCCESS MODAL CLOSE
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

        navigate("/thankYou"); // 👈 redirect after OK
    };

    // ❌ ERROR MODAL CLOSE
    const handleCloseError = () => {
        setShowError(false);
        setErrorMessage("");
    };

    const showEmailWarning =
        formData.email.length > 0 && !isValidEmail(formData.email);

    const passwordStrength = getPasswordStrength(formData.password);

    const showEmailMatchMessage =
        formData.confirmEmail.length > 0 && formData.email.length > 0;

    const isEmailMatch =
        formData.email === formData.confirmEmail;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3 sm:p-6">

            {/* ✅ MODALS FIXED */}
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
                className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-4 sm:p-6 md:p-8"
            >
                <p className="text-xs sm:text-sm text-gray-600 text-center text-white bg-blue-600 py-1">Dynamic Form</p>
                <h1 className="text-xl sm:text-2xl md:text-[26px] font-bold text-center text-blue-600 mb-2">
                    Bite And Breakfast Inn
                </h1>

                <p className="text-center text-gray-600 text-sm sm:text-base mb-2">
                    “Where every bed comes with extra guests.”
                </p>

                <FormTimer
                    onTimeUpdate={setTimeSpent}
                    isRunning={isTimerRunning}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 mt-4">
                    {Object.keys(formData).map((field) => (
                        <div
                            key={field}
                            className={field === "password" ? "sm:col-span-2" : ""}
                        >
                            <label className="text-xs sm:text-sm text-gray-600 capitalize">
                                {field}
                            </label>

                            <input
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                type={field.includes("password") ? "password" : "text"}
                                inputMode={
                                    field === "postCode" || field === "mobile"
                                        ? "numeric"
                                        : "text"
                                }
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-blue-500"
                            />

                            {field === "confirmEmail" && showEmailMatchMessage && (
                                <p
                                    className={`text-[11px] sm:text-xs mt-1 ${isEmailMatch ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {isEmailMatch ? "Emails matched" : "Emails do not match"}
                                </p>
                            )}

                            {field === "password" && formData.password.length > 0 && (
                                <div className="mt-2">
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${passwordStrength.bar}`}
                                            style={{ width: passwordStrength.width }}
                                        />
                                    </div>

                                    <p className={`text-xs mt-1 ${passwordStrength.color}`}>
                                        Password Strength: {passwordStrength.label}
                                    </p>
                                </div>
                            )}

                            {errors[field] && (
                                <p className="text-red-500 text-[11px] sm:text-xs mt-1">
                                    {errors[field]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-6 text-sm sm:text-base"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DynamicForm;