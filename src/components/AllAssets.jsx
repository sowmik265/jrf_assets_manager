"use client"

import React, { useState, useEffect } from "react";

export default function AllAssetsTable() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('asset_name');
  const [order, setOrder] = useState('ASC');

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/assets?page=${page}&limit=10&sortBy=${sortBy}&order=${order}`
        );
        const data = await response.json();
        
        // Ensure that the assets data is in the expected format
        if (data && Array.isArray(data.assets)) {
          setAssets(data.assets);
          setTotalPages(data.totalPages);
        } else {
          setAssets([]); // If no assets found, set as empty array
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, [page, sortBy, order]);

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    setOrder(order === 'ASC' ? 'DESC' : 'ASC'); // Toggle sorting order
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-[#BE1E2D] mb-4">All Assets</h2>

      {/* Sorting Options */}
      <div className="mb-4">
        <label htmlFor="sortBy" className="mr-2">Sort By:</label>
        <select
          id="sortBy"
          onChange={handleSortChange}
          value={sortBy}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="asset_name">Asset Name</option>
          <option value="asset_type">Asset Type</option>
          <option value="price">Price</option>
          <option value="buying_date">Buying Date</option>
        </select>
      </div>

      {/* Asset Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Asset Name</th>
            <th className="border px-4 py-2">Asset Type</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Buying Date</th>
            <th className="border px-4 py-2">Warranty</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            assets.length > 0 ? (
              assets.map((asset) => (
                <tr key={asset.asset_id}>
                  <td className="border px-4 py-2">{asset.asset_name}</td>
                  <td className="border px-4 py-2">{asset.asset_type}</td>
                  <td className="border px-4 py-2">{asset.price}</td>
                  <td className="border px-4 py-2">{asset.model || 'N/A'}</td>
                  <td className="border px-4 py-2">{asset.buying_date}</td>
                  <td className="border px-4 py-2">{asset.warranty_available ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No assets available</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
