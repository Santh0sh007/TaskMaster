import { Check, Flame, Pencil, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface HabitCardProps {
    habit: {
        id: string;
        name: string;
        icon: string;
        color: string;
        completedDates: string[];
    };
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (habit: any) => void;
    isCompletedToday: boolean;
    streak: number;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete, onEdit, isCompletedToday, streak }) => {
    // @ts-ignore - Dynamic icon loading
    const IconComponent = LucideIcons[habit.icon] || LucideIcons.Activity;

    return (
        <div className={`habit-card glass-card ${isCompletedToday ? 'completed' : ''}`}>
            <div className="habit-icon-container" style={{ backgroundColor: `${habit.color}20`, color: habit.color }}>
                <IconComponent size={24} />
            </div>

            <div className="habit-info">
                <h3>{habit.name}</h3>
                <div className="streak-badge">
                    <Flame size={14} fill={streak > 0 ? "#f97316" : "none"} color={streak > 0 ? "#f97316" : "currentColor"} />
                    <span>{streak} day streak</span>
                </div>
            </div>

            <div className="habit-actions">
                <button
                    className="edit-btn"
                    onClick={() => onEdit(habit)}
                    aria-label={`Edit ${habit.name}`}
                >
                    <Pencil size={18} />
                </button>
                <button
                    className="delete-btn"
                    onClick={() => onDelete(habit.id)}
                    aria-label={`Delete ${habit.name}`}
                >
                    <Trash2 size={18} />
                </button>
                <button
                    className={`check-btn ${isCompletedToday ? 'checked' : ''}`}
                    onClick={() => onToggle(habit.id)}
                    style={{
                        backgroundColor: isCompletedToday ? habit.color : 'transparent',
                        borderColor: habit.color
                    }}
                    aria-label={isCompletedToday ? `Mark ${habit.name} as incomplete` : `Mark ${habit.name} as complete`}
                >
                    <Check
                        size={20}
                        color={isCompletedToday ? "white" : habit.color}
                        style={{ opacity: isCompletedToday ? 1 : 0.5 }}
                        strokeWidth={3}
                    />
                </button>
            </div>
        </div>
    );
};

export default HabitCard;
