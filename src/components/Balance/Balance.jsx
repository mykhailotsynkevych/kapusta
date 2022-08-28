import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBalance } from 'redux/balance/balanceOperations';
import s from './Balance.module.css';
import { BalanceModal } from 'components/BalanceModal/BalanceModal';
import { Link } from 'react-router-dom';
import Sprite from '../../assets/images/svg/sprite.svg';

// import useWindowDimensions from '../../hooks/useWindowDimensions';

export const Balance = () => {
  let balance = useSelector(state => state.balance.balance);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleChange = e => {
    const { value } = e.target;

    setInput(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (input !== '' || balance !== 0) return dispatch(changeBalance({ newBalance: input }));

    alert(' сумма повинна бути більще 0 !!!');
  };

  return (
    <>
      <form className={s.balance} onSubmit={handleSubmit}>
        <h3 className={s.title}>Balance:</h3>
        <label className={s.label}>
          <input
            type="text"
            className={s.input}
            value={input === '' && typeof input !== 'number' ? balance : input}
            decimalscale={1}
            maxLength={9}
            onChange={handleChange}
          />
          <span className={s.money}>UAH</span>
          {input === '' && balance === 0 ? <BalanceModal /> : !(<BalanceModal />)}
        </label>

        <button className={s.button} type="submit">
          CONFIRM
        </button>

        <Link className={s.reportsLinkWrapper} to="/reports">
          <span className={s.reports}>Reports</span>
          <svg className={s.iconReports} width="24" height="24">
            <use href={`${Sprite}#icon-reports`}></use>
          </svg>
        </Link>
      </form>
    </>
  );
};
