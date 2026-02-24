import { useState, useEffect } from 'react';

export const THEME_COLORS = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Violet', value: '#8b5cf6' },
];

export const useSettings = () => {
    const [accentColor, setAccentColor] = useState<string>(() => {
        return localStorage.getItem('flavortown-accent-color') || '#6366f1';
    });

    const [userName, setUserName] = useState<string>(() => {
        return localStorage.getItem('flavortown-user-name') || '';
    });

    useEffect(() => {
        localStorage.setItem('flavortown-accent-color', accentColor);
        document.documentElement.style.setProperty('--accent', accentColor);
        // Create an accent-glow version (30% opacity)
        const glow = accentColor + '4d'; // 4d is ~30% alpha in hex
        document.documentElement.style.setProperty('--accent-glow', glow);
    }, [accentColor]);

    useEffect(() => {
        localStorage.setItem('flavortown-user-name', userName);
    }, [userName]);

    return {
        accentColor,
        setAccentColor,
        userName,
        setUserName
    };
};
