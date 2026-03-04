import { useState } from 'react'
import Terminal from './components/Terminal.jsx'
import './assets/Global.css'
import './assets/Terminal.css'

export default function App() {
  return (
    <div className="dashboard-layout">
      
      {/* LEFT COLUMN: Navigation / Gameboy */}
      <div className="nav-panel">
        <div className="gameboy-base">
          <div className="gameboy-screen">
            <Terminal />
            {/* Navigation links will go here */}
          </div>
        </div>
        {/* We will add the UI toggle and physical D-pad styling here later */}
      </div>

      {/* CENTER COLUMN: Main Monitor */}
      <div className="center-screen">
        <div className="monitor-bezel">
          <div className="bezel-shadow">
            <div className="monitor-screen">
              <h1>page</h1>
              {/* Content (Home, Projects, Resume) will render here */}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Hardware Links */}
      <div className="hardware-buttons">
        
      </div>

    </div>
  );
}