import { useState, useEffect } from 'react';
import '../assets/Global.css';

export default function BootSequence({ onComplete }) {
    const [displayedLines, setDisplayedLines] = useState([]);

    // The sequence of text to display. 
    const bootText = [
        "J-BIOS(C) 2026 Modular BIOS v4.51PG, An Energy Star Ally",
        "Copyright (C) 1984-2026, Portfolio Software, Inc.",
        "",
        "Main Processor : UW-PHI Core, 3.2 GHz", 
        "Memory Test : 32768K OK",
        "",
        "Initializing JBRAUN3 Root Directory...",
        "Mounting Modified-DEP Protocol...",
        "Connecting to AWS Cloud Infrastructure... OK",
        "",
        "Loading OS...",
        "Starting graphic interface...",
        "",
        "",
    ];

    useEffect(() => {
        let currentLine = 0;
        
        // This interval controls how fast the text appears
        const bootInterval = setInterval(() => {
            setDisplayedLines(prev => [...prev, bootText[currentLine]]);
            currentLine++;

            // When we reach the end of the text array
            if (currentLine === bootText.length) {
                clearInterval(bootInterval);
                // Wait 1.5 seconds on the final screen before launching the OS
                setTimeout(() => {
                    onComplete();
                }, 1500); 
            }
        }, 400); // 400ms delay between each line

        // Cleanup function
        return () => clearInterval(bootInterval);
    }, [onComplete]);

    return (
        <div className="boot-screen">
            {displayedLines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
            {/* The classic blinking DOS cursor */}
            <div className="blinking-cursor">_</div>
        </div>
    );
}