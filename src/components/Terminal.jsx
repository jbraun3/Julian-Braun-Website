import '../assets/Global.css'
import '../assets/Terminal.css'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Terminal() {
    const navigate = useNavigate();
// Refs and States
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState('~');
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
            
            let command = input.trim().toLowerCase();
            let currentOutput = `${input}: Command not found. Type 'help' for a list of commands.`;

            // general commands
            if (command === 'help') {
                currentOutput = "Available commands: help, clear, cd, open, ls";
            } else if (command === 'clear') {
                setHistory([]);
                setInput('');
                return;

            // ls handling
            } else if (command === 'ls') {
                if (currentDirectory === '~') {
                    currentOutput = "projects/ \n resume/";
                } else if (currentDirectory === '~/projects') {
                    currentOutput = "project1/ \n project2/ \n project3/";
                } else if (currentDirectory === '~/resume') {
                    currentOutput = "resume.pdf \n resume_page.jsx";
                }
                

            // cd handling
            } else if (command.startsWith('cd')) {
                currentOutput = "";
                if (currentDirectory === '~' && (command === 'cd projects' || command === 'cd projects/')) {
                    setCurrentDirectory(`${currentDirectory}/projects`);
                } else if (currentDirectory === '~' && (command === 'cd resume' || command === 'cd resume/')) {
                    setCurrentDirectory(`${currentDirectory}/resume`);
                } else if ((currentDirectory === '~/projects' || currentDirectory === '~/resume') && (command === 'cd ..' || command === 'cd ../')) {
                    setCurrentDirectory('~');
                } else {
                    currentOutput = `${input}: No such file or directory.`;
                }
            }

            // open handling
            else if (command.startsWith('open')) {
                currentOutput = "";
                if ((currentDirectory === '~/resume' && command === 'open resume.pdf') || (currentDirectory === '~' && command === 'open resume/resume.pdf')) {
                    currentOutput = "Opening resume.pdf...";
                    window.open('../public/images/JULIAN_BRAUN_RESUME_N.pdf', '_blank');
                } else if ((currentDirectory === '~/resume' && command === 'open resume_page.jsx') || (currentDirectory === '~' && command === 'open resume/resume_page.jsx')) {
                    currentOutput = "Opening resume_page.jsx...";
                    navigate('/resume');
                } else {
                    currentOutput = `${input} No such file to open.`;
                }
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
                <div ref={bottomRef} />

                <div className="terminal-input-line">
                    <div className="prompt">julian@portfolio {currentDirectory}</div>
                    <span className="command">$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        autoFocus
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="terminal-input"
                        placeholder="Type help for list of commands"
                    />
                </div>
            </div>
        </div>
    );
}