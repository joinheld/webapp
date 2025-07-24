import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, AlertTriangle, ArrowRight, ListChecks } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { useAppContext } from '../context/AppContext';

// Edinburgh Postnatal Depression Scale (EPDS) questions
const epdsQuestions = [
  "I have been able to laugh and see the funny side of things",
  "I have looked forward with enjoyment to things",
  "I have blamed myself unnecessarily when things went wrong",
  "I have been anxious or worried for no good reason",
  "I have felt scared or panicky for no good reason",
  "Things have been getting on top of me",
  "I have been so unhappy that I have had difficulty sleeping",
  "I have felt sad or miserable",
  "I have been so unhappy that I have been crying",
  "The thought of harming myself has occurred to me"
];

// Answer options for EPDS
const epdsOptions = [
  ["As much as I always could", "Not quite so much now", "Definitely not so much now", "Not at all"],
  ["As much as I ever did", "Rather less than I used to", "Definitely less than I used to", "Hardly at all"],
  ["Yes, most of the time", "Yes, some of the time", "Not very often", "No, never"],
  ["No, not at all", "Hardly ever", "Yes, sometimes", "Yes, very often"],
  ["Yes, quite a lot", "Yes, sometimes", "No, not much", "No, not at all"],
  ["Yes, most of the time I haven't been able to cope", "Yes, sometimes I haven't been coping as well as usual", "No, most of the time I have coped quite well", "No, I have been coping as well as ever"],
  ["Yes, most of the time", "Yes, sometimes", "Not very often", "No, not at all"],
  ["Yes, most of the time", "Yes, quite often", "Not very often", "No, not at all"],
  ["Yes, most of the time", "Yes, quite often", "Only occasionally", "No, never"],
  ["Yes, quite often", "Sometimes", "Hardly ever", "Never"]
];

