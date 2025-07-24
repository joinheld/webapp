import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Heart, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';

const PhysicalRecovery: React.FC = () => {
  const { appState } = useAppContext();
  const { userProfile } = appState;
  
  const currentWeek = userProfile.weekPostpartum || 1;
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  
  // Group recovery content by phases
  const recoveryPhases = [
    { 
      name: "First Month", 
      weeks: [1, 2, 3, 4],
      description: "Focus on rest and recovery. Your body has been through a major event and needs time to heal."
    },
    { 
      name: "Month 2-3", 
      weeks: [5, 6, 7, 8, 9, 10, 11, 12],
      description: "Gentle movement and beginning to rebuild strength as your body continues to heal."
    },
    { 
      name: "Month 4-6", 
      weeks: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      description: "Gradually increasing activity levels while continuing to support your body's recovery."
    },
    { 
      name: "Month 7-12", 
      weeks: Array.from({ length: 24 }, (_, i) => i + 25).filter(week => week <= 52),
      description: "Rebuilding strength and endurance as you approach the one-year postpartum mark."
    },
  ];
  
  // Get recovery content for the selected week
  const getWeekContent = (week: number) => {
    if (week <= 1) {
      return {
        title: "First Week Postpartum",
        body: "Your body is recovering from birth. Focus on rest, managing pain, and getting to know your baby. You may experience heavy bleeding (lochia), cramping as your uterus contracts, and discomfort from perineal tears or C-section incision.",
        tips: [
          "Rest as much as possible - sleep when your baby sleeps",
          "Use ice packs and sitz baths for perineal pain",
          "Take prescribed pain medication as needed",
          "Stay hydrated and eat nutritious foods",
          "Accept help with household tasks and baby care",
          "Avoid stairs and lifting anything heavier than your baby"
        ],
        warning: "Contact your healthcare provider immediately if you experience heavy bleeding that soaks through a pad in less than an hour, large clots, fever over 100.4°F, severe pain, or signs of infection."
      };
    } else if (week <= 2) {
      return {
        title: "Week 2 Postpartum",
        body: "Bleeding should begin to slow down. Your breasts may become fuller and firmer as milk production increases. Emotions may fluctuate as baby blues peak around this time. Continue to prioritize rest and recovery.",
        tips: [
          "Continue with pelvic rest (nothing in the vagina) until cleared by your provider",
          "Gentle walking around the house is beneficial",
          "Use supportive bras for breast comfort",
          "Pay attention to your mental health - baby blues typically peak now",
          "Maintain a small supply of nutritious snacks you can eat with one hand",
          "Stay connected with supportive friends and family"
        ]
      };
    } else if (week <= 4) {
      return {
        title: "Weeks 3-4 Postpartum",
        body: "Bleeding may taper off to spotting. You might start to feel more energetic, but be careful not to overdo it. Your uterus continues to shrink. Hormone levels are still fluctuating, which can affect your mood and energy.",
        tips: [
          "Short, gentle walks outside if you feel ready",
          "Continue to limit lifting and strenuous activities",
          "Practice deep breathing and gentle stretching",
          "Begin very gentle pelvic floor awareness exercises (consult your provider)",
          "Maintain good posture while feeding baby",
          "Prepare for your postpartum checkup (typically at 6 weeks)"
        ]
      };
    } else if (week <= 6) {
      return {
        title: "Weeks 5-6 Postpartum",
        body: "Around this time, you'll have your postpartum checkup. Your provider will assess your healing and may clear you for more activities, including exercise and sexual activity. Your body is still recovering, even if you feel better.",
        tips: [
          "Discuss any concerns with your healthcare provider at your checkup",
          "If cleared, begin gentle targeted exercises for core and pelvic floor",
          "Listen to your body - discomfort is a sign to slow down",
          "Be prepared for possible changes in sexual function and comfort",
          "Continue to practice good posture and body mechanics",
          "Consider a consultation with a pelvic floor physical therapist"
        ]
      };
    } else if (week <= 12) {
      return {
        title: "Weeks 7-12 Postpartum",
        body: "This phase is often called the 'fourth trimester.' Your body continues to heal and adjust. Hormone levels are still normalizing. Many people feel more like themselves, but remember that recovery is a gradual process.",
        tips: [
          "Gradually increase activity as tolerated, but avoid high-impact exercise",
          "Focus on rebuilding core strength with exercises like modified planks",
          "Pay attention to alignment and posture during baby care activities",
          "Check for diastasis recti (abdominal separation) before progressing exercise",
          "Consider joining a postpartum-specific exercise class",
          "Stay attentive to your mental health as hormones continue to shift"
        ]
      };
    } else if (week <= 24) {
      return {
        title: "Months 4-6 Postpartum",
        body: "By now, many physical recovery milestones have been reached, though some changes may persist. You may feel ready to return to more of your pre-pregnancy activities, but continue to listen to your body.",
        tips: [
          "Gradually increase exercise intensity if your body feels ready",
          "Continue to strengthen your core and pelvic floor",
          "Be mindful of how your body responds to increased activity",
          "Address any lingering physical discomfort with your healthcare provider",
          "Remember that breastfeeding can affect hormone levels and recovery timeline",
          "Practice stress-reduction techniques as you balance recovery with baby care"
        ]
      };
    } else {
      return {
        title: "Beyond 6 Months Postpartum",
        body: "While many consider postpartum recovery 'complete' by this point, the journey continues. Some physical changes may persist or become your new normal. Continue to nurture your body and address any ongoing concerns.",
        tips: [
          "Focus on overall wellness rather than 'getting your body back'",
          "Address any persistent issues with appropriate specialists",
          "Regular exercise can help with energy, mood, and physical recovery",
          "Prioritize sleep when possible",
          "Remember that everyone's postpartum journey is different",
          "Find movement that brings you joy and fits into your life as a parent"
        ]
      };
    }
  };
  
  const weekContent = getWeekContent(selectedWeek);
  
  // Find which phase the selected week belongs to
  const currentPhase = recoveryPhases.find(phase => phase.weeks.includes(selectedWeek));
  
  return (
    <div>
      <PageHeader
        title="Physical Recovery"
        subtitle="Understanding your body's healing journey after childbirth"
        icon={<Activity className="w-8 h-8" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Phase Selection */}
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-soft p-6 mb-6"
          >
            <h3 className="font-serif text-xl font-semibold mb-4">Recovery Phases</h3>
            
            <div className="space-y-4">
              {recoveryPhases.map((phase, index) => (
                <div key={index} className="border-b border-neutral-200 pb-4 last:border-b-0">
                  <button
                    className={`text-left w-full rounded-lg p-3 transition-colors ${
                      phase.weeks.includes(selectedWeek)
                        ? 'bg-primary-50 text-primary-700'
                        : 'hover:bg-neutral-100'
                    }`}
                    onClick={() => setSelectedWeek(phase.weeks[0])}
                  >
                    <div className="font-medium">{phase.name}</div>
                    <div className="text-sm text-neutral-500">Weeks {phase.weeks[0]}-{phase.weeks[phase.weeks.length - 1]}</div>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3 className="font-serif text-xl font-semibold mb-4">Your Timeline</h3>
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-primary-500 mr-2" />
              <div>
                <div className="text-neutral-500">You are in</div>
                <div className="font-medium">Week {currentWeek}</div>
              </div>
            </div>
            
            {currentPhase && (
              <div className="text-sm text-neutral-600 mb-4">
                {currentPhase.description}
              </div>
            )}
            
            <Button
              variant="primary"
              onClick={() => setSelectedWeek(currentWeek)}
              fullWidth
              size="sm"
            >
              Jump to Your Current Week
            </Button>
          </motion.div>
        </div>
        
        {/* Week Content */}
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={selectedWeek} // Add key to force re-render and animation when week changes
            className="bg-white rounded-xl shadow-soft overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary-100 to-primary-50 px-6 py-4 border-b border-primary-200">
              <div className="text-sm text-primary-600 font-medium mb-1">
                Week {selectedWeek}
              </div>
              <h2 className="text-2xl font-serif font-semibold">
                {weekContent.title}
              </h2>
            </div>
            
            <div className="p-6">
              <div className="prose max-w-none mb-6">
                <p className="text-neutral-700">{weekContent.body}</p>
              </div>
              
              {weekContent.warning && (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6">
                  <div className="font-medium text-error-700 mb-1">Important</div>
                  <div className="text-error-600 text-sm">{weekContent.warning}</div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 text-accent-500 mr-2" />
                  <h3 className="font-semibold text-lg">Recovery Tips</h3>
                </div>
                <ul className="space-y-3">
                  {weekContent.tips.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <div className="text-neutral-700">{tip}</div>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selectedWeek <= 1}
                  onClick={() => setSelectedWeek(selectedWeek - 1)}
                >
                  Previous Week
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selectedWeek >= 52}
                  onClick={() => setSelectedWeek(selectedWeek + 1)}
                >
                  Next Week
                </Button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 bg-secondary-50 rounded-xl p-6 border border-secondary-100"
          >
            <div className="flex items-start mb-4">
              <Heart className="w-6 h-6 text-secondary-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Remember</h3>
                <p className="text-neutral-700">
                  Every body is different, and recovery is not linear. Your journey is unique, and it's okay if your recovery doesn't match someone else's timeline. Listen to your body and be patient with yourself.
                </p>
              </div>
            </div>
            <div className="pl-9">
              <p className="text-neutral-700 mb-4">
                If you're experiencing persistent pain, discomfort, or concerns about your physical recovery, please speak with your healthcare provider. Some issues that seem "normal" actually benefit from treatment.
              </p>
              <p className="text-neutral-700">
                A pelvic floor physical therapist can be incredibly helpful for addressing many postpartum physical concerns, including pain, incontinence, and diastasis recti.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalRecovery;