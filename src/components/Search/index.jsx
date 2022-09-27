/**
 * ! Creating Debounce
 * ? Как сделать?
 * * npm i lodash.debounce
 *
 */

import { useContext, useRef } from 'react';
import AppContext from '../../context';
import Style from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

export default function Search() {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(AppContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');

    /**
     *! after closing search not just clear search Value, but remain focus on input(bcs by default it's jumps off focus )
     */
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 480),
    [],
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={Style.root}>
      <div>
        <svg className={Style.icon} fill="#000000" viewBox="0 0 50 50" width="20px" height="20px">
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
        </svg>
      </div>
      <input
        ref={inputRef}
        className={Style.input}
        placeholder="Поиск пиццы"
        onChange={(e) => onChangeInput(e)}
        // onChange={() => testDebounce()}
        value={value}
      />

      {value && (
        <div>
          <svg
            onClick={onClickClear}
            className={Style.close}
            fill="#000000"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
          >
            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z" />
          </svg>
        </div>
      )}
    </div>
  );
}