const MentalHealth: React.FC = () => {
  const { saveAssessmentResult } = useAppContext();
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{score: number, risk: string} | null>(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < epdsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const score = calculateScore(newAnswers);
      const risk = evaluateRisk(score);
      const assessmentResult = { score, risk };
      setResult(assessmentResult);
      // Save to app state
      saveAssessmentResult('epds', assessmentResult);
    }
  };

  const calculateScore = (answers: number[]): number => {
    // EPDS scoring logic
    return answers.reduce((total, current, index) => {
      // Questions 1, 2, and 4 are reverse scored
      if (index === 0 || index === 1 || index === 3) {
        return total + (3 - current);
      }
      return total + current;
    }, 0);
  };

  const evaluateRisk = (score: number): string => {
    if (score >= 13) return "high";
    if (score >= 10) return "moderate";
    return "low";
  };

  const educationContent = [
    {
      title: "Postpartum Depression (PPD)",
      content: "More than just 'baby blues', PPD can cause severe mood swings, exhaustion, and a sense of hopelessness. It typically emerges within the first year after childbirth but can occur anytime during the first 24 months postpartum."
    },
    {
      title: "Postpartum Anxiety (PPA)",
      content: "Characterized by persistent worry, racing thoughts, and sometimes physical symptoms like dizziness or nausea. Many women experience PPA without depression, but it's equally important to address."
    },
    {
      title: "Postpartum PTSD",
      content: "Can develop after a traumatic childbirth experience, leading to flashbacks, avoidance behaviors, and heightened anxiety. This is a recognized condition that deserves proper treatment."
    },
    {
      title: "When to Seek Help",
      content: "If symptoms persist for more than two weeks, interfere with caring for your baby or yourself, or include thoughts of harming yourself or others, seek professional help immediately."
    }
  ];

  return (
    <div>
      <PageHeader
        title="Mental Health Support"
        subtitle="Understanding and navigating your emotional wellbeing after childbirth"
        icon={<Brain className="w-8 h-8" />}
      />

      {!showAssessment && !result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-soft p-6 mb-6"
            >
              <h3 className="text-xl font-serif font-semibold mb-4">Mental Health Screening</h3>
              <p className="text-neutral-700 mb-4">
                Take a few minutes to check in with yourself using our adaptation of the Edinburgh Postnatal Depression Scale (EPDS), a validated screening tool for postpartum mood disorders.
              </p>
              <p className="text-neutral-700 mb-4">
                This assessment can help identify potential signs of postpartum depression or anxiety, but it's not a diagnostic tool. Results should be discussed with your healthcare provider.
              </p>
              <Button
                onClick={handleStartAssessment}
                icon={<ListChecks className="w-5 h-5" />}
              >
                Start Assessment
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-warning-50 border border-warning-200 rounded-xl p-6"
            >
              <div className="flex items-start mb-4">
                <AlertTriangle className="w-6 h-6 text-warning-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Important Note</h4>
                  <p className="text-neutral-700">
                    If you're having thoughts of harming yourself or your baby, please seek immediate help:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Call the Suicide & Crisis Lifeline: 988</li>
                    <li>Text HOME to 741741 to reach the Crisis Text Line</li>
                    <li>Call 911 or go to your nearest emergency room</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3 className="text-xl font-serif font-semibold mb-4">Understanding Postpartum Mental Health</h3>
            <div className="space-y-5">
              {educationContent.map((item, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-primary-500 mb-2">{item.title}</h4>
                  <p className="text-neutral-700">{item.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {showAssessment && !result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-soft p-8 max-w-2xl mx-auto"
        >
          <div className="mb-6">
            <div className="w-full bg-neutral-200 h-2 rounded-full">
              <div
                className="bg-primary-300 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / epdsQuestions.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-right mt-2 text-sm text-neutral-500">
              Question {currentQuestion + 1} of {epdsQuestions.length}
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-6">
            {epdsQuestions[currentQuestion]}
          </h3>

          <div className="space-y-3">
            {epdsOptions[currentQuestion].map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-4 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-soft p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-serif font-semibold mb-4">Your Assessment Results</h3>
          
          <div className={`p-4 rounded-lg mb-6 ${
            result.risk === 'high' 
              ? 'bg-error-100 text-error-700' 
              : result.risk === 'moderate'
                ? 'bg-warning-100 text-warning-700'
                : 'bg-success-100 text-success-700'
          }`}>
            <div className="font-semibold mb-2">
              {result.risk === 'high' 
                ? 'Your score suggests a high risk' 
                : result.risk === 'moderate'
                  ? 'Your score suggests a moderate risk'
                  : 'Your score suggests a low risk'
              }
            </div>
            <div>
              Your score: {result.score} out of 30
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">What does this mean?</h4>
            <p className="text-neutral-700 mb-4">
              {result.risk === 'high' 
                ? 'Your responses indicate that you may be experiencing significant symptoms of postpartum depression or anxiety. We strongly recommend discussing these results with your healthcare provider as soon as possible.' 
                : result.risk === 'moderate'
                  ? 'Your responses suggest you may be experiencing some symptoms of postpartum depression or anxiety. Consider sharing these results with your healthcare provider at your next appointment.'
                  : 'Your responses suggest you are likely not experiencing significant symptoms of postpartum depression or anxiety at this time. Continue to monitor your feelings and reach out if you notice changes.'
              }
            </p>
            <p className="text-neutral-700">
              Remember, this screening is not a diagnosis. Only a qualified healthcare provider can properly diagnose postpartum mental health conditions.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleStartAssessment}
              variant="secondary"
            >
              Retake Assessment
            </Button>
            <Button
              onClick={() => setShowAssessment(false)}
              variant="outline"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Return to Resources
            </Button>
          </div>
        </motion.div>
      )}
      
      {!showAssessment && !result && (
        <section className="mt-10">
          <h2 className="text-2xl font-serif font-semibold mb-6">Common Symptoms to Be Aware Of</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-5 shadow-soft"
            >
              <h3 className="text-lg font-semibold mb-3">Emotional Symptoms</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>• Persistent sadness or emptiness</li>
                <li>• Irritability or anger</li>
                <li>• Feeling overwhelmed</li>
                <li>• Guilt or shame</li>
                <li>• Intense worry about baby's health</li>
                <li>• Loss of interest in activities</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-5 shadow-soft"
            >
              <h3 className="text-lg font-semibold mb-3">Physical Symptoms</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>• Changes in appetite</li>
                <li>• Insomnia or excessive sleeping</li>
                <li>• Fatigue beyond normal new-parent tiredness</li>
                <li>• Headaches, chest pain, heart palpitations</li>
                <li>• Hyperventilation</li>
                <li>• Nausea or stomach issues</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-xl p-5 shadow-soft"
            >
              <h3 className="text-lg font-semibold mb-3">Behavioral Symptoms</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>• Difficulty bonding with baby</li>
                <li>• Withdrawing from loved ones</li>
                <li>• Intrusive thoughts about harming self or baby</li>
                <li>• Avoidance of tasks or people</li>
                <li>• Persistent checking behaviors</li>
                <li>• Difficulty concentrating or making decisions</li>
              </ul>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MentalHealth;