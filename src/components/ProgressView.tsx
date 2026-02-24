import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { format, subDays, eachDayOfInterval, startOfToday, isSameDay } from 'date-fns';
import { Target, Zap, Activity, Award, TrendingUp } from 'lucide-react';

interface ProgressViewProps {
    habits: any[];
}

const ProgressView: React.FC<ProgressViewProps> = ({ habits }) => {
    const getWeeklyData = () => {
        const end = new Date();
        const start = subDays(end, 6);
        const interval = eachDayOfInterval({ start, end });

        return interval.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const count = habits.filter(h => h.completedDates.includes(dateStr)).length;
            return {
                name: format(day, 'EEE'),
                fullDate: format(day, 'MMM d, yyyy'),
                count: count,
            };
        });
    };

    const data = getWeeklyData();
    const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);

    // Calculate Completion Rate
    const totalPotentialCompletions = habits.length * 7; // simplified for last 7 days
    const weeklyCompletions = data.reduce((acc, d) => acc + d.count, 0);
    const completionRate = habits.length > 0
        ? Math.round((weeklyCompletions / totalPotentialCompletions) * 100)
        : 0;

    // Calculate Best Streak
    const calculateStreak = (completedDates: string[]) => {
        if (!completedDates || completedDates.length === 0) return 0;
        const sortedDates = [...completedDates].sort().reverse();
        let streak = 0;
        let currentDate = startOfToday();

        if (isSameDay(new Date(sortedDates[0]), currentDate) ||
            isSameDay(new Date(sortedDates[0]), subDays(currentDate, 1))) {

            for (let i = 0; i < sortedDates.length; i++) {
                const habitDate = new Date(sortedDates[i]);
                if (isSameDay(habitDate, currentDate)) {
                    streak++;
                    currentDate = subDays(currentDate, 1);
                } else if (isSameDay(habitDate, subDays(currentDate, 1))) {
                    // Skip if next date is same day (shouldn't happen but safe)
                } else {
                    break;
                }
            }
        }
        return streak;
    };

    const bestStreak = habits.length > 0
        ? Math.max(...habits.map(h => calculateStreak(h.completedDates)))
        : 0;

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-date">{payload[0].payload.fullDate}</p>
                    <p className="tooltip-value">{payload[0].value} Habits Completed</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="progress-view">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Advanced health and habit analytics</p>
            </header>

            <div className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
            }}>
                <div className="stats-card glass-card">
                    <div className="stats-card-bg gradient-indigo"></div>
                    <div className="stats-card-content">
                        <div className="stats-icon-wrapper" style={{ color: '#818cf8' }}>
                            <Activity size={24} />
                        </div>
                        <span className="stats-label">Total Habits</span>
                        <h2 className="stats-value">{habits.length}</h2>
                        <div className="stats-trend trend-up">
                            <TrendingUp size={14} />
                            <span>Active focus</span>
                        </div>
                    </div>
                </div>

                <div className="stats-card glass-card">
                    <div className="stats-card-bg gradient-emerald"></div>
                    <div className="stats-card-content">
                        <div className="stats-icon-wrapper" style={{ color: '#34d399' }}>
                            <Award size={24} />
                        </div>
                        <span className="stats-label">Completions</span>
                        <h2 className="stats-value">{totalCompletions}</h2>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>All time total</span>
                    </div>
                </div>

                <div className="stats-card glass-card">
                    <div className="stats-card-bg gradient-orange"></div>
                    <div className="stats-card-content">
                        <div className="stats-icon-wrapper" style={{ color: '#fbbf24' }}>
                            <Target size={24} />
                        </div>
                        <span className="stats-label">Weekly Rate</span>
                        <h2 className="stats-value">{completionRate}%</h2>
                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '8px' }}>
                            <div style={{ width: `${completionRate}%`, height: '100%', background: '#fbbf24', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                </div>

                <div className="stats-card glass-card">
                    <div className="stats-card-bg gradient-pink"></div>
                    <div className="stats-card-content">
                        <div className="stats-icon-wrapper" style={{ color: '#f472b6' }}>
                            <Zap size={24} />
                        </div>
                        <span className="stats-label">Best Streak</span>
                        <h2 className="stats-value">{bestStreak}d</h2>
                        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Current max</span>
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '28px', height: '360px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Weekly Performance</h3>
                    <div style={{ padding: '4px 12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent)', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                        LAST 7 DAYS
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                        <Bar
                            dataKey="count"
                            radius={[6, 6, 0, 0]}
                            barSize={32}
                            animationBegin={300}
                            animationDuration={1000}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.count > 0 ? 'url(#barGradient)' : '#1e293b'} />
                            ))}
                        </Bar>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProgressView;
