import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import AppContext from '../context';
import Pagination from '../components/Pagination';
import axios from 'axios';
import qs from 'qs';
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filterSlice);
  // const [pagination, setPagination] = useState(true);
  const { searchValue } = useContext(AppContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const queryString = qs.stringify({
      sort: sortType.sort,
      order: sortType.order,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
    console.log(queryString);
  }, [categoryId, sortType.sort, sortType.order, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sort === params.sort);
      const order = list.find((obj) => obj.order === params.order);
      console.log(params);

      dispatch(
        setFilters({
          categoryId,
          currentPage,
          sort,
          order,
        }),
      );
    }
  }, [categoryId, sortType.sort, sortType.order, currentPage]);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const sort = `&sortBy=${sortType.sort}`;
    const order = `&order=${sortType.order}`;
    const search = searchValue ? `&search=${searchValue}` : '';
    const current = `page=${currentPage}&limit=4`;

    axios
      .get(
        `https://632b84c01aabd8373987c21e.mockapi.io/items?${current}${category}${sort}${order}${search}`,
      )
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  // useEffect(() => {
  //   categoryId > 0 ? setPagination(false) : setPagination(true);
  //   categoryId > 0 && dispatch(setCurrentPage(1));
  //   searchValue && dispatch(setCurrentPage(1));
  // }, [categoryId, searchValue, dispatch]);

  return (
    <>
      <div className="content__top">
        <Categories activeIndex={categoryId} />

        <Sort selected={sortType} />
      </div>

      <h2 className="content__title">{isLoading ? 'Загрузка' : 'Все пиццы'}</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : data.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />;
            })}
      </div>

      {/*PAGINATION SECTION*/}
      {true && (
        <div className="pagination">
          <Pagination currentPage={currentPage} />
        </div>
      )}
    </>
  );
}
