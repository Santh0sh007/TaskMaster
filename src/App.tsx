import { useState, useEffect } from 'react';
import DailyView from './components/DailyView';
import ProgressView from './components/ProgressView';
import SettingsView from './components/SettingsView';
import NavBar from './components/NavBar';
import AddHabitModal from './components/AddHabitModal';
import SplashScreen from './components/SplashScreen';
import type { Habit } from './hooks/useHabits';
import { useHabits } from './hooks/useHabits';
import { useSettings } from './hooks/useSettings';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'daily' | 'stats' | 'settings'>('daily');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const { habits, addHabit, toggleHabit, deleteHabit, updateHabit } = useHabits();
  useSettings(); // Initialize settings and apply theme

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Give it enough time for the animation sequences
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  return (
    <div className="app-container fade-in">
      <main className="container">
        {activeTab === 'daily' && (
          <div className="view-container">
            <DailyView
              habits={habits}
              toggleHabit={toggleHabit}
              deleteHabit={deleteHabit}
              onEdit={handleEdit}
            />
          </div>
        )}
        {activeTab === 'stats' && (
          <div className="view-container">
            <ProgressView habits={habits} />
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="view-container">
            <SettingsView />
          </div>
        )}
      </main>

      <NavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddClick={() => {
          setEditingHabit(null);
          setIsModalOpen(true);
        }}
      />

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={addHabit}
        onUpdate={updateHabit}
        habit={editingHabit}
      />
    </div>
  );
}

export default App;
