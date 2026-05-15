import '../assets/Global.css'
import '../assets/Terminal.css'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileSystem, findNode } from './fileSystem.js';


export default function Terminal({ isBooted }) {
    const navigate = useNavigate();

    const resolvePath = (currentPath, pathStr) => {
        if (!pathStr || pathStr === '.') return currentPath;
        if (pathStr === '~') return ['~'];
        if (pathStr === '/') return ['~'];
        
        const parts = pathStr.split('/').filter(p => p.length > 0);
        let newPath = (pathStr.startsWith('~') || pathStr.startsWith('/')) ? ['~'] : [...currentPath];
        
        if (pathStr.startsWith('~')) parts.shift();

        for (const part of parts) {
            if (part === '.') continue;
            if (part === '..') {
                if (newPath.length > 1) newPath.pop();
            } else {
                const currentNode = findNode(newPath);
                if (currentNode && currentNode.type === 'dir' && currentNode.children[part]) {
                    newPath.push(part);
                } else {
                    return null;
                }
            }
        }
        return newPath;
    };

// Refs and States
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentPathArray, setCurrentPathArray] = useState(['~']);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const historyCounter = useRef(0); 

    const currentDirectory = currentPathArray.join('/');
    
// functions
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length === 0) return;
            if (historyCounter.current < history.length) {
                historyCounter.current += 1;
            }
            setInput(history[history.length - historyCounter.current].command);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (history.length === 0) return;
            if (historyCounter.current > 1) {
                historyCounter.current -= 1;
                setInput(history[history.length - historyCounter.current].command);
            } else if (historyCounter.current === 1) {
                historyCounter.current = 0;
                setInput('');
            }

        } else if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedInput = input.trim();
            if (trimmedInput === '') return;
            
            const parts = trimmedInput.split(/\s+/);
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);
            let currentOutput = "";
            let nextPathArray = [...currentPathArray];

            // general commands
            if (cmd === 'help') {
                currentOutput = "Available commands: help, clear, cd, open, ls";
            } else if (cmd === 'clear') {
                setHistory([]);
                historyCounter.current = 0;
                setInput('');
                return;

            // ls handling
            } else if (cmd === 'ls') {
                const targetPath = resolvePath(currentPathArray, args[0] || '.');
                const node = targetPath ? findNode(targetPath) : null;
                if (node) {
                    if (node.type === 'dir') {
                        currentOutput = Object.keys(node.children)
                            .map(name => node.children[name].type === 'dir' ? name + '/' : name)
                            .join(' \n ');
                    } else {
                        currentOutput = args[0];
                    }
                } else {
                    currentOutput = `ls: ${args[0]}: No such file or directory`;
                }

            // cd handling
            } else if (cmd === 'cd') {
                if (!args[0] || args[0] === '~') {
                    nextPathArray = ['~'];
                    setCurrentPathArray(['~']);
                } else {
                    const targetPath = resolvePath(currentPathArray, args[0]);
                    const node = targetPath ? findNode(targetPath) : null;
                    if (node && node.type === 'dir') {
                        nextPathArray = targetPath;
                        setCurrentPathArray(targetPath);
                    } else if (node && node.type === 'file') {
                        currentOutput = `cd: ${args[0]}: Not a directory`;
                    } else {
                        currentOutput = `cd: ${args[0]}: No such file or directory`;
                    }
                }

            // open handling
            } else if (cmd === 'open') {
                if (!args[0]) {
                    currentOutput = "open: missing file operand";
                } else {
                    const targetPath = resolvePath(currentPathArray, args[0]);
                    const node = targetPath ? findNode(targetPath) : null;
                    if (node && node.type === 'file') {
                        currentOutput = node.desc;
                        node.action(navigate);
                    } else if (node && node.type === 'dir') {
                        currentOutput = `open: ${args[0]}: Is a directory`;
                    } else {
                        currentOutput = `open: ${args[0]}: No such file`;
                    }
                }
            } else {
                currentOutput = `${cmd}: Command not found. Type 'help' for a list of commands.`;
            }

            setHistory([...history, { 
                command: input, 
                output: currentOutput, 
                directory: currentPathArray.join('/') 
            }]);
            historyCounter.current = 0;
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
        <div className={`terminal-container ${isBooted ? '' : 'screen-off'}`} onClick={focusInput}>

            <div className={`terminal-history ${isBooted ? '' : 'terminal-off'}`}>
                {history.map((entry, index) => (
                    
                <div key={index} className="history-block">

                    <div className="command-line">
                        <div className="prompt">julian@portfolio {entry.directory}</div> 
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