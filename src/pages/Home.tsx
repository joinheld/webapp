import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Brain, Activity, Baby, Users, BookHeart, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ActionCard from '../components/common/ActionCard';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  const { appState } = useAppContext();
  const navigate = useNavigate();
  const { userProfile } = appState;

  useEffect(() => {
    // Redirect to onboarding if not completed
    if (!userProfile.hasCompletedOnboarding) {
      navigate('/onboarding');
    }
  }, [userProfile.hasCompletedOnboarding, navigate]);

  // Calculate what week to show resources for
  const currentWeek = userProfile.weekPostpartum || 1;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  return (
    <div>
      {/* Welcome Section */}
      <motion.section 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 transform translate-x-6 -translate-y-10 opacity-10">
            <Heart className="w-full h-full text-secondary-500" />
          </div>
          <div className="relative z-10 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Welcome back, {userProfile.name || 'Mom'}
            </h1>
            <p className="text-lg mb-6">
              You're in week <span className="font-semibold">{currentWeek}</span> of your postpartum journey. Remember, every step you take matters. How are you feeling today?
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                icon={<BookHeart className="w-5 h-5" />}
                onClick={() => navigate('/journal')}
              >
                Add Journal Entry
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/mental-health')}
              >
                Check Mental Health
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Navigation Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif font-semibold mb-6">Your Support Areas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard 
            title="Mental Health"
            description="Resources, assessments and guidance for your emotional wellbeing."
            icon={<Brain className="w-8 h-8" />}
            to="/mental-health"
            color="primary"
            delay={0}
          />
          <ActionCard 
            title="Physical Recovery"
            description="Week-by-week guidance to help your body heal."
            icon={<Activity className="w-8 h-8" />}
            to="/physical-recovery"
            color="secondary"
            delay={1}
          />
          <ActionCard 
            title="Feeding Support"
            description="Resources for breastfeeding, formula, and everything in between."
            icon={<Baby className="w-8 h-8" />}
            to="/breastfeeding"
            color="accent"
            delay={2}
          />
          <ActionCard 
            title="Community"
            description="Connect with other mothers on similar journeys."
            icon={<Users className="w-8 h-8" />}
            to="/community"
            color="primary"
            delay={3}
          />
          <ActionCard 
            title="Your Journal"
            description="Track your moods, thoughts, and feelings throughout your journey."
            icon={<BookHeart className="w-8 h-8" />}
            to="/journal"
            color="secondary"
            delay={4}
          />
          <ActionCard 
            title="Healthcare Guide"
            description="Prepare for doctor visits and get the most from your care providers."
            icon={<Heart className="w-8 h-8" />}
            to="/healthcare"
            color="accent"
            delay={5}
          />
        </div>
      </section>

      {/* Weekly Focus */}
      <motion.section 
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        custom={6}
      >
        <div className="bg-neutral-100 rounded-2xl p-8">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-accent-400 mr-2" />
            <h2 className="text-2xl font-serif font-semibold">Week {currentWeek} Focus</h2>
          </div>
          <p className="text-neutral-700 mb-6">
            {currentWeek < 6 ? (
              "Your body is still in major recovery mode. Rest is crucial right now. Give yourself grace and remember that asking for help is a strength, not a weakness."
            ) : currentWeek < 12 ? (
              "Your hormone levels are still adjusting, which can affect your mood and energy. Gentle movement may help, but listen to your body and rest when needed."
            ) : (
              "By this stage, many women begin feeling more like themselves, but remember that recovery is a journey. Continue to prioritize self-care and be patient with yourself."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-soft">
              <h4 className="font-semibold mb-2">Physical Tip</h4>
              <p className="text-neutral-600">
                {currentWeek < 6 ? (
                  "Limit stair climbing and heavy lifting. Your pelvic floor needs time to heal."
                ) : currentWeek < 12 ? (
                  "Try gentle walks and pelvic floor exercises if cleared by your healthcare provider."
                ) : (
                  "Consider joining a postpartum-specific exercise class designed for your recovery stage."
                )}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-soft">
              <h4 className="font-semibold mb-2">Mental Health Focus</h4>
              <p className="text-neutral-600">
                {currentWeek < 6 ? (
                  "Baby blues are common in the first two weeks. If feelings persist or worsen, please reach out for support."
                ) : currentWeek < 12 ? (
                  "Check in with yourself daily. Take note of persistent negative thoughts or feelings of being overwhelmed."
                ) : (
                  "Many assume you should feel 'back to normal' by now, but postpartum adjustment can take a full year or more."
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;