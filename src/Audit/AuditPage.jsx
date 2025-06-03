import React, { useState } from "react";
import AuditForm from "./AuditForm";
import AuditResults from "./AuditResults";

const AuditPage = () => {
  const [resultData, setResultData] = useState(null);

  return (
    <div className="min-h-screen bg-dark-bg text-white font-ubuntu p-6">
      <AuditForm onResults={setResultData} />
      {resultData && (
        <div className="mt-10">
          <AuditResults
            slitherData={resultData?.slither_data}
            mythrilData={resultData?.mythril_data}
            gptReport={resultData?.report}
          />
        </div>
      )}
    </div>
  );
};

export default AuditPage;
