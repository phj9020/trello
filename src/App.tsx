import React from 'react';
import { GlobalStyle } from './style/GlobalStyle';
import { useRecoilState } from 'recoil';
import { hourSelector, minuteState } from './atoms';

function App() {
  const [min, setMin] = useRecoilState(minuteState);
  const [hour, setHour] = useRecoilState(hourSelector);

  const onMinChange = (e:React.FormEvent<HTMLInputElement>) => {
    setMin(+e.currentTarget.value)
  }
  const onHourChange = (e:React.FormEvent<HTMLInputElement>) => {
    setHour(+e.currentTarget.value)
  }
  return (
    <div className="App">
      <GlobalStyle />
      <input type="number" placeholder='number' value={min} onChange={onMinChange} />
      <input type="number" placeholder='hours' value={hour} onChange={onHourChange} />
    </div>
  );
}

export default App;
