import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for app state
type UserProfile = {
  name: string;
  weekPostpartum: number;
  hasCompletedOnboarding: boolean;
  birthDate?: string;
  feedingMethod?: 'breastfeeding' | 'formula' | 'combo' | 'other';
};

type JournalEntry = {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  note: string;
  symptoms: string[];
};

type AppState = {
  userProfile: UserProfile;
  journalEntries: JournalEntry[];
  assessmentResults: Record<string, any>;
  darkMode: boolean;
};

type AppContextType = {
  appState: AppState;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateJournalEntry: (id: string, updates: Partial<Omit<JournalEntry, 'id'>>) => void;
  deleteJournalEntry: (id: string) => void;
  saveAssessmentResult: (assessmentType: string, result: any) => void;
  toggleDarkMode: () => void;
};

// Create context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial state
const initialState: AppState = {
  userProfile: {
    name: '',
    weekPostpartum: 0,
    hasCompletedOnboarding: false,
  },
  journalEntries: [],
  assessmentResults: {},
  darkMode: false,
};

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(() => {
    // Load from localStorage if available
    const savedState = localStorage.getItem('heldAppState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('heldAppState', JSON.stringify(appState));
  }, [appState]);

  // Update user profile
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setAppState(prev => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        ...updates,
      },
    }));
  };

  // Add journal entry
  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    
    setAppState(prev => ({
      ...prev,
      journalEntries: [newEntry, ...prev.journalEntries],
    }));
  };

  // Update journal entry
  const updateJournalEntry = (id: string, updates: Partial<Omit<JournalEntry, 'id'>>) => {
    setAppState(prev => ({
      ...prev,
      journalEntries: prev.journalEntries.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      ),
    }));
  };

  // Delete journal entry
  const deleteJournalEntry = (id: string) => {
    setAppState(prev => ({
      ...prev,
      journalEntries: prev.journalEntries.filter(entry => entry.id !== id),
    }));
  };

  // Save assessment result
  const saveAssessmentResult = (assessmentType: string, result: any) => {
    setAppState(prev => ({
      ...prev,
      assessmentResults: {
        ...prev.assessmentResults,
        [assessmentType]: {
          ...result,
          date: new Date().toISOString(),
        },
      },
    }));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setAppState(prev => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        updateUserProfile,
        addJournalEntry,
        updateJournalEntry,
        deleteJournalEntry,
        saveAssessmentResult,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};