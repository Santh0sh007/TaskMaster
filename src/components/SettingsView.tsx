import React, { useRef } from 'react';
import { User, Database, Trash2, Download, Upload, Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { useHabits } from '../hooks/useHabits';
import { useSettings, THEME_COLORS } from '../hooks/useSettings';

const SettingsView: React.FC = () => {
    const { permission, remindersEnabled, toggleReminders, sendNotification } = useNotifications();
    const { exportHabits, importHabits, clearHabits } = useHabits();
    const { accentColor, setAccentColor, userName, setUserName } = useSettings();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            importHabits(file);
        }
    };

    const handleTestNotification = () => {
        const success = sendNotification('FlavorTown Habit Reminder', {
            body: 'Time to crush your goals.'
        });

        if (!success) {
            if (permission !== 'granted') {
                alert('Browser blocked the notification. Please check site permissions.');
            } else if (!remindersEnabled) {
                alert('Enable Daily Reminders first.');
            } else {
                alert('Unable to send notification.');
            }
        }
    };

    return (
        <div className="settings-view">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Settings</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your application experience</p>
            </header>

            <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <section className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent)', borderRadius: '10px' }}>
                            <User size={20} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Personalization</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Your Name</p>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your name"
                                className="glass-card"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid var(--glass-border)',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '15px'
                                }}
                            />
                        </div>

                        <div>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>App Flavor</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                                {THEME_COLORS.map(color => (
                                    <div
                                        key={color.value}
                                        onClick={() => setAccentColor(color.value)}
                                        style={{
                                            aspectRatio: '1',
                                            background: color.value,
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            border: accentColor === color.value ? '3px solid white' : 'none',
                                            boxShadow: accentColor === color.value ? `0 0 10px ${color.value}` : 'none'
                                        }}
                                        title={color.name}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div style={{ padding: '1px 0', borderTop: '1px solid var(--glass-border)', margin: '4px 0' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontWeight: '500' }}>Dark Mode</p>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Always on for ultimate focus</p>
                            </div>
                            <div className="toggle active"></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontWeight: '500' }}>Daily Reminders</p>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    {permission === 'denied' ? (
                                        <span style={{ color: '#ef4444' }}>Notifications Blocked - check browser settings</span>
                                    ) : (
                                        'Get notified to stay on track'
                                    )}
                                </p>
                            </div>
                            <div
                                className={`toggle ${remindersEnabled ? 'active' : ''}`}
                                onClick={toggleReminders}
                            ></div>
                        </div>
                        {remindersEnabled && permission === 'granted' && (
                            <button
                                className="settings-action-btn"
                                onClick={handleTestNotification}
                                style={{ marginTop: '8px' }}
                            >
                                <Bell size={16} />
                                <span>Send Test Notification</span>
                            </button>
                        )}
                    </div>
                </section>

                <section className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '10px' }}>
                            <Database size={20} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Data Management</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button className="settings-action-btn" onClick={exportHabits}>
                            <Download size={16} />
                            <span>Export Habits (JSON)</span>
                        </button>
                        <button className="settings-action-btn" onClick={handleImportClick}>
                            <Upload size={16} />
                            <span>Import Backup</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept=".json"
                            onChange={handleFileChange}
                        />
                        <button className="settings-action-btn danger" style={{ marginTop: '12px' }} onClick={clearHabits}>
                            <Trash2 size={16} />
                            <span>Clear All Data</span>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>This will delete all your habits and data</p>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SettingsView;
