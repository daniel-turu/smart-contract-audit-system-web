import React, { useState } from "react";
import axios from "axios";

const NETWORKS = [
  { key: "eth", name: "Ethereum" },
  { key: "bnb", name: "Binance Smart Chain" },
  { key: "polygon", name: "Polygon" },
];

const AuditForm = ({ onResults }) => {
  const [form, setForm] = useState({
    contract_address: "",
    network: "eth",
    include_slither: true,
    include_mythril: false,
    include_ai_assistant: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("http://128.140.92.117:7000/test/", form); // Update with your actual endpoint
      onResults(res.data);
      
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark-header p-6 rounded-xl shadow-xl max-w-2xl mx-auto text-white space-y-4"
    >
      <h2 className="text-2xl font-bold">Contract Audit Request</h2>

      <div className="space-y-1">
        <label htmlFor="contract_address" className="block text-sm">
          Contract Address
        </label>
        <input
          type="text"
          id="contract_address"
          name="contract_address"
          value={form.contract_address}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="network" className="block text-sm">
          Network
        </label>
        <select
          id="network"
          name="network"
          value={form.network}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          {NETWORKS.map((net) => (
            <option key={net.key} value={net.key}>
              {net.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="include_slither"
            checked={form.include_slither}
            onChange={handleChange}
            className="form-checkbox"
            hidden
          />
          {/* Slither */}
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="include_mythril"
            checked={form.include_mythril}
            onChange={handleChange}
            className="form-checkbox"
            hidden
          />
          {/* Mythril */}
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="include_ai_assistant"
            hidden
            checked={form.include_ai_assistant}
            onChange={handleChange}
            className="form-checkbox"
          />
          {/* GPT Assistant */}
        </label>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Submit for Audit"}
      </button>
    </form>
  );
};

export default AuditForm;
