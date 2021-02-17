import React from 'react';

import './styles.css';

const Loading: React.FC = () => {
    return (
        <div className="logging-container">
            <div className="logging"></div>
            <div className="loding-text">Carregando...</div>
        </div>
    );
}

export default Loading;