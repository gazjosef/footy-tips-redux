import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const SelectBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 w-full">{children}</div>
);

export const Select = ({ children, ...props }: SelectProps) => (
  <select
    {...props}
    className="border border-gray-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </select>
);
