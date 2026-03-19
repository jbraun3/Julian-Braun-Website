import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import './assets/Global.css'
import './assets/Terminal.css'

import HomePage from './routes/HomePage.jsx';
import Resume from './routes/resume.jsx';

import Terminal from './components/Terminal.jsx'
import SideButtons from './components/SideButtons.jsx';
import BootSequence from './components/BootSequence.jsx';

export default function App() {
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  const handlePowerButton = () => {
    if (!isPowerOn) {
      setIsPowerOn(true);

    } else {
      setIsPowerOn(false);
      setIsBooted(false);
    }
  };


  return (
    <>
      <div className={`ambient-darkness ${!isPowerOn ? 'darkness-active' : ''}`}></div>
      <div className="dashboard-layout">
        
        {/* LEFT COLUMN: Navigation / Gameboy */}
        <div className="nav-panel">
          <div className="gameboy-base">
            <div className="gameboy-screen">
              <Terminal isBooted={isBooted} />
            </div>
          
            <div className="gameboy-buttons">

              <div className="D-pad-buttons">
                <div className="D-pad center"></div>
                <button className="D-pad up"></button>
                <button className="D-pad down"></button>
                <button className="D-pad left"></button>
                <button className="D-pad right"></button>
              </div>
              
              <div className="action-buttons">
                <button className="action-button A"></button>
                <button className="action-button B"></button>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Main Monitor */}
        <div className="center-screen">
          <div className="monitor-bezel">
            <div className="bezel-shadow">
              <div className={`monitor-screen ${isPowerOn && isBooted ? '' : 'screen-off'}`}>

                {isPowerOn && !isBooted && (
                  <BootSequence onComplete={() => setIsBooted(true)} />
                )}
                
                {isPowerOn && isBooted && (
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/resume" element={<Resume />} />
                  </Routes>
                )}

              </div>
            </div>
          </div>
        </div>

        <div className="hardware-buttons">
          <div className="power-button-container">
            {!isPowerOn && (
              <div className="power-tooltip">
                Press to activate website
              </div>
            )}
            <button 
              className={`power-button side-button ${isPowerOn ? 'power-on' : 'power-off'}`}
              onClick={handlePowerButton}
              title="Power on/off"
            >
              PWR
            </button>
          </div>
          
          <SideButtons />
        </div>

      </div>
    </>
    
  );
}