import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const impactColorMap = {
  High: "text-red-600 bg-red-100",
  Medium: "text-yellow-600 bg-yellow-100",
  Low: "text-green-600 bg-green-100",
  Informational: "text-blue-600 bg-blue-100",
};


const AccordionSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-t first:border-t-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left py-2 font-medium text-gray-800 hover:underline focus:outline-none"
        >
          {title}
        </button>
  
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="py-2 text-sm text-gray-700 whitespace-pre-wrap">{children}</div>
        </motion.div>
      </div>
    );
  };

  
  
export const SlitherAnalysis = ({ data }) => {
  const [detectors, setDetectors] = useState([]);

  useEffect(() => {
    if (data?.success && data?.results?.detectors) {
      setDetectors(data.results.detectors);
    }
  }, [data]);

  if (!data || !data.success || !data.results) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white text-red-600 shadow-xl rounded-2xl mt-8">
        <h2 className="text-xl font-bold">Slither Analysis</h2>
        <p>No results available or analysis failed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">🛡️ Slither Security Report</h2>

      {detectors.map((detector, index) => (
        <motion.div
          key={index}
          className="border rounded-xl p-5 bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-2 items-start md:items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{detector.check}</h3>
            <span className={`${impactColorMap[detector.impact] || "bg-gray-200 text-gray-800"}`}>
              {detector.impact} Impact
            </span>
          </div>

          <div className="text-gray-600 text-sm mb-2">
            <strong>Confidence:</strong> {detector.confidence}
          </div>

          <div className="w-full space-y-2">
            <AccordionSection title="View detailed vulnerability description">
                {detector.description}
            </AccordionSection>

            <AccordionSection title="Show impacted code locations">
                {detector.elements?.map((el, i) => (
                <div key={i} className="bg-white border p-2 rounded-md mb-2">
                    <div className="text-gray-800 font-semibold">{el.name}</div>
                    <div className="text-xs text-gray-500">
                    File: {el.source_mapping?.filename_short} | Lines: {el.source_mapping?.lines?.join(", ")}
                    </div>
                    {el.additional_fields?.underlying_type && (
                    <div className="mt-1 text-xs text-purple-600">
                        🔍 Type: {el.additional_fields.underlying_type}
                    </div>
                    )}
                </div>
                ))}
            </AccordionSection>
</div>

        </motion.div>
      ))}
    </div>
  );
};
