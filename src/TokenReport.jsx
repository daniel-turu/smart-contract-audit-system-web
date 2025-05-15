import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TokenReport = ({ data }) => {
  const transfers = data.transfers || [];

  const labels = transfers.map(t =>
    new Date(t.timestamp * 1000).toLocaleString()
  );

  const transferAmounts = transfers.map(t =>
    t.value ? parseFloat(t.value) / 10 ** data.metadata.decimals : 0
  );
  const gasUsed = transfers.map(t => t.gasUsed ?? 0);
  const gasCosts = transfers.map(t => t.totalGasCostETH ?? 0);

  const [showGasUsed, setShowGasUsed] = useState(true);
  const [showTransferValue, setShowTransferValue] = useState(true);
  const [showGasCost, setShowGasCost] = useState(true);

  const totalTransferred = transferAmounts.reduce((a, b) => a + b, 0);
  const totalGasUsed = gasUsed.reduce((a, b) => a + b, 0);
  // const totalGasCost = gasCosts.reduce((a, b) => a + b, 0);
  const totalGasCost = gasCosts.map(val => parseFloat(val)).reduce((acc, val) => acc + val, 0);
  const gasUsedData = {
    labels,
    datasets: [
      {
        label: "Gas Used",
        data: gasUsed,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const transferValueData = {
    labels,
    datasets: [
      {
        label: "Transfer Value (USDT)",
        data: transferAmounts,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderWidth: 1,
      },
    ],
  };

  const gasCostData = {
    labels,
    datasets: [
      {
        label: "Gas Cost (ETH)",
        data: gasCosts,
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
      },
    ],
  };




const WhaleList = ({ whales }) => {
  if (!whales || whales.length === 0) return null;

  return (
    <div className="mt-10 p-6 rounded-xl bg-[#1f1f1f] text-white shadow-inner">
      <h3 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        🐋 Top Whales
      </h3>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {whales.map((whale, idx) => (
          <div
            key={idx}
            className="bg-[#2a2a2a] rounded-xl p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 border border-gray-700"
          >
            <h4 className="text-lg font-semibold text-indigo-400 mb-2 flex justify-between">
              <span>{whale.label}</span>
              <span className="text-sm text-gray-400">#{idx + 1}</span>
            </h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                <span className="font-semibold text-gray-400">Address:</span>{" "}
                <span className="block truncate">{whale.address}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-400">Balance:</span>{" "}
                {(parseFloat(whale.balance) / 10 ** data.metadata.decimals).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
              <p>
                <span className="font-semibold text-gray-400">% of Supply:</span>{" "}
                {(whale.percent_of_supply * 100).toFixed(4)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};





  return (
    <div className="report-container">
     <h2 className="text-2xl md:text-3xl font-bold font-ubuntu text-white mb-4">
      Token Report: <span className="text-green-400">{data.metadata.name}</span> 
      <span className="text-gray-400"> ({data.metadata.symbol})</span>
    </h2>


      <div className="metadata p-4 rounded-2xl bg-dark-bg text-white shadow-md space-y-4 font-ubuntu">
        <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Token Metadata</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Total Supply</p>
            <p className="font-medium">{data.metadata.total_supply}</p>
          </div>
          <div>
            <p className="text-gray-400">Decimals</p>
            <p className="font-medium">{data.metadata.decimals}</p>
          </div>
          <div>
            <p className="text-gray-400">Token Type</p>
            <p className="font-medium">{data.token_type}</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h4 className="text-lg font-semibold mb-2 text-white">Contract Creator</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Contract Address</p>
              <p className="font-mono break-all text-white">{data.metadata.creator.contract_address}</p>
            </div>
            <div>
              <p className="text-gray-400">Creator Address</p>
              <p className="font-mono break-all text-white">{data.metadata.creator.creator_address}</p>
            </div>
            <div>
              <p className="text-gray-400">Transaction Hash</p>
              <p className="font-mono break-all text-white">{data.metadata.creator.creation_tx_hash}</p>
            </div>
            <div>
              <p className="text-gray-400">Block Number</p>
              <p className="font-medium">{data.metadata.creator.creation_block}</p>
            </div>
            <div>
              <p className="text-gray-400">Timestamp</p>
              <p className="font-medium">{data.metadata.creator.creation_timestamp}</p>
            </div>
            <div>
              <p className="text-gray-400">Gas Used</p>
              <p className="font-medium">{data.metadata.creator.gas_used.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Gas Price (Wei)</p>
              <p className="font-medium">{data.metadata.creator.gas_price_wei.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Deployment Cost (ETH)</p>
              <p className="font-medium">{data.metadata.creator.deployment_cost_eth}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-400 mb-1">Contract Bytecode (truncated)</p>
            <div className="bg-[#1e1e1e] p-2 rounded text-xs font-mono break-all text-green-300 overflow-x-auto">
              {data.metadata.creator.contract_creation_code}
            </div>
          </div>
        </div>
      </div>



      <div className="insight">
        <h3>Transfer Insights</h3>
        <ul>
          <li>Total Transfer Amount (USDT): {totalTransferred.toFixed(2)}</li>
           <li>Total Gas Used: {totalGasUsed.toLocaleString()}</li>
          <li>Total Gas Cost (ETH): {totalGasCost.toFixed(6)}</li>
        </ul>
      </div>

      <div className="controls">
        <h3>Chart Controls</h3>
        <label>
          <input
            type="checkbox"
            checked={showGasUsed}
            onChange={() => setShowGasUsed(!showGasUsed)}
          />
          Show Gas Used
        </label>
        <label>
          <input
            type="checkbox"
            checked={showTransferValue}
            onChange={() => setShowTransferValue(!showTransferValue)}
          />
          Show Transfer Value
        </label>
        <label>
          <input
            type="checkbox"
            checked={showGasCost}
            onChange={() => setShowGasCost(!showGasCost)}
          />
          Show Gas Cost
        </label>
      </div>

      <div className="charts">
        {showGasUsed && (
          <div className="chart">
            <h4>Gas Used Over Time</h4>
            <Line data={gasUsedData} />
          </div>
        )}

        {showTransferValue && (
          <div className="chart">
            <h4>Transfer Value (USDT) Over Time</h4>
            <Bar data={transferValueData} />
          </div>
        )}

        {showGasCost && (
          <div className="chart">
            <h4>Gas Cost (ETH) Over Time</h4>
            <Line data={gasCostData} />
          </div>
        )}
      </div>


      <WhaleList whales={data.whales} />

    </div>
  );
};

export default TokenReport;





