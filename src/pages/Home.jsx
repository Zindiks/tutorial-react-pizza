import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import AppContext from '../context';
import Pagination from '../components/Pagination';
import qs from 'qs';
import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filterSlice);
  const { data, status } = useSelector((state) => state.pizzasSlice);
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
  }, [categoryId, sortType.sort, sortType.order, currentPage, navigate]);

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
  }, [categoryId, sortType.sort, sortType.order, currentPage, dispatch]);

  useEffect(() => {
    const category = categoryId === 0 ? '' : `&category=${categoryId}`;
    const sort = `&sortBy=${sortType.sort}`;
    const order = `&order=${sortType.order}`;
    const search = searchValue ? `&search=${searchValue}` : '';
    const current = `page=${currentPage}&limit=4`;

    const getAllPizzas = async () => {
      console.log(123);
      try {
        dispatch(
          fetchPizzas({
            category,
            sort,
            order,
            search,
            current,
          }),
        );
      } catch (error) {
        console.log('ERROR', error);
        alert('Ошибка при получении данных');
      } finally {
      }

      window.scrollTo(0, 0);
    };
    getAllPizzas();
  }, [categoryId, sortType, searchValue, currentPage, dispatch]);

  const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = data.map((obj) => {
    return <PizzaBlock key={obj.id} {...obj} />;
  });

  return (
    <>
      <div className="content__top">
        <Categories activeIndex={categoryId} />

        <Sort selected={sortType} />
      </div>

      <h2 className="content__title">{status === 'loading' ? 'Загрузка' : 'Все пиццы'}</h2>
      <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>

      {/*PAGINATION SECTION*/}
      {true && (
        <div className="pagination">
          <Pagination currentPage={currentPage} />
        </div>
      )}
    </>
  );
}
