import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './fonts.css';
import './styles.css';
import './case.css';
import './visuals.css';
import './screenshot.css';
import './a11y.css';
import './cv.css';
import './editorial.css';
import './art-direction.css';

const root = document.getElementById('root');
if (!root) throw new Error('The application root element is missing.');
createRoot(root).render(<React.StrictMode><App/></React.StrictMode>);
