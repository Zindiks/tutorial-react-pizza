import React from 'react';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

import Style from './pagination.module.scss';

export default function Pagination({ currentPage }) {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={Style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
}
