import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <StrictMode>
      <LocalizationProvider
         adapterLocale={dayjs().locale()}
         dateAdapter={AdapterDayjs}
      >
         <App/>
      </LocalizationProvider>
   </StrictMode>
);