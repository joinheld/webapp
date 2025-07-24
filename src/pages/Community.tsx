import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, CalendarCheck, MapPin, Search, Clock, Heart } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';

const communityGroups = [
  {
    id: 1,
    name: "New Moms Circle",
    type: "In-Person",
    location: "Community Center",
    schedule: "Tuesdays, 10:00 AM",
    description: "A weekly gathering for moms with babies 0-6 months to connect, share experiences, and find support.",
    memberCount: 24,
    tags: ["newborns", "first-time-moms", "weekly"]
  },
  {
    id: 2,
    name: "Working Moms Support",
    type: "Virtual",
    location: "Zoom",
    schedule: "Every other Thursday, 8:00 PM",
    description: "For mothers balancing careers and motherhood, focusing on practical strategies and emotional support.",
    memberCount: 42,
    tags: ["working-moms", "career", "balance"]
  },
  {
    id: 3,
    name: "Postpartum Wellness Group",
    type: "Hybrid",
    location: "Women's Center & Online",
    schedule: "Mondays, 1:00 PM",
    description: "Focused on mental health and emotional well-being after childbirth, facilitated by a licensed therapist.",
    memberCount: 18,
    tags: ["mental-health", "therapy", "emotional-support"]
  },
  {
    id: 4,
    name: "Single Parents Circle",
    type: "Virtual",
    location: "Discord Community",
    schedule: "24/7 chat, Weekly video calls",
    description: "A supportive online community for single parents navigating the joys and challenges of parenting solo.",
    memberCount: 73,
    tags: ["single-parents", "24-7-support", "community"]
  },
  {
    id: 5,
    name: "NICU Parents Connect",
    type: "Hybrid",
    location: "Hospital & Virtual",
    schedule: "Wednesdays, 7:00 PM",
    description: "Support for parents with babies who spent time in the NICU, addressing unique challenges and experiences.",
    memberCount: 31,
    tags: ["nicu", "preemies", "medical-support"]
  },
  {
    id: 6,
    name: "Breastfeeding Support Group",
    type: "In-Person",
    location: "Family Resource Center",
    schedule: "Fridays, 11:00 AM",
    description: "Led by a lactation consultant, this group offers practical help and encouragement for breastfeeding mothers.",
    memberCount: 29,
    tags: ["breastfeeding", "lactation", "feeding"]
  }
];

interface CommunityForums {
  [key: string]: {
    description: string;
    topics: {
      id: number;
      title: string;
      replies: number;
      latest: string;
      tags: string[];
    }[];
  };
}

