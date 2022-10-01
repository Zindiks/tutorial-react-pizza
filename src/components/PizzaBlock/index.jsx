import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onClickPlus } from '../../redux/slices/cartSlice';

export default function PizzaBlock({ title, price, imageUrl, sizes, types, id }) {
  const typeNames = ['тонкое', 'традиционное'];
  const [sizeActive, setSizeActive] = useState(0);
  const [typeActive, setTypeActive] = useState('');
  const [currentPrice, setCurrentPrice] = useState(price);

  const dispatch = useDispatch();

  const currentPizza = `PID${id}-PZT${typeActive}-PZS${sizes[sizeActive]}`;

  useEffect(() => {
    let newPrice;
    switch (sizes[sizeActive]) {
      case 30:
        newPrice = price + 100;
        break;
      case 40:
        newPrice = price + 200;
        break;
      default:
        newPrice = price;
    }

    setCurrentPrice(newPrice);
  }, [currentPrice, sizeActive, price, sizes]);

  const onChangeSize = (index) => {
    setSizeActive(index);
  };

  const onClickAdd = () => {
    const item = {
      id,
      imageUrl,
      size: sizes[sizeActive],
      type: typeNames[typeActive],
      currentPizza,
      price: currentPrice,
      title,
    };
    dispatch(onClickPlus(item));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {/* <li className="active">тонкое</li>
          <li>традиционное</li> */}

          {types.map((type) => {
            return (
              <li
                key={type}
                onClick={() => setTypeActive(type)}
                className={typeActive === type ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => {
            return (
              <li
                key={index}
                onClick={() => onChangeSize(index)}
                className={sizeActive === index ? 'active' : ''}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{currentPrice} ₽</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span onClick={onClickAdd}>Добавить</span>
          {/* <i>2</i> */}
        </div>
      </div>
    </div>
  );
}
