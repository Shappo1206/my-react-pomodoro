// src/components/layout/Header.jsx
import React from "react";

function Header() {
  return (
    <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border-2 border-gray-200">
      <div className="flex justify-between items-center">
        <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
          {/* 首頁 */}
          <a href="/" className="text-lg font-medium text-gray-700">首頁</a>
        </div>
        <div className="flex gap-4">
          <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
            {/* 紀錄 */}
            <a href="/" className="text-lg font-medium text-gray-700">紀錄</a>
          </div>
          <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
            {/* 設定 */}
            <a href="/" className="text-lg font-medium text-gray-700">設定</a>
          </div>
          <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
            {/* 會員 */}
            <a href="/" className="text-lg font-medium text-gray-700">會員</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;