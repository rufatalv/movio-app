'use client'
import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  onPageChange: (newPage: number) => void;
  currentPage: number;
  maxPageLinks?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  currentPage,
  maxPageLinks = 5,
}) => {
  const [showStartEllipsis, setShowStartEllipsis] = useState(false);
  const [showEndEllipsis, setShowEndEllipsis] = useState(false);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const startPageIndex = Math.max(currentPage - Math.floor(maxPageLinks / 2), 1);
  const endPageIndex = Math.min(
    startPageIndex + maxPageLinks - 1,
    totalPages
  );

  if (totalPages <= maxPageLinks) {
    return (
      <div className="flex justify-center space-x-2">
        {pageNumbers.map((pageNumber) => (
          <div
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`${
              pageNumber === currentPage
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            } px-3 cursor-pointer py-2 rounded-md`}
          >
            <span>{pageNumber}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-2">
      {startPageIndex > 1 && (
        <div
          key={1}
          onClick={() => handlePageChange(1)}
          className="bg-gray-200 text-gray-700 px-3 cursor-pointer py-2 rounded-md"
        >
          <span>1</span>
        </div>
      )}
      {startPageIndex > 2 && (
        <div className="px-3 py-2">...</div>
      )}
      {pageNumbers.slice(startPageIndex - 1, endPageIndex).map((pageNumber) => (
        <div
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`${
            pageNumber === currentPage
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } px-3 cursor-pointer py-2 rounded-md`}
        >
          <span>{pageNumber}</span>
        </div>
      ))}
      {endPageIndex < totalPages - 1 && (
        <div className="px-3 py-2">...</div>
      )}
      {endPageIndex < totalPages && (
        <div
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="bg-gray-200 text-gray-700 px-3 cursor-pointer py-2 rounded-md"
        >
          <span>{totalPages}</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
