import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, Milk, HandHeart, Heart, MessageCircle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { useAppContext } from '../context/AppContext';

const BreastfeedingSupport: React.FC = () => {
  const { appState } = useAppContext();
  const { userProfile } = appState;
  const [activeTab, setActiveTab] = useState(userProfile.feedingMethod || 'general');

  const feedingTabs = [
    { id: 'general', label: 'General Support' },
    { id: 'breastfeeding', label: 'Breastfeeding' },
    { id: 'formula', label: 'Formula Feeding' },
    { id: 'combo', label: 'Combination Feeding' },
    { id: 'challenges', label: 'Common Challenges' },
  ];

  const breastfeedingChallenges = [
    {
      title: "Latching Difficulties",
      description: "A proper latch is crucial for effective breastfeeding. If your baby is struggling to latch, it can cause pain and reduced milk transfer.",
      tips: [
        "Try different positions like cross-cradle or side-lying",
        "Ensure baby's mouth is wide open before latching",
        "Use your finger to break the suction if you need to unlatch and try again",
        "Consider seeing a lactation consultant for personalized help"
      ]
    },
    {
      title: "Low Milk Supply",
      description: "Many mothers worry about their milk supply. True low supply is less common than perceived low supply, but both can be addressed.",
      tips: [
        "Nurse frequently, at least 8-12 times in 24 hours",
        "Ensure proper latch and milk transfer",
        "Stay hydrated and eat nutritious foods",
        "Consider power pumping (pump 20 mins, rest 10 mins, repeat for an hour)",
        "Avoid unnecessary supplementation which can signal reduced demand to your body"
      ]
    },
    {
      title: "Engorgement & Oversupply",
      description: "Breasts that are painfully full, hard, or leaking excessively. Can lead to plugged ducts or mastitis if not addressed.",
      tips: [
        "Apply cold compresses between feedings",
        "Express just enough milk to relieve discomfort, but not too much",
        "Try block feeding (using one breast for multiple feedings)",
        "Wear a supportive, non-restrictive bra",
        "Consider seeing a lactation consultant for oversupply issues"
      ]
    },
    {
      title: "Nipple Pain & Damage",
      description: "Sore, cracked, or bleeding nipples are not normal and usually indicate a fixable issue with positioning or latch.",
      tips: [
        "Check and correct baby's latch - their mouth should be wide open",
        "Apply expressed breastmilk or lanolin after feeding",
        "Change nursing positions to vary pressure points",
        "Air dry nipples after feeding",
        "If pain persists, check for tongue/lip ties or seek help from a lactation professional"
      ]
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-serif font-semibold mb-4">Feeding Your Baby With Love</h3>
              <p className="text-neutral-700 mb-4">
                However you choose to feed your baby - breast, bottle, formula, or a combination - know that you are providing not just nutrition, but also bonding, comfort, and love.
              </p>
              <p className="text-neutral-700 mb-4">
                The most important aspect of feeding is that both you and your baby are thriving. A stressed, exhausted, or unhappy parent cannot provide optimal care, so your wellbeing matters deeply in this equation.
              </p>
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-5 mb-6">
                <div className="flex items-start">
                  <HandHeart className="w-6 h-6 text-accent-500 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Our Feeding Philosophy</h4>
                    <p className="text-neutral-700">
                      We believe that informed choice matters. We'll provide evidence-based information about all feeding methods without judgment. Your mental health and relationship with your baby are paramount, and sometimes the best choice isn't the one you originally planned for.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-soft"
              >
                <h3 className="font-semibold mb-3 flex items-center">
                  <Baby className="w-5 h-5 text-primary-500 mr-2" />
                  Breastfeeding Benefits
                </h3>
                <ul className="space-y-2 text-neutral-700">
                  <li>• Custom nutrition that changes with baby's needs</li>
                  <li>• Antibodies to help fight infections</li>
                  <li>• Potential reduced risk of SIDS, allergies, and obesity</li>
                  <li>• May lower mother's risk of certain cancers</li>
                  <li>• Zero preparation required</li>
                  <li>• Free (though time is valuable too)</li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-soft"
              >
                <h3 className="font-semibold mb-3 flex items-center">
                  <Milk className="w-5 h-5 text-primary-500 mr-2" />
                  Formula Feeding Benefits
                </h3>
                <ul className="space-y-2 text-neutral-700">
                  <li>• Measurable intake - you know exactly how much baby ate</li>
                  <li>• Shared feeding duties with partners/family</li>
                  <li>• Consistent nutrition independent of maternal diet</li>
                  <li>• More predictable feeding schedule</li>
                  <li>• Can be necessary for medical reasons or maternal wellbeing</li>
                  <li>• May help some mothers get more sleep</li>
                </ul>
              </motion.div>
            </div>
            
            <div className="bg-secondary-50 border border-secondary-100 rounded-xl p-6">
              <div className="flex items-start mb-4">
                <Heart className="w-6 h-6 text-secondary-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">A Note on Feeding Pressure</h3>
                  <p className="text-neutral-700">
                    Many new parents feel tremendous pressure about their feeding choices. Remember that feeding methods aren't all-or-nothing, and your mental health matters deeply to your baby's wellbeing.
                  </p>
                </div>
              </div>
              <p className="pl-9 text-neutral-700">
                If breastfeeding is causing significant distress, anxiety, or depression, it's completely valid to choose another path. Formula is a safe, nutritious option that allows you to be the parent your baby needs - present, loving, and healthy.
              </p>
            </div>
          </div>
        );
        
      case 'breastfeeding':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-serif font-semibold mb-4">Breastfeeding Essentials</h3>
              <p className="text-neutral-700 mb-6">
                Breastfeeding is a learned skill for both you and your baby. It can take time to establish and may come with challenges, but with the right support, many obstacles can be overcome.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-soft">
                  <h4 className="font-semibold mb-3">Getting Started</h4>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Initiate breastfeeding within the first hour after birth if possible</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Feed on demand (typically 8-12 times in 24 hours)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Look for hunger cues: rooting, hand to mouth, sucking motions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Crying is a late hunger sign - try to feed earlier</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Monitor wet/dirty diapers to ensure adequate intake</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-soft">
                  <h4 className="font-semibold mb-3">Good Latch Signs</h4>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Baby's mouth is wide open with lips flanged outward</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>More areola visible above baby's top lip than below</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Baby's chin and nose touch the breast</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>You hear swallowing sounds</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Nursing may feel strong but shouldn't be painful</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-soft mb-8">
                <h4 className="font-semibold mb-3">Common Feeding Positions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Cradle Hold</p>
                    <p className="text-neutral-700 text-sm mb-3">
                      Baby's head rests in the crook of your elbow on the side you're nursing from, with their body along your forearm.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Cross-Cradle Hold</p>
                    <p className="text-neutral-700 text-sm mb-3">
                      Similar to cradle, but baby's head is supported by your hand opposite to the breast you're nursing from.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Football/Clutch Hold</p>
                    <p className="text-neutral-700 text-sm mb-3">
                      Baby is tucked under your arm like a football with their head supported by your hand on the same side as the nursing breast.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Side-Lying Position</p>
                    <p className="text-neutral-700 text-sm">
                      You and baby lie on your sides facing each other, great for nighttime feeds or recovering from birth.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <MessageCircle className="w-5 h-5 text-accent-500 mr-2" />
                  When to Seek Help
                </h4>
                <p className="text-neutral-700 mb-3">
                  Breastfeeding shouldn't be painful. If you're experiencing significant discomfort, or any of these issues, reach out to a lactation consultant:
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li>• Painful, damaged, or bleeding nipples</li>
                  <li>• Baby not gaining weight appropriately</li>
                  <li>• Fewer wet/dirty diapers than expected</li>
                  <li>• Consistent difficulty latching</li>
                  <li>• Signs of plugged ducts or mastitis (pain, redness, warmth)</li>
                  <li>• Your own intuition that something isn't right</li>
                </ul>
              </div>
            </div>
          </div>
        );
        
      case 'formula':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-serif font-semibold mb-4">Formula Feeding Guidance</h3>
              <p className="text-neutral-700 mb-6">
                Formula feeding is a safe, nutritious way to feed your baby. Modern formulas are designed to provide complete nutrition for your growing infant.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-soft">
                  <h4 className="font-semibold mb-3">Choosing a Formula</h4>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Standard cow's milk-based formulas work well for most babies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Specialized formulas (sensitive, hypoallergenic, etc.) may be needed for some babies</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Consult your pediatrician before switching formulas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Generic/store brands meet the same FDA requirements as name brands</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-soft">
                  <h4 className="font-semibold mb-3">Safe Preparation</h4>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Always wash hands before preparing formula</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Follow the manufacturer's instructions for mixing exactly</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Use clean water from a safe source</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Discard any formula left in the bottle after feeding</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Clean and sterilize bottles regularly</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-soft mb-8">
                <h4 className="font-semibold mb-3">Feeding Amounts & Schedule</h4>
                <p className="text-neutral-700 mb-4">
                  Every baby's needs are different, but these guidelines can help you start:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Newborn - 1 month</p>
                    <ul className="text-neutral-700 text-sm space-y-1">
                      <li>• 2-3 oz per feeding</li>
                      <li>• 8-12 feedings in 24 hours</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-primary-600 mb-1">1-3 months</p>
                    <ul className="text-neutral-700 text-sm space-y-1">
                      <li>• 4-5 oz per feeding</li>
                      <li>• 6-8 feedings in 24 hours</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-primary-600 mb-1">3-6 months</p>
                    <ul className="text-neutral-700 text-sm space-y-1">
                      <li>• 6-8 oz per feeding</li>
                      <li>• 4-6 feedings in 24 hours</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 mt-4">
                  Always follow your baby's hunger cues. They may want more or less than these suggestions.
                </p>
              </div>
              
              <div className="bg-secondary-50 border border-secondary-100 rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <Heart className="w-6 h-6 text-secondary-500 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Making Formula Feeding Special</h4>
                    <p className="text-neutral-700">
                      Formula feeding can be just as nurturing and bonding as breastfeeding. Try these tips to make feeding time special:
                    </p>
                  </div>
                </div>
                <ul className="pl-9 space-y-2 text-neutral-700">
                  <li>• Maintain skin-to-skin contact during feeds when possible</li>
                  <li>• Hold baby close and maintain eye contact</li>
                  <li>• Talk, sing, or hum softly to your baby</li>
                  <li>• Alternate which arm you hold baby in to provide different perspectives</li>
                  <li>• Never prop bottles - holding baby during feeding is important for safety and bonding</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'combo':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-serif font-semibold mb-4">Combination Feeding Strategies</h3>
              <p className="text-neutral-700 mb-6">
                Combination feeding (using both breast milk and formula) offers flexibility while maintaining some of the benefits of breastfeeding. It can be a great middle path for many families.
              </p>
              
              <div className="bg-white rounded-xl p-6 shadow-soft mb-8">
                <h4 className="font-semibold mb-3">Common Approaches</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Breastfeeding + Occasional Formula</p>
                    <p className="text-neutral-700 mb-2">
                      Primarily breastfeed, but offer formula for occasional feedings when needed (e.g., when you're away, for an evening out, or to let partner feed).
                    </p>
                    <p className="text-sm text-neutral-500">
                      This approach maintains your milk supply while offering flexibility.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Scheduled Combination</p>
                    <p className="text-neutral-700 mb-2">
                      Designate specific feedings for breast and others for formula in a consistent pattern.
                    </p>
                    <p className="text-sm text-neutral-500">
                      For example, breastfeed in the morning and evening, but use formula during the day or overnight.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Supplement After Breastfeeding</p>
                    <p className="text-neutral-700 mb-2">
                      Offer the breast first, then "top up" with formula if baby seems to need more.
                    </p>
                    <p className="text-sm text-neutral-500">
                      Good for babies who aren't gaining well on exclusive breastfeeding or during growth spurts.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-primary-600 mb-1">Breastmilk + Formula in the Same Bottle</p>
                    <p className="text-neutral-700 mb-2">
                      Mix pumped breast milk with formula in the same bottle.
                    </p>
                    <p className="text-sm text-neutral-500">
                      This can extend breast milk supply and provide a familiar taste for babies transitioning to formula.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-soft">
                  <h4 className="font-semibold mb-3">Tips for Success</h4>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Establish breastfeeding first (if possible) before introducing formula</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Keep a consistent feeding schedule to maintain milk supply</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>If reducing breastfeeding, do so gradually to prevent engorgement</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Try different bottle nipples to find one your baby accepts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Have someone else offer the bottle initially if baby resists</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-soft">
                  <h4 className="font-semibold mb-3">Managing Milk Supply</h4>
                  <ul className="space-y-3 text-neutral-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Your body works on supply and demand - less nursing generally means less milk</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>To maintain supply, pump when skipping a feeding</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>To gradually reduce supply, slowly increase time between breastfeeding sessions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                      <span>Watch for signs of mastitis when changing feeding patterns</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <HandHeart className="w-5 h-5 text-accent-500 mr-2" />
                  Benefits of Combination Feeding
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2 text-neutral-700">
                      <li>• Flexibility for work, social events, or rest</li>
                      <li>• Partner can participate in feeding</li>
                      <li>• Can continue partial breastfeeding when exclusive becomes challenging</li>
                      <li>• Baby still receives some breast milk benefits</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2 text-neutral-700">
                      <li>• Can relieve pressure for struggling breastfeeding relationships</li>
                      <li>• May help extend the overall breastfeeding duration</li>
                      <li>• Works with various lifestyles and circumstances</li>
                      <li>• Allows maternal rest while maintaining breastfeeding</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'challenges':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-serif font-semibold mb-4">Common Challenges & Solutions</h3>
              <p className="text-neutral-700 mb-6">
                Feeding challenges are normal and often temporary. With the right support and information, many issues can be resolved.
              </p>
              
              <div className="space-y-6">
                {breastfeedingChallenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-soft"
                  >
                    <h4 className="font-semibold mb-2">{challenge.title}</h4>
                    <p className="text-neutral-700 mb-4">{challenge.description}</p>
                    <div>
                      <p className="font-medium text-primary-600 mb-2">Solutions to Try:</p>
                      <ul className="space-y-2">
                        {challenge.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 mr-3"></div>
                            <span className="text-neutral-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-soft"
                >
                  <h4 className="font-semibold mb-2">Formula Feeding Challenges</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-medium text-primary-600 mb-1">Gas & Fussiness</p>
                      <p className="text-neutral-700 mb-2">
                        Some babies experience more gas or fussiness with formula feeding.
                      </p>
                      <ul className="space-y-1 text-neutral-700 text-sm">
                        <li>• Try paced bottle feeding to reduce air intake</li>
                        <li>• Burp frequently during and after feedings</li>
                        <li>• Consider different bottle types with anti-colic features</li>
                        <li>• Discuss specialized formulas with your pediatrician</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-primary-600 mb-1">Bottle Rejection</p>
                      <p className="text-neutral-700 mb-2">
                        Some babies resist taking a bottle, especially if transitioning from breast.
                      </p>
                      <ul className="space-y-1 text-neutral-700 text-sm">
                        <li>• Try different nipple shapes and flow rates</li>
                        <li>• Have someone other than the breastfeeding parent offer the bottle</li>
                        <li>• Offer when baby is hungry but not starving</li>
                        <li>• Try skin-to-skin contact during bottle feeds</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="bg-secondary-50 border border-secondary-100 rounded-xl p-6">
              <div className="flex items-start mb-4">
                <Heart className="w-6 h-6 text-secondary-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">When to Get Professional Help</h3>
                  <p className="text-neutral-700">
                    While many feeding challenges can be addressed with at-home solutions, some situations warrant professional support:
                  </p>
                </div>
              </div>
              <ul className="pl-9 space-y-2 text-neutral-700">
                <li>• Persistent nipple pain or damage</li>
                <li>• Poor weight gain or weight loss in baby</li>
                <li>• Signs of dehydration (less than 6 wet diapers in 24 hours, dark urine)</li>
                <li>• Persistent refusal to feed or extreme fussiness during feeding</li>
                <li>• Suspected tongue or lip tie affecting latch</li>
                <li>• Your mental health is suffering due to feeding challenges</li>
              </ul>
              <div className="pl-9 mt-4">
                <Button
                  variant="secondary"
                  size="sm"
                >
                  Find Lactation Support
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <PageHeader
        title="Feeding Support Center"
        subtitle="Resources and guidance for nurturing your baby, however you choose to feed"
        icon={<Baby className="w-8 h-8" />}
      />
      
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-1 md:space-x-2 min-w-max">
          {feedingTabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 font-medium shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-b-xl rounded-tr-xl shadow-soft p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default BreastfeedingSupport;