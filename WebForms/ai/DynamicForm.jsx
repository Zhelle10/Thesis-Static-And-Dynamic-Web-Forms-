import { useState } from "react";

export default function DynamicForm() {
    const [fields, setFields] = useState([""]);

    const addField = () => {
        setFields([...fields, ""]);
    };

    const handleChange = (index, value) => {
        const updated = [...fields];
        updated[index] = value;
        setFields(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/dynamic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fields }),
            });

            if (!res.ok) throw new Error("Server error");

            const data = await res.json();
            console.log(data);

            alert("✅ Dynamic form submitted!");
            setFields([""]);

        } catch (error) {
            console.error(error);
            alert("❌ Failed to submit (backend not running?)");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded mt-6">
            {fields.map((field, i) => (
                <input
                    key={i}
                    value={field}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className="border p-2 w-full mb-2"
                    placeholder={`Field ${i + 1}`}
                />
            ))}

            <button
                type="button"
                onClick={addField}
                className="bg-gray-500 text-white px-3 py-1 mr-2"
            >
                Add Field
            </button>

            <button className="bg-green-500 text-white px-4 py-2">
                Submit
            </button>
        </form>
    );
}