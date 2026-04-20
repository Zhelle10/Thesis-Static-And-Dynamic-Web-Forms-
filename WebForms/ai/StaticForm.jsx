import React from "react";
import { useState } from "react";  
import FormTimer from "/src/components/FormTimer"; 

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        // POSTCODE: only numbers + max 5 digits
        if (name === "postCode") {
            const onlyNumbers = value.replace(/\D/g, "");

            if (onlyNumbers.length <= 5) {
                setFormData({ ...formData, postCode: onlyNumbers });
            }
            return;
        }

        // MOBILE: only numbers
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

        // ✅ POSTCODE RULE: 4–5 digits
        if (!/^\d{4,5}$/.test(formData.postCode)) {
            newErrors.postCode = "Postcode must be 4–5 digits";
        }

        // ✅ MOBILE RULE: 11 digits
        if (!/^\d{8,11}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile number must be 8-11 digits";
        }

        // ✅ PASSWORD VALIDATION
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const res = await fetch("http://localhost:3000/api/static", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Server error");

            await res.json();

            alert("✅ Static form submitted!");

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
        } catch (error) {
            console.error(error);
            alert("❌ Failed to submit");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white shadow-xl rounded-2xl px-8 py-6 w-full max-w-3xl">

                <h1 className="text-[26px] font-bold text-center text-blue-600 mb-2">
                    Bite And Breakfast Inn
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    “Where every bed comes with extra guests.”
                </p>
                <FormTimer />

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
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-400"
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
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-6"
                >
                    Create Account
                </button>

            </form>
        </div>
    );
};

export default StaticForm;