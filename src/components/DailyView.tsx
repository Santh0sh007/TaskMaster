import React, { useEffect, useRef } from 'react';
import HabitCard from './HabitCard';
import { format } from 'date-fns';
import { useSettings } from '../hooks/useSettings';

interface DailyViewProps {
    habits: any[];
    toggleHabit: (id: string, date: string) => void;
    deleteHabit: (id: string) => void;
    onEdit: (habit: any) => void;
}

const DailyView: React.FC<DailyViewProps> = ({ habits, toggleHabit, deleteHabit, onEdit }) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const { userName } = useSettings();
    const listEndRef = useRef<HTMLDivElement>(null);
    const prevHabitCount = useRef(habits.length);

    useEffect(() => {
        // Only scroll if a new habit was added (count increased)
        if (habits.length > prevHabitCount.current) {
            listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        prevHabitCount.current = habits.length;
    }, [habits.length]);

    const calculateStreak = (completedDates: string[]) => {
        let streak = 0;
        const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

        // Simple streak calculation logic
        let checkDate = new Date();
        // If not completed today, check from yesterday
        const isCompletedToday = completedDates.includes(today);
        if (!isCompletedToday) {
            checkDate.setDate(checkDate.getDate() - 1);
        }

        for (const dateStr of sortedDates) {
            if (dateStr === format(checkDate, 'yyyy-MM-dd')) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    };

    return (
        <div className="daily-view">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700' }}>
                    {userName ? `Hi, ${userName}` : 'Today'}
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>{format(new Date(), 'EEEE, MMMM do')}</p>
            </header>

            {habits.length === 0 ? (
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p>No habits yet. Tap the + to start.</p>
                </div>
            ) : (
                <div className="habit-list">
                    {habits.map((habit, index) => (
                        <div
                            key={habit.id}
                            className="stagger-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <HabitCard
                                habit={habit}
                                onToggle={(id) => toggleHabit(id, today)}
                                onDelete={deleteHabit}
                                onEdit={onEdit}
                                isCompletedToday={habit.completedDates.includes(today)}
                                streak={calculateStreak(habit.completedDates)}
                            />
                        </div>
                    ))}
                    <div ref={listEndRef} />
                </div>
            )}
        </div>
    );
};

export default DailyView;
