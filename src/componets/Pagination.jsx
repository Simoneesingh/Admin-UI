// import { button } from "@mui/material";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const getPageNumber = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pag">
      <button
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? "disabled" : null}
      >
        {"<<"}
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : null}
      >
        {"<"}
      </button>

      {getPageNumber().map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? "active" : null}
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={currentPage === totalPages ? "disabled" : null}
      >
        {">"}
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        className={currentPage === totalPages ? "disabled" : null}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
