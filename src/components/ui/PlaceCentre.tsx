import React from "react";

const PlaceCentre = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 py-10 flex justify-center items-start">
    {children}
  </div>
);

export default PlaceCentre;
