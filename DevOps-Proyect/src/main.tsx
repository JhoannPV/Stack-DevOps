import { createRoot } from 'react-dom/client'
import './styles.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { CalendarApp } from './CalendarApp.tsx'
// import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <CalendarApp />
  // </StrictMode>
)
