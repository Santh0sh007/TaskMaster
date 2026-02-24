import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Habit } from '../hooks/useHabits';

interface HabitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string, icon: string, color: string) => void;
    onUpdate?: (id: string, name: string, icon: string, color: string) => void;
    habit?: Habit | null;
}

const COLORS = [
    '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6',
    '#8b5cf6', '#f43f5e', '#06b6d4', '#84cc16', '#71717a'
];

const ICONS = ['Activity', 'Book', 'Code', 'Coffee', 'Dumbbell', 'Heart', 'Moon', 'Music', 'Sun', 'Zap'];

const HabitModal: React.FC<HabitModalProps> = ({ isOpen, onClose, onAdd, onUpdate, habit }) => {
    const [name, setName] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);

    useEffect(() => {
        if (habit) {
            setName(habit.name);
            setSelectedColor(habit.color);
            setSelectedIcon(habit.icon);
        } else {
            setName('');
            setSelectedColor(COLORS[0]);
            setSelectedIcon(ICONS[0]);
        }
    }, [habit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            if (habit && onUpdate) {
                onUpdate(habit.id, name, selectedIcon, selectedColor);
            } else {
                onAdd(name, selectedIcon, selectedColor);
            }
            setName('');
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2>{habit ? 'Edit Habit' : 'New Habit'}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>HABIT NAME</label>
                        <input
                            type="text"
                            placeholder="e.g. Morning Yoga"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <label>COLOR</label>
                        <div className="color-grid">
                            {COLORS.map(color => (
                                <div
                                    key={color}
                                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn glow-on-hover">
                        {habit ? 'Save Changes' : 'Create Habit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HabitModal;
