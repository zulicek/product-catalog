import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div data-testid="pagination" className="flex justify-center space-x-2">
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          {...(currentPage === 1
            ? { className: "text-gray-300 pointer-events-none" }
            : {})}
        >
          <LeftOutlined />
        </button>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          data-testid={`page-${page}`}
          key={page}
          onClick={() => onPageChange(page)}
          className={`md:px-4 py-2 rounded ${
            currentPage === page
              ? "md:bg-primary md:text-white"
              : "bg-gray-200 text-gray-700 hidden md:inline-block"
          }`}
        >
          {page}
        </button>
      ))}
      <span className="md:hidden py-2">/ {totalPages}</span>
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          {...(currentPage === totalPages
            ? { className: "text-gray-300 pointer-events-none" }
            : {})}
        >
          <RightOutlined />
        </button>
      )}
    </div>
  );
}
