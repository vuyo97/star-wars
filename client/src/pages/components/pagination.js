import React, {useEffect,useState} from 'react';
import ReactPaginate from 'react-paginate';
import People from './people';


function Items({ peopleData,modalClick }) {
  return (
    <>
    <div className="container">
    {peopleData.map((people,i) => (
    <People people={people} key={i} onClick={modalClick}/> 
    ))}
    </div>
    </>
  );
}
  
  const Pagination = ({ itemsPerPage, data ,handleModal }) => {
    const [people, setPeople] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const items = data;

    useEffect(() => {
    //  console.log(data.getPeople);
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setPeople(items.getPeople.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.getPeople.length / itemsPerPage));
    }, [itemOffset, itemsPerPage,items.getPeople]);
  
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % items.getPeople.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items peopleData={people} modalClick={handleModal}/>
        <ReactPaginate
          nextLabel="next "
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="prev"
          pageClassName={`paginationItem ${itemOffset === people ? 'active' : null}`}
          pageLinkClassName="span"
          previousClassName={`prev ${itemOffset === 1 ? 'disabled' : ''}`}
          previousLinkClassName=""
          nextClassName={`next ${itemOffset === people ? 'disabled' : ''}`}
          nextLinkClassName=""
          breakLabel="..."
          breakClassName="paginationItem"
          breakLinkClassName="span"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  export default Pagination;
