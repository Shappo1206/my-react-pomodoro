// src/components/Header.js

import React from "react";

export default function Header() {
  return (
    <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border-2 border-gray-200">
      <div className="flex justify-between items-center">
        <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
          <span className="text-lg font-medium text-gray-700">首頁</span>
        </div>
        <div className="flex gap-4">
          <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
            <span className="text-lg font-medium text-gray-700">紀錄</span>
          </div>
          <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
            <span className="text-lg font-medium text-gray-700">設定</span>
          </div>
          <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
            <span className="text-lg font-medium text-gray-700">會員</span>
          </div>
        </div>
      </div>
    </div>
  );
}
