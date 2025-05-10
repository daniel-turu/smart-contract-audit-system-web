import { useState, useRef } from 'react';
import { ActionButton, FileUpload, TokenTransfers } from './Utils.jsx';
import { AnalysisRegex } from './AnalysisRegex.jsx';
import { MythrilAnalysis } from './MythrilAnalysis.jsx';
import { SlitherAnalysis } from './SlitherAnalysis.jsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Report from './Report.jsx';
import TokenReport from './TokenReport.jsx';


function App() {
  const reportRef = useRef();

  const [contractData, setContractData] = useState({
    file: null,
    address: '',
    rangeOption: 'last_7_days',
  });
  const [status, setStatus] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [tokenResults, setTokenResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleFileChange = (e) => {
    setContractData({ ...contractData, file: e.target.files[0] });
  };

  const handleAddressChange = (e) => {
    setContractData({ ...contractData, address: e.target.value });
  };

  const handleRangeOptionChange = (e) => {
    setContractData({ ...contractData, rangeOption: e.target.value });
  };

  const handleSubmit = async (type) => {
    setIsScanning(true);
    setStatus('Scanning in progress...');

    try {
      const formData = new FormData();
      // const baseUrl = 'http://127.0.0.1:8000';
      const baseUrl = window.location.origin;
      let url = '';
    
      if (type === 'file') {
        if (!contractData.file) return setStatus('Please upload a Solidity file.');
        formData.append('solidity_file', contractData.file);
        url = `${baseUrl}/analyze/file/`;
      } else if (type === 'token-transfers') {
        if (!contractData.address) return setStatus('Please enter a contract address.');
        formData.append('contract_address', contractData.address);
        formData.append('range', contractData.rangeOption);
        url = `${baseUrl}/analyze/token-transfers/`;
      }

      const response = await fetch(url, { method: 'POST', body: formData });
      const result = await response.json();

      if (response.ok) {

        if (type === 'file') {
          setAnalysisResults(result);
        } else if (type === 'token-transfers') {
          setAnalysisResults(result.contract_analyzed);
          setTokenResults(result);
        }
        
        setStatus('Scan complete!');
      } else {
        setStatus(`Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsScanning(false);
    }
  };

  // Updated handlePrint function using html2canvas and jsPDF
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    const contentToPrint = reportRef.current;
  
    if (!contentToPrint) {
      console.error('No report content to print!');
      return;
    }
  
    // Create a copy of the report content
    const reportHtml = contentToPrint.outerHTML;
  
    // Open the print window and write the report content into it
    printWindow.document.write('<html><head><title>Print Report</title>');
    
    // Adding print-specific styles
    printWindow.document.write(`
      <style>
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .main-comp, .main-comp * {
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          body, html {
            margin: 0;
            padding: 0;
          }
          .bg-dark-bg, .bg-dark-header {
            background-color: white !important;
          }
        }
      </style>
    `);
    
    printWindow.document.write('</head><body>');
    printWindow.document.write(reportHtml);
    printWindow.document.write('</body></html>');
    
    // Wait for the content to fully load before printing
    printWindow.document.close();
  
    // Wait for a moment to ensure the content is fully loaded and then print
    setTimeout(() => {
      printWindow.print(); // Trigger the native print dialog
      printWindow.close(); // Close the window after printing
    }, 500); // You can adjust the timeout if needed
  };
  
  
  

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white font-ubuntu min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <header className="text-center bg-gray-800 p-10 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold mb-2">Web3 Contract Audit</h1>
          <p className="text-lg text-gray-300">Analyze smart contracts via file or address lookup.</p>

          <button
            onClick={handlePrint}
            disabled={!analysisResults}
            className={`mt-4 px-4 py-2 rounded ${
              analysisResults
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-500 cursor-not-allowed text-gray-300'
            }`}
          >
            🖨️ Print or Save as PDF
          </button>
        </header>

        <main className="mt-10 space-y-6">
          <div className="flex justify-center gap-4">
            <ActionButton
              label="Analyze File"
              isSelected={selectedOption === 'file'}
              onClick={() => setSelectedOption('file')}
            />
            <ActionButton
              label="Token Transfers"
              isSelected={selectedOption === 'token-transfers'}
              onClick={() => setSelectedOption('token-transfers')}
            />
          </div>

          {selectedOption === 'file' && (
            <div className="animate-fadeIn">
              <FileUpload
                onChange={handleFileChange}
                onSubmit={() => handleSubmit('file')}
                isScanning={isScanning}
              />
            </div>
          )}

          {selectedOption === 'token-transfers' && (
            <div className="animate-fadeIn">
              <TokenTransfers
                address={contractData.address}
                onAddressChange={handleAddressChange}
                rangeOption={contractData.rangeOption}
                onRangeOptionChange={handleRangeOptionChange}
                onSubmit={() => handleSubmit('token-transfers')}
                isScanning={isScanning}
              />
            </div>
          )}

          {status && (
            <div className="text-center text-md bg-gray-700 rounded-lg py-3 px-4 mt-4 shadow-md">
              {status}
            </div>
          )}



            {tokenResults && (
              <TokenReport data={tokenResults} />
            )}

          {analysisResults && !isScanning && (
            <div className='main-comp'><Report ref={reportRef} analysisResults={analysisResults} /></div>
          )}



     

           {/* {tokenResults && !isScanning && (
            <div className="bg-white text-gray-800 mt-6 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Analysis Results:</h3>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(tokenResults, null, 2)}
              </pre>
            </div>
          )} */}

          
        </main>
      </div>
    </div>
  );
}

export default App;

