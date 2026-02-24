import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        <div className="splash-screen">
            <div className="splash-content">
                <div className="splash-logo">
                    <div className="splash-logo-inner">
                        <svg width="60" height="60" viewBox="0 0 10 10" style={{ shapeRendering: 'crispEdges' }}>
                            {/* Tree Foliage */}
                            <rect x="4" y="1" width="2" height="1" fill="var(--accent)" />
                            <rect x="3" y="2" width="4" height="1" fill="var(--accent)" />
                            <rect x="2" y="3" width="6" height="1" fill="var(--accent)" />
                            <rect x="1" y="4" width="8" height="2" fill="var(--accent)" />
                            {/* Trunk */}
                            <rect x="4" y="6" width="2" height="3" fill="#78350f" />
                        </svg>
                    </div>
                    <div className="splash-glow"></div>
                </div>
                <h1 className="splash-title">Flavor<span>Town</span></h1>
                <div className="splash-loader">
                    <div className="loader-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
