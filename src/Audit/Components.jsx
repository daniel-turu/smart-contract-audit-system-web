import { useState } from "react";


// Card component
export const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl shadow-md border border-gray-700 ${className}`}>
    {children}
  </div>
);

// CardContent component
export const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const Badge = ({ children, className = "" }) => (
  <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${className}`}>
    {children}
  </span>
);



// Wrapper
export const Tabs = ({ defaultValue, children }) => {
  const [active, setActive] = useState(defaultValue);

  const mapped = React.Children.map(children, child => {
    if (!child.props) return child;

    if (child.type === TabsList) {
      return React.cloneElement(child, { active, setActive });
    }

    if (child.type === TabsContent && child.props.value === active) {
      return child;
    }

    return null;
  });

  return <div>{mapped}</div>;
};

// Tab List
export const TabsList = ({ children, active, setActive, className = "" }) => (
  <div className={`inline-flex rounded-md overflow-hidden ${className}`}>
    {React.Children.map(children, child => {
      if (!child.props) return child;
      return React.cloneElement(child, {
        active,
        setActive,
        isActive: child.props.value === active,
      });
    })}
  </div>
);

// Tab Trigger
export const TabsTrigger = ({ value, children, setActive, isActive }) => (
  <button
    onClick={() => setActive(value)}
    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
    }`}
  >
    {children}
  </button>
);

// Tab Content
export const TabsContent = ({ children }) => (
  <div className="mt-4">{children}</div>
);
