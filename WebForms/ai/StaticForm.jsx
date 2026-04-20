import React, { useState } from "react";

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // clear error while typing
    };

    const validate = () => {
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = "This field is required";
            }
        });

        if (formData.email !== formData.confirmEmail) {
            newErrors.confirmEmail = "Emails do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return; // stop submit if errors

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

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
                    The Bite And Breakfast Inn
                </h1>
                <p className="text-center text-gray-500 mb-6">“Where every bed comes with extra guests.”</p>

                <div className="grid grid-cols-2 gap-4">

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
                                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                            />

                            {errors[field] && (
                                <p className="text-red-500 text-sm mt-1">
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