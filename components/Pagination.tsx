"use client";
import React, { useState } from "react";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // You can implement a callback function here to fetch data for the new page from your API.
  };

  return (
    <div className="flex justify-center space-x-2">
      {pageNumbers.map((pageNumber) => (
        <div
          key={pageNumber}
          className={`${
            pageNumber === currentPage
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          } px-3 py-2 rounded-md`}>
          <span className="cursor-pointer" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</span>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
