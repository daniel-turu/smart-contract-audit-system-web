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

  return (
    <div className="report-container">
      <h2>
        Token Report: {data.metadata.name} ({data.metadata.symbol})
      </h2>

      <div className="metadata">
        <h3>Metadata</h3>
        <ul>
          <li>Total Supply: {data.metadata.total_supply}</li>
          <li>Creator: {data.metadata.creator}</li>
          <li>Decimals: {data.metadata.decimals}</li>
          <li>Token Type: {data.token_type}</li>
        </ul>
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
    </div>
  );
};

export default TokenReport;
