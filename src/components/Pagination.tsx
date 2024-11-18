import React from "react";

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
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          data-testid={`page-${page}`}
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded ${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
