import React from 'react';
import './index.css';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { DnDMain } from './components/Dndmain';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <>
    <Router>
      <DnDMain />
    </Router>
  </>
);
