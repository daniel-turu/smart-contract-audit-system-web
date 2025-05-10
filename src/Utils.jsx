

// Button Component
// ActionButton.jsx
// ActionButton.jsx
export const ActionButton = ({ label, isSelected, onClick, disabled = false, isScanning = false }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full mt-6 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ease-in-out transform
          ${isSelected ? 'bg-blue-600 shadow-lg scale-105' : 'bg-gray-700'}
          ${!disabled ? 'hover:bg-blue-700 hover:shadow-xl hover:scale-105' : 'opacity-50 cursor-not-allowed'}
        `}
      >
        {isScanning ? 'Loading...' : label}
      </button>
    );
  };
  

// File Upload Component// FileUpload.jsx

export const FileUpload = ({ onChange, onSubmit, isScanning }) => {
  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-md space-y-4 animate-fadeIn">
      <label className="block text-gray-300 font-semibold">Upload Solidity File</label>
      <input
        type="file"
        accept=".sol"
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ActionButton onClick={onSubmit} disabled={isScanning} isScanning={isScanning} label="Submit Solidity File" />
    </div>
  );
};


// Token Transfer Component// TokenTransfers.jsx
export const TokenTransfers = ({
  address,
  onAddressChange,
  rangeOption,
  onRangeOptionChange,
  onSubmit,
  isScanning
}) => {
  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow-md space-y-4 animate-fadeIn">
      <div>
        <label className="block text-gray-300 font-semibold">Contract Address</label>
        <input
          type="text"
          placeholder="0x123...abc"
          value={address}
          onChange={onAddressChange}
          className="w-full mt-1 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="range" className="block text-gray-300 font-semibold">Select Time Range</label>
        <select
          id="range"
          value={rangeOption}
          onChange={onRangeOptionChange}
          className="w-full mt-1 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="last_1_hour">Last 1 Hour</option>
          <option value="last_2_hours">Last 2 Hours</option>
          <option value="last_5_hours">Last 5 Hours</option>
          <option value="last_24_hours">Last 24 Hours</option>
          <option value="last_7_days">Last 7 Days</option>
          <option value="last_30_days">Last 30 Days</option>
          <option value="last_90_days">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <ActionButton onClick={onSubmit} disabled={isScanning} isScanning={isScanning} label="Get Token Transfers" />
    </div>
  );
};



