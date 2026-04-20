import React from 'react'
import { useState } from 'react';

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
        password: "",
        nationality: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/static", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Server error");

            const data = await res.json();
            console.log(data);

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
                password: "",
                nationality: "",
            });

        } catch (error) {
            console.error(error);
            alert("❌ Failed to submit (backend not running?)");
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white shadow-xl rounded-2xl px-8 py-6 w-full max-w-3xl">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
                    The Bite And Breakfast Inn
                </h1>
                <p className="text-center text-gray-500 mb-6">“Where every bed comes with extra guests.”</p>


                {/* GRID START */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="text-sm text-gray-600">Fullname</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Name"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Address</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            type="text"
                            placeholder="Address"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Post code</label>
                        <input
                            name="postCode"
                            value={formData.postCode}
                            onChange={handleChange}
                            type="text"
                            placeholder="Post code"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">City</label>
                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            type="text"
                            placeholder="City"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">State</label>
                        <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            type="text"
                            placeholder="State"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Country</label>
                        <input
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            type="text"
                            placeholder="Country"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Nationality</label>
                        <input
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            type="text"
                            placeholder="Nationality"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Mobile number</label>
                        <input
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            type="text"
                            placeholder="Mobile number"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Confirm Email</label>
                        <input
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                            type="email"
                            placeholder="Confirm Email"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* FULL WIDTH PASSWORD */}
                    <div className="col-span-2">
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg mt-6"
                >
                    Create Account
                </button>

            </form>
        </div>
    );
}

export default StaticForm