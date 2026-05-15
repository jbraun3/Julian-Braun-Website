import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileSystem, findNode } from './fileSystem.js';
import '../assets/FileExplorer.css';

export default function FileExplorer({ isBooted }) {
    const navigate = useNavigate();
    const [currentPath, setCurrentPath] = useState(['~']);
    const [history, setHistory] = useState([['~']]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selected, setSelected] = useState(null);

    const currentNode = findNode(currentPath);
    const entries = currentNode?.children ? Object.entries(currentNode.children) : [];

    const canGoBack = historyIndex > 0;
    const canGoForward = historyIndex < history.length - 1;

    const currentFolderName = currentPath[currentPath.length - 1] === '~' ? 'home' : currentPath[currentPath.length - 1];

    const toWindowsPath = (pathArray) => {
        const parts = pathArray.slice(1);
        return ['C:', 'users', 'julian', ...parts].join('\\');
    };

    const handleItemClick = (name, node) => {
        setSelected(name);
    };

    const handleItemDoubleClick = (name, node) => {
        if (node.type === 'dir') {
            const newPath = [...currentPath, name];
            setCurrentPath(newPath);
            const newHistory = history.slice(0, historyIndex + 1);
            setHistory([...newHistory, newPath]);
            setHistoryIndex(historyIndex + 1);
            setSelected(null);
        } else if (node.type === 'file') {
            node.action(navigate);
        }
    };

    const goBack = () => {
        if (canGoBack) {
            const prev = history[historyIndex - 1];
            setHistoryIndex(historyIndex - 1);
            setCurrentPath(prev);
            setSelected(null);
        }
    };
 
    const goForward = () => {
        if (canGoForward) {
            const next = history[historyIndex + 1];
            setHistoryIndex(historyIndex + 1);
            setCurrentPath(next);
            setSelected(null);
        }
    };
    
    return (
        <div className={`explorer-container ${isBooted ? '' : 'screen-off'}`}>
            <div className={`explorer ${isBooted ? '' : 'explorer-off'}`}>
                <div className="explorer-header">
                    <p className="explorer-title">{currentFolderName}</p>
                    <div className="explorer-controls">
                        <button onClick={goBack} disabled={!canGoBack}>&lt;</button>
                        <button onClick={goForward} disabled={!canGoForward}>&gt;</button>
                    </div>
                </div>
                <div className="explorer-path-container">
                    <p className="explorer-path">{toWindowsPath(currentPath)}</p>
                </div>
                <div className="explorer-content" onClick={() => setSelected(null)}>
                    {entries.map(([name, node]) => (
                        <div
                            key={name}
                            className={`explorer-item ${selected === name ? 'selected' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleItemClick(name, node); }}
                            onDoubleClick={(e) => { e.stopPropagation(); handleItemDoubleClick(name, node); }}
                        >
                            <span className={`item-icon ${node.type}`}></span>
                            <span className="item-name">{name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};