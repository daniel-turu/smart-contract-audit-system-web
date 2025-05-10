export const MythrilAnalysis = ({ data }) => {
    
    if (!data || !data.issues || !Array.isArray(data.issues)) {
        return (
          <div className="max-w-4xl mx-auto p-6 bg-white text-red-600 shadow-xl rounded-2xl mt-8">
            <h2 className="text-xl font-bold">Mythril Analysis</h2>
            <p>No results available or analysis failed.</p>
          </div>
        );
      }
    
      const { issues, analysis_summary, source_type } = data;
    
    const getSeverityColor = (severity) => {
      switch (severity) {
        case 'High': return 'text-red-500';
        case 'Medium': return 'text-yellow-500';
        case 'Low': return 'text-green-500';
        default: return 'text-gray-500';
      }
    };
  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mythril Analysis</h2>
          <p className="text-gray-600 mt-2">Source Type: {source_type}</p>
        </div>
  
        <div className="bg-gray-100 p-4 rounded-md">
          <h4 className="text-lg font-medium text-gray-700">Summary</h4>
          <p className="text-sm text-gray-600 mt-1">{analysis_summary}</p>
        </div>
  
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{issue.title}</h3>
                <span className={`${getSeverityColor(issue.severity)} font-semibold`}>
                  {issue.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
              <p className="text-sm text-gray-400 mt-1 italic">{issue.function}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  