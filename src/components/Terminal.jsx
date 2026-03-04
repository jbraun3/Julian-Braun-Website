import '../assets/Global.css'
import '../assets/Terminal.css'
import { useState, useRef, useEffect } from 'react';


export default function Terminal() {
// Refs and States
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    // functions
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.trim() === '') return;

            let currentOutput = `Command not found: ${input}. Type 'help' for a list of commands.`;
            // input handling
            if (input.trim().toLowerCase() === 'help') {
                currentOutput = "Available commands: help, clear";
            } else if (input.trim().toLowerCase() === 'clear') {
                setHistory([]);
                setInput('');
                return;
            }

            setHistory([...history, { command: input, output: currentOutput }]);
            setInput('');
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);


    return (
        <div className="terminal-container" onClick={focusInput}>

            <div className="terminal-history">
                {history.map((entry, index) => (
                    
                <div key={index} className="history-block">

                    <div className="command-line">
                        <div className="prompt">julian@portfolio ~</div> 
                        <span className="command">$ {entry.command}</span>
                    </div>

                    <div className="output-line">
                        {entry.output}
                    </div>
                </div>  
                ))}  
            </div>

            <div className="terminal-input-line">
                <div className="prompt">julian@portfolio ~</div>
                <span className="command">$ </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    autoFocus
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    placeholder="Type a command..."
                />
            </div>

            <div ref={bottomRef} />

        </div>
    );
}