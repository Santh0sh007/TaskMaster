import React from 'react';
import { Calendar, BarChart3, Settings, Plus } from 'lucide-react';

interface NavBarProps {
    activeTab: 'daily' | 'stats' | 'settings';
    setActiveTab: (tab: 'daily' | 'stats' | 'settings') => void;
    onAddClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, setActiveTab, onAddClick }) => {
    return (
        <nav className="navbar glass-card" role="tablist">
            <button
                className={`nav-item ${activeTab === 'daily' ? 'active' : ''}`}
                onClick={() => setActiveTab('daily')}
                role="tab"
                aria-selected={activeTab === 'daily'}
                aria-label="Daily Habits"
            >
                <Calendar size={20} />
                <span>Daily</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
                role="tab"
                aria-selected={activeTab === 'stats'}
                aria-label="Progress Dashboard"
            >
                <BarChart3 size={20} />
                <span>Stats</span>
            </button>

            <div className="nav-add-container">
                <button
                    className="nav-add-btn"
                    onClick={onAddClick}
                    aria-label="Add New Habit"
                >
                    <Plus size={32} color="white" />
                </button>
            </div>

            <button
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
                role="tab"
                aria-selected={activeTab === 'settings'}
                aria-label="App Settings"
            >
                <Settings size={20} />
                <span>Settings</span>
            </button>
        </nav>
    );
};

export default NavBar;
