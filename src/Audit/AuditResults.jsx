import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, Badge } from "./Components";

const severityColor = {
  Low: "bg-green-500",
  Medium: "bg-yellow-500",
  High: "bg-red-500",
  Critical: "bg-pink-700"
};

const StaticToolBlock = ({ data }) => (
  <div className="space-y-4">
    {data?.length === 0 ? (
      <p className="text-gray-400 italic">No issues found.</p>
    ) : (
      data?.map((item, idx) => (
        <Card key={idx} className="bg-dark-header text-white">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <Badge className={`${severityColor[item.severity] || "bg-gray-600"}`}>
                {item.severity}
              </Badge>
            </div>
            <p>{item.description}</p>
            <div className="text-sm text-gray-300">
              <p>Function: {item.function}</p>
              <p>Line: {item.line}</p>
              <p>SWC ID: {item.swc_id}</p>
            </div>
          </CardContent>
        </Card>
      ))
    )}
  </div>
);

const AuditResults = ({ slitherData, mythrilData, gptReport }) => {


  const hasGPT = typeof gptReport === "string" && gptReport.trim() !== "";
  const hasSlither = Array.isArray(slitherData) && slitherData.length > 0;
  const hasMythril = Array.isArray(mythrilData) && mythrilData.length > 0;

  console.log("hasGPT:", hasGPT);
  console.log("hasSlither:", hasSlither);
  console.log("hasMythril:", hasMythril);


  // Determine default active view
  const firstAvailable = hasGPT
    ? "gpt"
    : hasSlither
    ? "slither"
    : hasMythril
    ? "mythril"
    : null;

  const [active, setActive] = useState(firstAvailable);

  if (!firstAvailable) {
    return (
      <div className="text-center text-gray-400 mt-6">
        <p>No audit data available to display.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 text-white bg-dark-bg font-ubuntu">
      <h1 className="text-3xl font-bold mb-6">Smart Contract Audit Results</h1>

      {/* Button group for switching */}
      <div className="inline-flex mb-6 space-x-2 bg-gray-800 rounded-md overflow-hidden">
        {hasGPT && (
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              active === "gpt"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActive("gpt")}
          >
            Audit Report
          </button>
        )}
        {hasSlither && (
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              active === "slither"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActive("slither")}
          >
            Slither
          </button>
        )}
        {hasMythril && (
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              active === "mythril"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActive("mythril")}
          >
            Mythril
          </button>
        )}
      </div>

      {/* Content based on active */}
      <div>
        {active === "gpt" && (
          <Card className="bg-dark-header text-white">
            <CardContent className="p-4 prose prose-invert">
              <ReactMarkdown
                  components={{
  h1: ({ node, ...props }) => (
    <h1 className="text-3xl font-bold text-white mt-6 mb-4 border-b border-gray-700 pb-2" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-2xl font-semibold text-blue-400 mt-5 mb-3" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-medium text-blue-300 mt-4 mb-2" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="text-gray-200 leading-relaxed mb-4" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    return !inline ? (
      <pre className="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto text-sm my-4">
        <code>{children}</code>
      </pre>
    ) : (
      <code className="bg-gray-800 text-yellow-300 px-1.5 py-0.5 rounded-md text-sm font-mono">
        {children}
      </code>
    );
  },
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 pr-2 py-2 italic text-blue-200 bg-gray-800 rounded-md my-4" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li className="ml-6 list-disc text-gray-300 leading-relaxed mb-2" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="ml-4 mb-4 space-y-1" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="ml-4 mb-4 list-decimal space-y-1 text-gray-300" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a className="text-blue-400 underline hover:text-blue-300" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  strong: ({ node, ...props }) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: ({ node, ...props }) => (
    <em className="italic text-gray-300" {...props} />
  ),
  hr: () => <hr className="border-gray-700 my-6" />,
}}

                >
                {gptReport}
              </ReactMarkdown>
            </CardContent>
          </Card>
        )}

        {active === "slither" && <StaticToolBlock data={slitherData} />}

        {active === "mythril" && <StaticToolBlock data={mythrilData} />}
      </div>
    </div>
  );
};

export default AuditResults;
