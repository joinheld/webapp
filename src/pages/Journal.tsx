import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookHeart, Plus, Calendar, Edit, Trash2, ThumbsUp, ThumbsDown, Smile, Frown, Meh, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';

type MoodScore = 1 | 2 | 3 | 4 | 5;

interface JournalEntryFormData {
  date: string;
  mood: MoodScore;
  note: string;
  symptoms: string[];
}

const commonSymptoms = [
  "Fatigue", "Insomnia", "Anxious thoughts", "Tearfulness", "Irritability",
  "Headache", "Body aches", "Low mood", "Overwhelmed", "Chest tightness",
  "Racing thoughts", "Appetite changes", "Disinterest in activities", "Brain fog",
  "Loneliness", "Guilt", "Anger", "Hopelessness", "Disconnection from baby"
];

const Journal: React.FC = () => {
  const { appState, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useAppContext();
  const { journalEntries } = appState;
  
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // Default to today's date in local timezone
  const todayFormatted = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<JournalEntryFormData>({
    date: todayFormatted,
    mood: 3,
    note: '',
    symptoms: [],
  });
  
  const resetForm = () => {
    setFormData({
      date: todayFormatted,
      mood: 3,
      note: '',
      symptoms: [],
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleMoodSelect = (mood: MoodScore) => {
    setFormData({
      ...formData,
      mood,
    });
  };
  
  const handleSymptomToggle = (symptom: string) => {
    setFormData({
      ...formData,
      symptoms: formData.symptoms.includes(symptom)
        ? formData.symptoms.filter(s => s !== symptom)
        : [...formData.symptoms, symptom],
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEntryId) {
      updateJournalEntry(editingEntryId, formData);
      setEditingEntryId(null);
    } else {
      addJournalEntry(formData);
      setIsAddingEntry(false);
    }
    
    resetForm();
  };
  
  const handleEdit = (entryId: string) => {
    const entry = journalEntries.find(e => e.id === entryId);
    if (entry) {
      setFormData({
        date: entry.date,
        mood: entry.mood,
        note: entry.note,
        symptoms: entry.symptoms,
      });
      setEditingEntryId(entryId);
      setIsAddingEntry(true);
    }
  };
  
  const handleDelete = (entryId: string) => {
    deleteJournalEntry(entryId);
    setShowDeleteConfirm(null);
  };
  
  const handleCancel = () => {
    setIsAddingEntry(false);
    setEditingEntryId(null);
    resetForm();
  };
  
  // Render mood icon based on mood score
  const renderMoodIcon = (mood: MoodScore, size: number = 24) => {
    switch (mood) {
      case 1:
        return <Frown className={`w-${size} h-${size} text-error-500`} />;
      case 2:
        return <Frown className={`w-${size} h-${size} text-warning-500`} />;
      case 3:
        return <Meh className={`w-${size} h-${size} text-neutral-500`} />;
      case 4:
        return <Smile className={`w-${size} h-${size} text-success-400`} />;
      case 5:
        return <Smile className={`w-${size} h-${size} text-success-500`} />;
      default:
        return <Meh className={`w-${size} h-${size} text-neutral-500`} />;
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <div>
      <PageHeader
        title="Your Journal"
        subtitle="Track your moods, symptoms, and journey through postpartum"
        icon={<BookHeart className="w-8 h-8" />}
      />
      
      {!isAddingEntry ? (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-semibold">Your Entries</h2>
            <Button
              variant="primary"
              onClick={() => setIsAddingEntry(true)}
              icon={<Plus className="w-5 h-5" />}
            >
              Add Entry
            </Button>
          </div>
          
          {journalEntries.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-soft text-center">
              <BookHeart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Journal Entries Yet</h3>
              <p className="text-neutral-600 mb-6">
                Start tracking your postpartum journey by adding your first entry.
              </p>
              <Button
                variant="primary"
                onClick={() => setIsAddingEntry(true)}
              >
                Create Your First Entry
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-xl shadow-soft overflow-hidden"
                >
                  <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-primary-500 mr-2" />
                      <span className="font-medium">{formatDate(entry.date)}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleEdit(entry.id)}
                        className="text-neutral-500 hover:text-primary-500 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(entry.id)}
                        className="text-neutral-500 hover:text-error-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">{renderMoodIcon(entry.mood, 8)}</div>
                      <div>
                        <div className="text-sm text-neutral-500 mb-1">Mood</div>
                        <div className="font-medium">
                          {entry.mood === 1 && "Very Low"}
                          {entry.mood === 2 && "Low"}
                          {entry.mood === 3 && "Neutral"}
                          {entry.mood === 4 && "Good"}
                          {entry.mood === 5 && "Very Good"}
                        </div>
                      </div>
                    </div>
                    
                    {entry.note && (
                      <div className="mb-4">
                        <div className="text-sm text-neutral-500 mb-1">Notes</div>
                        <p className="text-neutral-700">{entry.note}</p>
                      </div>
                    )}
                    
                    {entry.symptoms.length > 0 && (
                      <div>
                        <div className="text-sm text-neutral-500 mb-2">Symptoms</div>
                        <div className="flex flex-wrap gap-2">
                          {entry.symptoms.map((symptom, idx) => (
                            <span 
                              key={idx}
                              className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {showDeleteConfirm === entry.id && (
                    <div className="px-6 py-4 bg-error-50 border-t border-error-100">
                      <p className="text-error-700 mb-3">Are you sure you want to delete this entry?</p>
                      <div className="flex space-x-3">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleDelete(entry.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDeleteConfirm(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8"
          >
            <h2 className="text-2xl font-serif font-semibold mb-6">
              {editingEntryId ? 'Edit Journal Entry' : 'New Journal Entry'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input"
                  max={todayFormatted}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  How are you feeling today?
                </label>
                <div className="flex justify-between md:justify-start md:space-x-8 items-center">
                  {[1, 2, 3, 4, 5].map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => handleMoodSelect(mood as MoodScore)}
                      className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                        formData.mood === mood
                          ? 'bg-primary-100'
                          : 'hover:bg-neutral-100'
                      }`}
                    >
                      <div className="mb-1">
                        {renderMoodIcon(mood as MoodScore, 8)}
                      </div>
                      <span className="text-sm">
                        {mood === 1 && "Very Low"}
                        {mood === 2 && "Low"}
                        {mood === 3 && "Neutral"}
                        {mood === 4 && "Good"}
                        {mood === 5 && "Very Good"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="note" className="block text-sm font-medium text-neutral-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={4}
                  className="input"
                  placeholder="How are you feeling? What's on your mind?"
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Symptoms (Optional)
                </label>
                <p className="text-sm text-neutral-500 mb-3">
                  Select any symptoms you're experiencing today:
                </p>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`px-3 py-1 rounded-full transition-colors ${
                        formData.symptoms.includes(symptom)
                          ? 'bg-primary-300 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                >
                  {editingEntryId ? 'Update Entry' : 'Save Entry'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
      
      {!isAddingEntry && journalEntries.length > 0 && (
        <div className="bg-accent-50 rounded-xl p-6 border border-accent-100">
          <h3 className="text-xl font-serif font-semibold mb-4">Journal Insights</h3>
          <p className="text-neutral-700 mb-6">
            Regular journaling helps track patterns in your postpartum journey. Look for trends in your mood and symptoms to better understand your needs and recovery.
          </p>
          <div className="flex justify-between items-center">
            <Button
              variant="accent"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              View Mood Patterns
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;