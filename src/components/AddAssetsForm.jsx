"use client";

import React, { useState } from "react";

export default function AddAssetForm() {
  const [formData, setFormData] = useState({
    asset_name: "",
    asset_type: "",
    price: "",
    model: "",
    buying_date: "",
    warranty_available: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Asset added successfully!");
        setFormData({
          asset_name: "",
          asset_type: "",
          price: "",
          model: "",
          buying_date: "",
          warranty_available: "",
        });
      } else {
        setMessage("Failed to add asset.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-[#BE1E2D] mb-4">Add New Asset</h2>
      {message && <p className="text-center text-green-600 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="asset_name" className="block font-medium text-gray-700">
              Asset Name
            </label>
            <input
              type="text"
              name="asset_name"
              placeholder="Asset Name"
              value={formData.asset_name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="asset_type" className="block font-medium text-gray-700">
              Asset Type
            </label>
            <select
              name="asset_type"
              value={formData.asset_type}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select Asset Type</option>
              <option value="laptop">Laptop</option>
              <option value="cpu">CPU</option>
              <option value="monitor">Monitor</option>
              <option value="hdd">HDD</option>
              <option value="sdd">SDD</option>
              <option value="wifi router">WiFi Router</option>
              <option value="pendrive">Pendrive</option>
              <option value="printer">Printer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="model" className="block font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="buying_date" className="block font-medium text-gray-700">
              Buying Date
            </label>
            <input
              type="date"
              name="buying_date"
              value={formData.buying_date}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="warranty_available" className="block font-medium text-gray-700">
              Warranty Available?
            </label>
            <select
              name="warranty_available"
              value={formData.warranty_available}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Warranty Available?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#BE1E2D] text-white px-6 py-2 rounded-md hover:bg-[#A11A25] transition-all duration-200"
          >
            {loading ? "Adding..." : "Add Asset"}
          </button>

          <button
            type="reset"
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-all duration-200"
            onClick={() =>
              setFormData({
                asset_name: "",
                asset_type: "",
                price: "",
                model: "",
                buying_date: "",
                warranty_available: "",
              })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
