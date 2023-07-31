import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';
import { useForm } from './useForm';
import { getRandomChar, getSpecialChar } from './utilits';

function App() {
   const [values, setValues] = useForm({
      length: 6,
      capital: true,
      small: true,
      number: false,
      symbol: false,
   });
   const [result, setResult] = useState('');

   const fieldsArray = [
      {
         field: values.capital,
         getChar: () => getRandomChar(65, 90),
      },
      {
         field: values.small,
         getChar: () => getRandomChar(97, 122),
      },
      {
         field: values.number,
         getChar: () => getRandomChar(48, 57),
      },
      {
         field: values.symbol,
         getChar: () => getSpecialChar(),
      },
   ];

   const handleOnSubmit = (e) => {
      e.preventDefault();
      let generatedPassword = '';
      const checkedFields = fieldsArray.filter(({ field }) => field);

      for (let i = 0; i < values.length; i++) {
         const index = Math.floor(Math.random() * checkedFields.length);
         const letter = checkedFields[index]?.getChar();

         if (letter) {
            generatedPassword += letter;
         }
      }
      if (generatedPassword) {
         setResult(generatedPassword);
      } else {
         toast.error(' Please select at least one option');
      }
   };

   const handleClipboard = async () => {
      if (result) {
         await navigator.clipboard.writeText(result);
         toast.success('Copied to your clipboard');
         document.querySelector('.clipboard').classList.add('color-change');
         setTimeout(() => {
            document.querySelector('.clipboard').classList.remove('color-change');
         }, 2000);
      } else {
         toast.error('No password to copy');
      }
   };

   return (
      <section>
         <div className='wrapper'>
            <h1 className="blur-animation">
               Random Password Generator
            </h1>
            <div className="container">
               <form id="pg-form" onSubmit={handleOnSubmit}>
                  <div className="result">
                     <input
                        type="text"
                        id="result"
                        placeholder="min 6 symbols"
                        readOnly
                        value={result}
                     />
                     <div className="clipboard" onClick={handleClipboard}>
                        <FaCopy />
                     </div>
                  </div>
                  <div>
                     <div className="field">
                        <label htmlFor="password-length" className='length-none' style={{ cursor: 'default' }}>Length:</label>
                        <input
                           type="range"
                           id="password-length"
                           name="length"
                           min={6}
                           max={20}
                           value={values.length}
                           onChange={setValues}
                        />
                        <select
                           id="password-length-display"
                           name="length"
                           value={values.length}
                           onChange={setValues}>
                           {[...Array(15)].map((_, i) => (
                              <option key={i} value={i + 6}>
                                 {i + 6}
                              </option>
                           ))}
                        </select>
                     </div>
                     <div className="field">
                        <label htmlFor="capital">Uppercase (ABC)</label>
                        <input
                           type="checkbox"
                           id="capital"
                           name="capital"
                           checked={values.capital}
                           onChange={setValues}
                        />
                     </div>
                     <div className="field">
                        <label htmlFor="small">Lowercase (abc)</label>
                        <input
                           type="checkbox"
                           id="small"
                           name="small"
                           checked={values.small}
                           onChange={setValues}
                        />
                     </div>
                     <div className="field">
                        <label htmlFor="number">Numbers (123)</label>
                        <input
                           type="checkbox"
                           id="number"
                           name="number"
                           checked={values.number}
                           onChange={setValues}
                        />
                     </div>
                     <div className="field">
                        <label htmlFor="symbol">Symbols (#$&)</label>
                        <input
                           type="checkbox"
                           id="symbol"
                           name="symbol"
                           checked={values.symbol}
                           onChange={setValues}
                        />
                     </div>
                  </div>
                  <button className="hvr-shutter-in-vertical" type="submit">
                     Generate Password
                  </button>
               </form>
            </div>
         </div>
      </section>
   );
}

export default App;
