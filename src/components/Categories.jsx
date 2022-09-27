import { setCategoryId } from '../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

export default function Categories({ activeIndex }) {
  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(setCategoryId(index))}
              className={activeIndex === index ? 'active' : ''}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
