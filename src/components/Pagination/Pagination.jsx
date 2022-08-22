import styles from './Pagination.module.scss';

export function Pagination({ count, perPage, pageNumber, setPageNumber, className = [] }) {
  const maxPageNumber = Math.ceil(count / perPage);

  const generateButton = (page, isActive, isDisabled, i) => {
    const onPageClick = () => {
      setPageNumber(page);
    }
  
    return (
      <li key={i}>
        <button
          className={isActive ? styles.active : null}
          disabled={isDisabled}
          onClick={onPageClick}>
          {page}
        </button>
      </li>
    )
  };
  
  const makePager = (maxPage, currentPage) => {
    if (maxPage <= 6) {
      return Array.from({ length: maxPage }, (v, i) => i + 1).map((el, i) => generateButton(el, el === currentPage, false, el));
    }
  
    const ellipsisLeft = currentPage > 3;
    const ellipsisRight = currentPage < maxPage - 2;
    const start = ellipsisLeft ? (ellipsisRight ? currentPage - 1 : maxPage - 4) : 3;
    const visablePages = [
      1,
      ellipsisLeft ? '...' : 2,
      start,
      start + 1,
      start + 2,
      ellipsisRight ? '...' : (maxPage - 1),
      maxPage
    ];
    
    return visablePages.map((el, i) => generateButton(el, el === currentPage, el === '...', i));
  };

  return (
    <div className={[...className, styles.pagination].join(' ')}>
      {makePager(maxPageNumber, pageNumber)}
    </div>
  );
}