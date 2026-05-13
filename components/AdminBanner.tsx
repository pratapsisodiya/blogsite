"use client";

import React from "react";

const AdminBanner = () => {
  return (
    <div className="bg-white border-b border-gray-100 py-2 px-4 flex items-center justify-center space-x-4 text-[11px] md:text-xs">
      <div className="flex items-center space-x-2 text-gray-500">

        <span>Upgrade your plan to remove the banner and unlock more features, from ₹200/month</span>
      </div>
      <button className="bg-black text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-all">
        Upgrade
      </button>
    </div>
  );
};

export default AdminBanner;
