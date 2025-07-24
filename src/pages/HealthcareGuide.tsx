import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckSquare, AlertTriangle, MessageSquare, ClipboardList, PlusCircle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';

interface QuestionTemplate {
  id: string;
  question: string;
  category: string;
  importance: 'high' | 'medium' | 'low';
}

const HealthcareGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  
  // Sample questions for provider conversations
  const questionTemplates: QuestionTemplate[] = [
    {
      id: '1',
      question: "I'm experiencing ongoing pain/discomfort in my perineum/c-section site. Is this normal at this stage?",
      category: "physical",
      importance: "high"
    },
    {
      id: '2',
      question: "I'm having trouble sleeping even when my baby is sleeping. Could this be related to postpartum anxiety?",
      category: "mental",
      importance: "high"
    },
    {
      id: '3',
      question: "I've been feeling overwhelmed and tearful nearly every day. How can I tell if this is baby blues or postpartum depression?",
      category: "mental",
      importance: "high"
    },
    {
      id: '4',
      question: "I'm having urinary incontinence when I cough, laugh, or exercise. Is this something that will resolve on its own?",
      category: "physical",
      importance: "medium"
    },
    {
      id: '5',
      question: "I'm interested in starting birth control. What options are safe while breastfeeding?",
      category: "healthcare",
      importance: "medium"
    },
    {
      id: '6',
      question: "My libido has decreased significantly since giving birth. Is this normal and when might it improve?",
      category: "physical",
      importance: "medium"
    },
    {
      id: '7',
      question: "I'm experiencing intrusive thoughts about harm coming to my baby. Is this a normal part of new parenthood?",
      category: "mental",
      importance: "high"
    },
    {
      id: '8',
      question: "When is it safe to resume exercise beyond gentle walking?",
      category: "physical",
      importance: "low"
    },
    {
      id: '9',
      question: "I'm feeling disconnected from my baby. Could this be a sign of postpartum depression?",
      category: "mental",
      importance: "high"
    },
    {
      id: '10',
      question: "I've been experiencing headaches frequently. Could this be hormone-related?",
      category: "physical",
      importance: "medium"
    }
  ];
  
  // Filter questions based on selected category
  const filteredQuestions = selectedCategory === 'all'
    ? questionTemplates
    : questionTemplates.filter(q => q.category === selectedCategory);
  
  // Toggle question selection
  const toggleQuestionSelection = (id: string) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };
  
  // Create list of selected questions
  const createQuestionList = () => {
    // Implementation would typically involve generating a printable/shareable list
    alert('Your personalized question list has been created. In a production environment, this would be available to print or share with your provider.');
  };
  
  return (
    <div>
      <PageHeader
        title="Healthcare Appointment Guide"
        subtitle="Get the most from your provider visits with prepared questions and screening information"
        icon={<Heart className="w-8 h-8" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-soft p-6 mb-6"
          >
            <h3 className="font-serif text-xl font-semibold mb-4">Question Categories</h3>
            
            <div className="space-y-2">
              <button
                className={`text-left w-full rounded-lg p-3 transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-neutral-100'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                All Questions
              </button>
              <button
                className={`text-left w-full rounded-lg p-3 transition-colors ${
                  selectedCategory === 'physical'
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-neutral-100'
                }`}
                onClick={() => setSelectedCategory('physical')}
              >
                Physical Recovery
              </button>
              <button
                className={`text-left w-full rounded-lg p-3 transition-colors ${
                  selectedCategory === 'mental'
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-neutral-100'
                }`}
                onClick={() => setSelectedCategory('mental')}
              >
                Mental Health
              </button>
              <button
                className={`text-left w-full rounded-lg p-3 transition-colors ${
                  selectedCategory === 'healthcare'
                    ? 'bg-primary-50 text-primary-700'
                    : 'hover:bg-neutral-100'
                }`}
                onClick={() => setSelectedCategory('healthcare')}
              >
                General Healthcare
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3 className="font-serif text-xl font-semibold mb-4">Selected Questions</h3>
            {selectedQuestions.length === 0 ? (
              <p className="text-neutral-500 text-sm">
                Select questions from the list to create your personalized discussion guide.
              </p>
            ) : (
              <div>
                <p className="text-sm text-neutral-600 mb-4">
                  You've selected {selectedQuestions.length} question{selectedQuestions.length !== 1 ? 's' : ''} for your appointment.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={createQuestionList}
                  icon={<ClipboardList className="w-4 h-4" />}
                  fullWidth
                >
                  Create Question List
                </Button>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-soft overflow-hidden mb-8"
          >
            <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
              <h3 className="font-semibold text-lg flex items-center">
                <MessageSquare className="w-5 h-5 text-primary-500 mr-2" />
                Question Templates
              </h3>
              <p className="text-sm text-neutral-600">
                Select questions to include in your personalized provider discussion guide.
              </p>
            </div>
            
            <div className="p-4">
              {filteredQuestions.map((q) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`border rounded-lg p-4 mb-3 ${
                    selectedQuestions.includes(q.id)
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-200 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div 
                      className="cursor-pointer mr-3 mt-1"
                      onClick={() => toggleQuestionSelection(q.id)}
                    >
                      {selectedQuestions.includes(q.id) ? (
                        <CheckSquare className="w-5 h-5 text-primary-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-neutral-300 rounded-sm"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div 
                        className="text-neutral-800 mb-2 cursor-pointer"
                        onClick={() => toggleQuestionSelection(q.id)}
                      >
                        {q.question}
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                          q.category === 'physical'
                            ? 'bg-accent-100 text-accent-700'
                            : q.category === 'mental'
                              ? 'bg-secondary-100 text-secondary-700'
                              : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {q.category === 'physical' ? 'Physical' : q.category === 'mental' ? 'Mental Health' : 'Healthcare'}
                        </span>
                        {q.importance === 'high' && (
                          <span className="ml-2 flex items-center text-xs text-error-600">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            High priority
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200">
              <div className="flex items-center text-primary-600 cursor-pointer">
                <PlusCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Add custom question</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-soft overflow-hidden"
          >
            <div className="bg-secondary-50 px-6 py-4 border-b border-secondary-100">
              <h3 className="font-semibold text-lg flex items-center">
                <AlertTriangle className="w-5 h-5 text-secondary-500 mr-2" />
                Inadequate Screening Concerns
              </h3>
            </div>
            
            <div className="p-6">
              <p className="text-neutral-700 mb-4">
                Many new mothers report receiving inadequate mental health screening during postpartum care. Standard screening tools are often rushed and may not capture the full spectrum of postpartum mental health concerns.
              </p>
              
              <div className="bg-neutral-100 rounded-lg p-4 mb-6">
                <h4 className="font-medium mb-2">Common Screening Issues:</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-error-500 mt-2 mr-2"></div>
                    <span>Brief questionnaires that don't probe beyond surface-level symptoms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-error-500 mt-2 mr-2"></div>
                    <span>Focus primarily on depression while missing anxiety, OCD, or PTSD symptoms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-error-500 mt-2 mr-2"></div>
                    <span>Lack of follow-up for concerning scores</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-error-500 mt-2 mr-2"></div>
                    <span>Screening only once during the postpartum period (typically at 6 weeks)</span>
                  </li>
                </ul>
              </div>
              
              <h4 className="font-medium mb-3">Advocating for Better Screening:</h4>
              <div className="space-y-3 text-neutral-700">
                <p>
                  <span className="font-medium">Ask for comprehensive assessment:</span> "I'd like to discuss my mental health more thoroughly than just the questionnaire."
                </p>
                <p>
                  <span className="font-medium">Request follow-up screening:</span> "Can we schedule additional mental health check-ins at 3, 6, and 9 months postpartum?"
                </p>
                <p>
                  <span className="font-medium">Inquire about resources:</span> "What mental health resources do you recommend for new mothers in our area?"
                </p>
                <p>
                  <span className="font-medium">Be specific about symptoms:</span> "Beyond feeling sad, I'm experiencing [specific symptoms]. Is this something we should address?"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100 mb-8">
        <h3 className="text-xl font-serif font-semibold mb-4">Your Postpartum Care Plan</h3>
        <p className="text-neutral-700 mb-6">
          The American College of Obstetricians and Gynecologists recommends ongoing care throughout the postpartum period, not just a single 6-week visit. Discuss with your provider how they plan to support your recovery over the first year.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-soft">
            <h4 className="font-medium mb-2">First 3 Weeks</h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>• Initial contact within 3 days of birth</li>
              <li>• Follow-up care as needed</li>
              <li>• Assessment of pain, bleeding, breastfeeding</li>
              <li>• Initial mental health screening</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-soft">
            <h4 className="font-medium mb-2">4-12 Weeks</h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>• Comprehensive postpartum visit</li>
              <li>• Physical recovery assessment</li>
              <li>• Contraception planning</li>
              <li>• Thorough mental health screening</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-soft">
            <h4 className="font-medium mb-2">Ongoing Care</h4>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>• Additional follow-up as needed</li>
              <li>• Continued mental health monitoring</li>
              <li>• Referrals to specialists if required</li>
              <li>• Transition to well-woman care</li>
            </ul>
          </div>
        </div>
        <Button
          variant="secondary"
        >
          Create Personal Care Plan
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-serif font-semibold mb-6">Provider Communication Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="font-semibold mb-3">Getting Your Needs Met</h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                <span><strong>Be specific.</strong> Instead of "I don't feel right," try "I've been experiencing racing thoughts at night that prevent me from sleeping, even when my baby is asleep."</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                <span><strong>Use a symptom journal.</strong> Track specific symptoms, their frequency, and impact on daily functioning to present concrete information.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                <span><strong>Bring an advocate.</strong> Have your partner or a trusted friend accompany you to appointments to help communicate your concerns.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                <span><strong>Don't minimize.</strong> Avoid phrases like "It's probably nothing" or "I'm just being sensitive." Your concerns are valid.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="font-semibold mb-3">When You're Not Being Heard</h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                <span><strong>Be persistent.</strong> "I need you to address this concern before I leave today."</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                <span><strong>Ask direct questions.</strong> "What specific tests can we do to rule out physical causes?" or "What specialists would you recommend for this issue?"</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                <span><strong>Request documentation.</strong> "Please note these symptoms in my chart" ensures there's a record of your concerns.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                <span><strong>Consider a second opinion.</strong> You have the right to seek care from providers who take your concerns seriously.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthcareGuide;