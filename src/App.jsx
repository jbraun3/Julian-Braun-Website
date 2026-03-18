import { useState } from 'react'
import Terminal from './components/Terminal.jsx'
import Resume from './routes/resume.jsx';
import SideButtons from './components/SideButtons.jsx';
import './assets/Global.css'
import './assets/Terminal.css'
import { Route, Routes } from 'react-router-dom';

import HomePage from './routes/HomePage.jsx';

export default function App() {
  return (
    <div className="dashboard-layout">
      
      {/* LEFT COLUMN: Navigation / Gameboy */}
      <div className="nav-panel">
        <div className="gameboy-base">
          <div className="gameboy-screen">
            <Terminal />
          </div>
        </div>
        
        <div className="gmaeboy-buttons">
          <button className="D-pad up"></button>
          <button className="D-pad down"></button>
          <button className="D-pad left"></button>
          <button className="D-pad right"></button>
          <button className="action-button A"></button>
          <button className="action-button B"></button>
        </div>
      </div>

      {/* CENTER COLUMN: Main Monitor */}
      <div className="center-screen">
        <div className="monitor-bezel">
          <div className="bezel-shadow">
            <div className="monitor-screen">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/resume" element={<Resume />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>

      <div className="hardware-buttons">
        <SideButtons />
      </div>

    </div>
  );
}