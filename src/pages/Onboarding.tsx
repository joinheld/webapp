import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';

const Onboarding: React.FC = () => {
  const { updateUserProfile } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    weekPostpartum: 1,
    birthDate: '',
    feedingMethod: '',
  });

  const totalSteps = 3;

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save data and navigate to home
      updateUserProfile({
        ...formData,
        hasCompletedOnboarding: true,
      });
      navigate('/');
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'weekPostpartum' ? parseInt(value, 10) : value,
    });
  };

  // Variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-8"
      >
        <Flower className="w-10 h-10 text-primary-300 mr-3" />
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-600">held</h1>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-medium w-full max-w-md p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  idx + 1 <= step
                    ? 'bg-primary-300 text-white'
                    : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {idx + 1 <= step ? <Check className="w-5 h-5" /> : idx + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-neutral-200 h-2 rounded-full">
            <div
              className="bg-primary-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <h2 className="text-2xl font-serif font-semibold mb-6">Welcome to held</h2>
              <p className="mb-6 text-neutral-700">
                Let's personalize your experience. We'll ask a few questions to provide you with tailored support for your postpartum journey.
              </p>
              <div className="mb-6">
                <label htmlFor="name" className="label">What should we call you?</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Your name"
                  required
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <h2 className="text-2xl font-serif font-semibold mb-6">Your Postpartum Timeline</h2>
              <p className="mb-6 text-neutral-700">
                This helps us provide resources relevant to your current stage of recovery.
              </p>
              <div className="mb-6">
                <label htmlFor="weekPostpartum" className="label">How many weeks postpartum are you?</label>
                <input
                  type="number"
                  id="weekPostpartum"
                  name="weekPostpartum"
                  min="1"
                  max="104"
                  value={formData.weekPostpartum}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
                <p className="text-xs text-neutral-500 mt-2">
                  Enter a number between 1 and 104 (up to 2 years postpartum)
                </p>
              </div>
              <div className="mb-6">
                <label htmlFor="birthDate" className="label">When did you give birth? (Optional)</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <h2 className="text-2xl font-serif font-semibold mb-6">Feeding Preferences</h2>
              <p className="mb-6 text-neutral-700">
                We'll provide resources based on your feeding method, but remember you can always access all resources regardless of your choice.
              </p>
              <div className="mb-6">
                <label htmlFor="feedingMethod" className="label">How are you currently feeding your baby?</label>
                <select
                  id="feedingMethod"
                  name="feedingMethod"
                  value={formData.feedingMethod}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">Select feeding method</option>
                  <option value="breastfeeding">Exclusively breastfeeding</option>
                  <option value="formula">Exclusively formula feeding</option>
                  <option value="combo">Combination feeding</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <p className="text-sm text-neutral-600 mb-6">
                All feeding methods are valid choices. We're here to support your journey, whatever path you choose.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              icon={<ArrowLeft className="w-5 h-5" />}
              iconPosition="left"
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            variant="primary"
            onClick={handleNextStep}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            {step === totalSteps ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;