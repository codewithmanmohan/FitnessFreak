import React from "react";

export default function ViewContainer({ children, className }) {
  return (
    <div className="w-full px-0">
      <div
        className={`
    max-w-full mx-auto px-4 sm:px-6 lg:px-8
    ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
