import { useState, useEffect } from 'react';

export interface Habit {
    id: string;
    name: string;
    icon: string;
    color: string;
    createdAt: string;
    completedDates: string[]; // ISO date strings
}

export const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>(() => {
        try {
            const saved = localStorage.getItem('flavortown-habits');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to parse habits from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('flavortown-habits', JSON.stringify(habits));
        } catch (error) {
            console.error('Failed to save habits to localStorage:', error);
        }
    }, [habits]);

    const addHabit = (name: string, icon: string, color: string) => {
        const newHabit: Habit = {
            id: crypto.randomUUID(),
            name,
            icon,
            color,
            createdAt: new Date().toISOString(),
            completedDates: [],
        };
        setHabits([...habits, newHabit]);
    };

    const toggleHabit = (habitId: string, date: string) => {
        setHabits(habits.map(h => {
            if (h.id === habitId) {
                const isCompleted = h.completedDates.includes(date);
                return {
                    ...h,
                    completedDates: isCompleted
                        ? h.completedDates.filter(d => d !== date)
                        : [...h.completedDates, date]
                };
            }
            return h;
        }));
    };

    const deleteHabit = (habitId: string) => {
        setHabits(habits.filter(h => h.id !== habitId));
    };

    const updateHabit = (id: string, name: string, icon: string, color: string) => {
        setHabits(habits.map(h =>
            h.id === id ? { ...h, name, icon, color } : h
        ));
    };

    const clearHabits = () => {
        if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            setHabits([]);
            localStorage.removeItem('flavortown-habits');
        }
    };

    const exportHabits = () => {
        const dataStr = JSON.stringify(habits, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `flavortown-backup-${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const importHabits = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target?.result as string);
                if (Array.isArray(imported)) {
                    setHabits(imported);
                    alert('Data imported successfully.');
                } else {
                    throw new Error('Invalid format');
                }
            } catch (err) {
                alert('Failed to import data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };

    return { habits, addHabit, toggleHabit, deleteHabit, updateHabit, clearHabits, exportHabits, importHabits };
};
