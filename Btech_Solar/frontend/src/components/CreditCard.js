import React, { useState } from 'react';
import chip from '../assets/chip.png';
import wifi from '../assets/wifi.jpg';

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState('################');
  const [cardHolder, setCardHolder] = useState('full name');
  const [expMonth, setExpMonth] = useState('mm');
  const [expYear, setExpYear] = useState('yy');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  };

  const handleExpMonthChange = (event) => {
    setExpMonth(event.target.value);
  };

  const handleExpYearChange = (event) => {
    setExpYear(event.target.value);
  };
  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };



  return (
      <div className="container2">
        <div className="card-container2">
          <div className="card-front">
            <div className="image">
              <img src={chip} alt="Chip" />
              <img src={wifi} alt="Wifi" />
            </div>
            <div className="card-number-box">{cardNumber}</div>
            <div className="flexbox">
              <div className="box">
                <span>card holder</span>
                <div className="card-holder-name">{cardHolder}</div>
              </div>
              <div className="box">
                <span>expires</span>
                <div className="expiration">
                  <span className="exp-month" >{expMonth }</span><div/>
                  <span className="exp-year">{expYear}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-back">
            <div className="stripe"></div>
            <div className="box">
              <span>cvv</span>
              <div className="cvv-box">{cvv} </div>
              <img src={wifi}  alt="Wifi" />
            </div>
          </div>
        </div>
        <form>
          <div className="inputBox">
            <span>card number</span>
            <input
              type="text"
              minLength="16"
              maxLength="16"
              className="card-number-input"
              onChange={handleCardNumberChange}
            />
          </div>
          <div className="inputBox">
            <span>card holder</span>
            <input
              type="text"
              className="card-holder-input"
              onChange={handleCardHolderChange}
            />
          </div>
          <div className="flexbox">
            <div className="inputBox">
              <span>expiration mm</span>
              <select className="month-input" onChange={handleExpMonthChange}>
                <option value="month" selected disabled>Month</option>
                <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
              </select>
            </div>
            <div className="inputBox">
              <span>expiration yy</span>
              <select className="year-input" onChange={handleExpYearChange}>
                <option value="year" selected disabled>Year</option>
                <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
              </select>
              </div>
            <div class="inputBox">
                <span>cvv</span>
                <input type="text" maxlength="3" class="cvv-input" onChange={handleCvvChange}/>
            </div>
        </div>
        <input type="submit" value="submit" class="submit-btn"/>
    </form>

</div>    
  )}

  export default CreditCard;
