import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';
import { useForm } from './useForm';
import { getRandomChar, getSpecialChar } from './utilits';
import Preloader from './Preloader';

function App() {
   const [showPreloader, setShowPreloader] = useState(true); // Стан для відображення прелоадеру
   const [loadingComplete, setLoadingComplete] = useState(false); // Стан для позначення завершення емуляції завантаження

   // Емуляція завантаження даних чи чогось іншого
   useEffect(() => {
      const loadingTimeout = setTimeout(() => {
         setShowPreloader(false); // Приховати прелоадер після 2 секунд
         setLoadingComplete(true); // Позначити, що завантаження завершено
      }, 2000);

      return () => {
         clearTimeout(loadingTimeout); // Забезпечити очищення таймеру при виході з компонента
      };
   }, []);

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
      } else {
         toast.error('No password to copy');
      }
   };

   return (
      <section>
         {/* Відображення прелоадеру, якщо showPreloader === true і loadingComplete === false */}
         {showPreloader && !loadingComplete ? <Preloader /> : null}
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
                     <label htmlFor="length">Length</label>
                     <input
                        type="number"
                        id="length"
                        min={6}
                        max={20}
                        name="length"
                        value={values.length}
                        onChange={setValues}
                     />
                  </div>
                  <div className="field">
                     <label htmlFor="capital">ABC</label>
                     <input
                        type="checkbox"
                        id="capital"
                        name="capital"
                        checked={values.capital}
                        onChange={setValues}
                     />
                  </div>
                  <div className="field">
                     <label htmlFor="small">abc</label>
                     <input
                        type="checkbox"
                        id="small"
                        name="small"
                        checked={values.small}
                        onChange={setValues}
                     />
                  </div>
                  <div className="field">
                     <label htmlFor="number">123</label>
                     <input
                        type="checkbox"
                        id="number"
                        name="number"
                        checked={values.number}
                        onChange={setValues}
                     />
                  </div>
                  <div className="field">
                     <label htmlFor="symbol">#$&</label>
                     <input
                        type="checkbox"
                        id="symbol"
                        name="symbol"
                        checked={values.symbol}
                        onChange={setValues}
                     />
                  </div>
               </div>
               <button className='hvr-shutter-in-vertical' type="submit">Generate Password</button>
            </form>
         </div>
      </section>
   );
}

export default App;
