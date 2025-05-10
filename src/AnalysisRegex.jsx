export const AnalysisRegex = ({ data }) => {
    const { title, description, overall_risk, risk_score, features } = data.features_detected;
  
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
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
  
        <div className="flex justify-between bg-gray-100 p-4 rounded-md">
          <div>
            <h4 className="text-lg font-medium text-gray-700">Overall Risk</h4>
            <p className="text-xl font-bold text-blue-600">{overall_risk}</p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700">Risk Score</h4>
            <p className="text-xl font-bold text-blue-600">{risk_score}</p>
          </div>
        </div>
  
        <div className="space-y-4">
          {features
            .filter((feature) => feature.present)
            .map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                  <span className={`${getSeverityColor(feature.severity)} font-semibold`}>
                    {feature.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                <p className="text-sm text-gray-400 mt-1 italic">{feature.risk}</p>
                <p className="mt-2 text-sm font-medium text-green-600">✅ Present</p>
  
                {feature.evidence && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-md">
                    <p className="text-xs text-gray-500 mb-1">
                      <strong>Line:</strong> {feature.evidence.line_number}
                    </p>
                    <pre className="text-xs text-gray-700 bg-white p-2 rounded overflow-x-auto whitespace-pre-wrap">
                      {feature.evidence.full_function}
                    </pre>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };
  