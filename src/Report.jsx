import React, { forwardRef } from 'react';
import { MythrilAnalysis } from './MythrilAnalysis.jsx';
import { SlitherAnalysis } from './SlitherAnalysis.jsx';
import { AnalysisRegex } from './AnalysisRegex.jsx';

const Report = forwardRef(({ analysisResults }, ref) => {
  if (!analysisResults) return null;

  return (
    // ✅ attach `ref` to this div (a DOM element, not just the component)
    <div ref={ref} className="p-6">
      <h2 className="text-2xl font-bold mb-4">Audit Report</h2>
      <MythrilAnalysis data={analysisResults.mythril_analysis} />
      <SlitherAnalysis data={analysisResults.slither_analysis} />
      <AnalysisRegex data={analysisResults} />
      

    </div>
  );
});

export default Report;
