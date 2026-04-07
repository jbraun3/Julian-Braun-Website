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
              <p className="gameboy-title">JulesBoy</p>
            </div>
          
            <div className="gameboy-buttons">
              {/* Complex nested structure for the 3D D-pad */}
              <div className="left">
                <div className="croix">
                  <div className="line top"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="middle"></div>
                </div>
              </div>

              {/* Action buttons (B is traditionally first/lower on Gameboy) */}
              <div className="right">
                <button>B</button>
                <button>A</button>
              </div>

              {/* Hyphenated class name and added spans for the neon text labels */}
              <div className="small-buttons">
                <button><span>SELECT</span></button>
                <button><span>START</span></button>
              </div>

              {/* Your existing sound grid */}
              <div className="sound-grid">
                <div className="dot t"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot t"></div>

                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>

                <div className="dot t"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot"></div>
                <div className="dot b"></div>
                <div className="dot t"></div>
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