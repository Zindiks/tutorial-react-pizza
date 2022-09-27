import React from 'react';

export default function NotFound() {
  return (
    <div className="container--cart">
      <div className="cart cart--empty">
        <h2>
          Ууппс..Страница не найдена <icon>😕</icon>
        </h2>
        <p>
          Увы но страница которую вы ищете, не существует =(
          <br />
          Для того, чтобы вернуться, перейди на главную страницу.
        </p>
        <img src="/img/empty-cart.png" alt="Empty cart" />
        <a href="/" className="button button--black">
          <span>Вернуться назад</span>
        </a>
      </div>
    </div>
  );
}
