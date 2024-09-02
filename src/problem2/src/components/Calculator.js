import { useEffect, useState } from "react";
import "./Calculator.css";

import Icons from "../img/Icons.svg";

function Calculator() {
  const [swapData, setSwapData] = useState([]);
  const [inputSelect, setInputSelect] = useState("");
  const [outputSelect, setOutputSelect] = useState("");
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInputSelect, setAmountInputSelect] = useState(true);

  let inputAmount, outputAmount;
  if (amountInputSelect) {
    inputAmount = amount;
    outputAmount = (amount * exchangeRate).toFixed(9);
  } else {
    outputAmount = amount;
    inputAmount = (amount / exchangeRate).toFixed(9);
  }

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      // remove all dublicates
      .then((data) =>
        data.filter(
          (obj1, i, arr) =>
            arr.findIndex((obj2) => obj2.currency === obj1.currency) === i
        )
      )
      .then((data) => {
        setSwapData(data);
        setInputSelect(data[0].currency);
        setOutputSelect(data[0].currency);
        setExchangeRate(data[0].price);
      });
  }, []);

  let selectRender = (
    array,
    setSelectOption,
    currencyValue,
    amountValue,
    onChangeAmount
  ) => {
    if (array.length > 0) {
      return (
        <>
          <select
            value={currencyValue}
            onChange={(e) => setSelectOption(e.target.value)}
            className="select"
          >
            {swapData.map((item) => {
              return (
                <option key={item.currency} value={item.currency}>
                  {item.currency}
                </option>
              );
            })}
          </select>
          <div class="input-container">
            <i class="icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href={`${Icons}#${currencyValue}`} />
              </svg>
            </i>
            <input
              class="input-field"
              type="number"
              value={amountValue}
              onChange={onChangeAmount}
            />
          </div>
        </>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  useEffect(() => {
    if (swapData.length > 0) {
      let inputPrice = swapData.find((obj) => obj.currency === inputSelect);
      let outputPrice = swapData.find((obj) => obj.currency === outputSelect);

      let newExchangePrice = inputPrice.price / outputPrice.price;
      setExchangeRate(newExchangePrice);
    }
  }, [inputSelect, outputSelect]);

  let handleInputAmount = (e) => {
    setAmount(e.target.value);
    setAmountInputSelect(true);
  };

  let handleOutputAmount = (e) => {
    setAmount(e.target.value);
    setAmountInputSelect(false);
  };

  return (
    <div className="Calculator">
      <form className="swap-form" onsubmit="return !1">
        <h2>Swap</h2>

        <div className="swap-labels">
          <div className="label-select">
            {selectRender(
              swapData,
              setInputSelect,
              inputSelect,
              inputAmount,
              handleInputAmount
            )}
          </div>

          <div className="label-select">
            {selectRender(
              swapData,
              setOutputSelect,
              outputSelect,
              outputAmount,
              handleOutputAmount
            )}
          </div>
        </div>

        <button className="submit_button" role="button">
          CONFIRM SWAP
        </button>
      </form>
    </div>
  );
}

export default Calculator;