const communityForums: CommunityForums = {
  "Mental Health": {
    description: "Discuss postpartum depression, anxiety, and emotional wellbeing in a safe, supportive space.",
    topics: [
      {
        id: 101,
        title: "Didn't realize I had PPA until 6 months in",
        replies: 28,
        latest: "2 hours ago",
        tags: ["anxiety", "delayed-diagnosis"]
      },
      {
        id: 102,
        title: "Partner doesn't understand my PPD",
        replies: 42,
        latest: "Yesterday",
        tags: ["depression", "relationship"]
      },
      {
        id: 103,
        title: "Intrusive thoughts - when to worry?",
        replies: 19,
        latest: "3 days ago",
        tags: ["intrusive-thoughts", "ocd"]
      }
    ]
  },
  "Physical Recovery": {
    description: "Share experiences and advice about healing after childbirth, from C-section recovery to pelvic floor health.",
    topics: [
      {
        id: 201,
        title: "Still having back pain 8 months postpartum",
        replies: 15,
        latest: "5 hours ago",
        tags: ["back-pain", "physical-therapy"]
      },
      {
        id: 202,
        title: "C-section scar sensitivity - normal?",
        replies: 34,
        latest: "Yesterday",
        tags: ["c-section", "recovery"]
      },
      {
        id: 203,
        title: "Pelvic floor PT experiences - share yours!",
        replies: 51,
        latest: "2 days ago",
        tags: ["pelvic-floor", "therapy"]
      }
    ]
  },
  "Feeding Journey": {
    description: "Breastfeeding, formula, combination feeding, weaning - all feeding discussions welcome here.",
    topics: [
      {
        id: 301,
        title: "Switching to formula saved my mental health",
        replies: 87,
        latest: "1 hour ago",
        tags: ["formula", "mental-health"]
      },
      {
        id: 302,
        title: "Low supply struggles and wins",
        replies: 45,
        latest: "Yesterday",
        tags: ["breastfeeding", "low-supply"]
      },
      {
        id: 303,
        title: "Weaning emotions - unexpected feelings",
        replies: 29,
        latest: "4 days ago",
        tags: ["weaning", "emotions"]
      }
    ]
  }
};

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'forums'>('groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeForum, setActiveForum] = useState<string | null>(null);
  
  // Filter groups based on search query
  const filteredGroups = communityGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <PageHeader
        title="Community Connections"
        subtitle="Find your tribe of supportive parents who understand your journey"
        icon={<Users className="w-8 h-8" />}
      />
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'groups'
                  ? 'bg-primary-300 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveTab('groups')}
            >
              Support Groups
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'forums'
                  ? 'bg-primary-300 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveTab('forums')}
            >
              Discussion Forums
            </button>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'groups' ? 'groups' : 'discussions'}...`}
              className="pl-10 pr-4 py-2 rounded-full border border-neutral-300 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {activeTab === 'groups' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-soft overflow-hidden"
                >
                  <div className={`px-6 py-3 border-b ${
                    group.type === 'In-Person'
                      ? 'bg-accent-50 border-accent-100'
                      : group.type === 'Virtual'
                        ? 'bg-secondary-50 border-secondary-100'
                        : 'bg-primary-50 border-primary-100'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        group.type === 'In-Person'
                          ? 'text-accent-700'
                          : group.type === 'Virtual'
                            ? 'text-secondary-700'
                            : 'text-primary-700'
                      }`}>
                        {group.type}
                      </span>
                      <span className="text-sm text-neutral-500">{group.memberCount} members</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                    <p className="text-neutral-700 text-sm mb-4">{group.description}</p>
                    
                    <div className="flex items-center text-sm text-neutral-500 mb-3">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{group.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-neutral-500 mb-4">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{group.schedule}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {group.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                    >
                      Join Group
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredGroups.length === 0 && (
              <div className="text-center py-8">
                <p className="text-neutral-500">No groups match your search. Try different keywords.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'forums' && (
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            {!activeForum ? (
              <div>
                {Object.entries(communityForums).map(([forumName, forum], index) => (
                  <motion.div
                    key={forumName}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`border-b border-neutral-200 last:border-b-0`}
                  >
                    <button
                      className="w-full text-left p-6 hover:bg-neutral-50 transition-colors"
                      onClick={() => setActiveForum(forumName)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 flex items-center">
                            <MessageCircle className="w-5 h-5 text-primary-500 mr-2" />
                            {forumName}
                          </h3>
                          <p className="text-neutral-600 text-sm">{forum.description}</p>
                        </div>
                        <div className="text-sm text-neutral-500">
                          {forum.topics.length} topics
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div>
                <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
                  <button
                    className="text-sm text-primary-600 font-medium flex items-center mb-2"
                    onClick={() => setActiveForum(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Back to Forums
                  </button>
                  <h3 className="font-semibold text-xl">{activeForum}</h3>
                  <p className="text-neutral-600 text-sm">{communityForums[activeForum].description}</p>
                </div>
                
                <div>
                  {communityForums[activeForum].topics
                    .filter(topic => 
                      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map((topic, index) => (
                      <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 transition-colors"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-lg">{topic.title}</h4>
                            <div className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                              {topic.replies} replies
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {topic.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              View Discussion
                            </Button>
                            <span className="text-neutral-500">Last reply: {topic.latest}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-semibold mb-6">Finding Your Support Network</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-soft"
          >
            <h3 className="font-semibold mb-3 flex items-center">
              <CalendarCheck className="w-5 h-5 text-primary-500 mr-2" />
              Local Resources
            </h3>
            <p className="text-neutral-700 mb-4">
              Many hospitals, birth centers, and community organizations offer postpartum support groups and parenting classes.
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>• Check with your hospital's maternity department</li>
              <li>• Ask your pediatrician for recommendations</li>
              <li>• Look for community centers and libraries</li>
              <li>• Contact La Leche League for breastfeeding groups</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-soft"
          >
            <h3 className="font-semibold mb-3 flex items-center">
              <MessageCircle className="w-5 h-5 text-primary-500 mr-2" />
              Online Communities
            </h3>
            <p className="text-neutral-700 mb-4">
              Virtual groups can provide 24/7 support from the comfort of your home, especially valuable during those middle-of-the-night moments.
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>• Search for Facebook groups specific to your needs</li>
              <li>• Join parenting forums focused on your stage</li>
              <li>• Look for groups with active moderation</li>
              <li>• Consider specialty groups based on specific challenges</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-soft"
          >
            <h3 className="font-semibold mb-3 flex items-center">
              <Heart className="w-5 h-5 text-primary-500 mr-2" />
              Building Lasting Connections
            </h3>
            <p className="text-neutral-700 mb-4">
              The friendships formed during the postpartum period can last a lifetime - these people understand your experience in a unique way.
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>• Be vulnerable and authentic about your struggles</li>
              <li>• Offer support to others when you can</li>
              <li>• Exchange contact information with those you connect with</li>
              <li>• Consider organizing informal meetups outside of formal groups</li>
            </ul>
          </motion.div>
        </div>
      </div>
      
      <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100">
        <h3 className="text-xl font-serif font-semibold mb-4">Create Your Own Group</h3>
        <p className="text-neutral-700 mb-6">
          Don't see a group that fits your specific needs? Consider starting your own! We provide tools and guidance to help you create a supportive community.
        </p>
        <Button
          variant="secondary"
        >
          Start a New Group
        </Button>
      </div>
    </div>
  );
};

export default Community;