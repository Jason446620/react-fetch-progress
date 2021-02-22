import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './index.js';

function App() {
    const [percentage, setPercentage] = useState(0);
    const [progress,   setProgress] = useState(null);

    const download = () => {
        const documentStyles = document.documentElement.style;
        let progress = 0;

        setProgress('in-progress');
    
        axios({
            url: 'https://pdrlimage.blob.core.windows.net/user-56e2f883-31a3-491e-a2db-fe988a1892b1/DroneStreams/f3c24ce3-5c4d-4c5e-bb50-330bddbe6e0a/gzx0w9j7.mp4?st=2021-02-18T20%3A38%3A01Z&se=2021-02-25T20%3A38%3A01Z&sp=rdl&sv=2018-03-28&sr=c&sig=keUdCAJnimfcURN2u0RRZ7C3lIJ8etdi3kimkKuFLZM%3D',
            onDownloadProgress(progressEvent) {
                progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);

                setPercentage(progress);

                documentStyles.setProperty('--progress', `${progress}%`);
            }
        }).then(response => {
            setProgress('finished');
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'video.mp4'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    };

    return (
        <div className={`progress-button ${progress}`}>
            <span className="loading-text">Loading</span>
                <button className="download-button" onClick={download}>
                    <span className="button-text">{progress === 'finished' ? '🎉 Done' : 'Download'}</span>
                </button>
            <span className="percentage">{percentage}%</span>
        </div>
    );
}

export default App;
