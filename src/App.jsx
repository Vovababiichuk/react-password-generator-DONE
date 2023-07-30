import React from 'react';
import { BiCopy } from 'react-icons/bi';



function App() {
  return (
    <section>
      <div className="container">
        <from id="pg-form">
          <div className='result'>
            <input type="text" id="result" placeholder='Min 6 Symbols' readOnly />
            <div className='clipboard'>
              <BiCopy></BiCopy>
            </div>
          </div>
          <div>
            <div className="field">
              <label htmlFor="length">Length</label>
              <input type="number" id="length" min={6} max={20} />
            </div>
            <div className="field">
              <label htmlFor="capital">ABC</label>
              <input type="checkbox" id='capital' />
            </div>
            <div className="field">
              <label htmlFor="small">abc</label>
              <input type="checkbox" id='small' />
            </div>
            <div className="field">
              <label htmlFor="number">123</label>
              <input type="checkbox" id='number' />
            </div>
            <div className="field">
              <label htmlFor="symbol">#$&</label>
              <input type="checkbox" id='symbol' />
            </div>
          </div>
          <button type='submit'>Generate Password</button>
        </from>
      </div>
    </section>
  )
}

export default App
