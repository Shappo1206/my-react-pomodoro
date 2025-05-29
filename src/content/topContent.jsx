function topContent() {
  return (
    <>
      {/* ============ 頂部導航區塊 (Header Navigation Block) ============ */}
      <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border-2 border-gray-200">
        <div className="flex justify-between items-center">
          {/* 左側 - 首頁按鈕 */}
          <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
            <span className="text-lg font-medium text-red-700">首頁</span>
          </div>

          {/* 右側 - 功能按鈕群組 (紀錄、設定、會員) */}
          <div className="flex gap-4">
            <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-lg font-medium text-gray-700">紀錄</span>
            </div>
            <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-lg font-medium text-gray-700">設定</span>
            </div>
            <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-lg font-medium text-gray-700">會員</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default mainContent;
