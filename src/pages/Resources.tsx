import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Link as LinkIcon, Phone, MessageCircle, ExternalLink, Search } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'hotline' | 'website' | 'organization';
  description: string;
  link?: string;
  phone?: string;
  tags: string[];
}

const resourcesList: Resource[] = [
  {
    id: '1',
    title: "Postpartum Support International",
    type: "organization",
    description: "Provides direct support to families, trains professionals, and provides a bridge to connect them.",
    link: "https://www.postpartum.net/",
    phone: "1-800-944-4773",
    tags: ["mental-health", "support", "education", "community"]
  },
  {
    id: '2',
    title: "National Maternal Mental Health Hotline",
    type: "hotline",
    description: "24/7 confidential support for mental health challenges before, during, and after pregnancy.",
    phone: "1-833-943-5746",
    tags: ["mental-health", "crisis", "24-7"]
  },
  {
    id: '3',
    title: "La Leche League International",
    type: "organization",
    description: "Provides mother-to-mother support, encouragement, information, and education on breastfeeding.",
    link: "https://www.llli.org/",
    tags: ["breastfeeding", "support", "education"]
  },
  {
    id: '4',
    title: "Recognizing and Treating Postpartum Depression",
    type: "article",
    description: "Comprehensive overview of PPD symptoms, risk factors, and treatment options from the American Academy of Family Physicians.",
    link: "https://www.aafp.org/afp/2016/0415/p672.html",
    tags: ["mental-health", "education", "medical"]
  },
  {
    id: '5',
    title: "KellyMom",
    type: "website",
    description: "Evidence-based information on breastfeeding and parenting, with a wide range of topics covered for new parents.",
    link: "https://kellymom.com/",
    tags: ["breastfeeding", "education", "newborn-care"]
  },
  {
    id: '6',
    title: "Pelvic Floor Physical Therapy for Postpartum Recovery",
    type: "article",
    description: "An overview of how pelvic floor physical therapy can help with common postpartum issues like incontinence and pain.",
    link: "https://www.healthline.com/health/pregnancy/postpartum-pelvic-floor-therapy",
    tags: ["physical-recovery", "education", "pelvic-health"]
  },
  {
    id: '7',
    title: "Suicide Prevention Lifeline",
    type: "hotline",
    description: "24/7 support for anyone experiencing suicidal thoughts or emotional distress.",
    phone: "988",
    tags: ["mental-health", "crisis", "24-7"]
  },
  {
    id: '8',
    title: "Maternal Mental Health NOW",
    type: "organization",
    description: "Resources and education for maternal mental health, including symptom checkers and provider directories.",
    link: "https://www.maternalmentalhealthnow.org/",
    tags: ["mental-health", "education", "support"]
  },
  {
    id: '9',
    title: "Nutritional Needs During the Postpartum Period",
    type: "article",
    description: "Guidelines for nutritional needs after childbirth, including considerations for breastfeeding mothers.",
    link: "https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy",
    tags: ["nutrition", "physical-recovery", "breastfeeding"]
  },
  {
    id: '10',
    title: "Expecting Better & Cribsheet",
    type: "article",
    description: "Evidence-based books by economist Emily Oster that cover pregnancy, childbirth, and early parenting decisions.",
    link: "https://emilyoster.net/books/",
    tags: ["education", "evidence-based", "parenting"]
  },
  {
    id: '11',
    title: "The Fourth Trimester: Understanding, Protecting, and Nurturing an Infant through the First Three Months",
    type: "article",
    description: "Book by pediatrician Harvey Karp explaining the concept of the fourth trimester and techniques for soothing newborns.",
    link: "https://www.happiestbaby.com/",
    tags: ["newborn-care", "education", "sleep"]
  },
  {
    id: '12',
    title: "Postpartum Support International Helpline",
    type: "hotline",
    description: "Support for individuals and families experiencing postpartum mental health challenges.",
    phone: "1-800-944-4773",
    tags: ["mental-health", "support", "education"]
  }
];

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  
  // Get all unique tags from resources
  const allTags = Array.from(new Set(resourcesList.flatMap(resource => resource.tags)));
  
  // Filter resources based on search query, type filter, and tag filter
  const filteredResources = resourcesList.filter(resource => {
    const matchesSearch = searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTypeFilter = activeFilter === 'all' || resource.type === activeFilter;
    
    const matchesTagFilter = activeTagFilter === null || resource.tags.includes(activeTagFilter);
    
    return matchesSearch && matchesTypeFilter && matchesTagFilter;
  });
  
  // Helper to render resource icon based on type
  const renderResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Book className="w-5 h-5 text-primary-500" />;
      case 'hotline':
        return <Phone className="w-5 h-5 text-error-500" />;
      case 'website':
        return <LinkIcon className="w-5 h-5 text-accent-500" />;
      case 'organization':
        return <MessageCircle className="w-5 h-5 text-secondary-500" />;
      default:
        return <Book className="w-5 h-5" />;
    }
  };
  
  // Function to clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setActiveTagFilter(null);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <div>
      <PageHeader
        title="Resources & Support"
        subtitle="Curated information, organizations, and helplines for your postpartum journey"
        icon={<Book className="w-8 h-8" />}
      />
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-3 rounded-lg border border-neutral-300 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex overflow-x-auto py-1 -mx-1 md:mx-0 no-scrollbar">
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full mx-1 transition-colors ${
                activeFilter === 'all'
                  ? 'bg-primary-300 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All Resources
            </button>
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full mx-1 transition-colors ${
                activeFilter === 'article'
                  ? 'bg-primary-300 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveFilter('article')}
            >
              Articles
            </button>
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full mx-1 transition-colors ${
                activeFilter === 'hotline'
                  ? 'bg-primary-300 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveFilter('hotline')}
            >
              Hotlines
            </button>
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full mx-1 transition-colors ${
                activeFilter === 'website'
                  ? 'bg-primary-300 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveFilter('website')}
            >
              Websites
            </button>
            <button
              className={`whitespace-nowrap px-4 py-2 rounded-full mx-1 transition-colors ${
                activeFilter === 'organization'
                  ? 'bg-primary-300 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveFilter('organization')}
            >
              Organizations
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Filter by Tag:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeTagFilter === tag
                    ? 'bg-secondary-300 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
                onClick={() => setActiveTagFilter(activeTagFilter === tag ? null : tag)}
              >
                #{tag}
              </button>
            ))}
            {(activeTagFilter !== null || searchQuery || activeFilter !== 'all') && (
              <button
                className="px-3 py-1 rounded-full text-sm text-error-600 border border-error-200 hover:bg-error-50 transition-colors"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-soft">
            <Book className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No matching resources found</h3>
            <p className="text-neutral-600 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              className="px-4 py-2 bg-primary-300 text-white rounded-full hover:bg-primary-400 transition-colors"
              onClick={clearFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-soft overflow-hidden h-full flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-start mb-3">
                    <div className="mr-3 mt-1">
                      {renderResourceIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                      <div className="text-xs text-neutral-500 capitalize">{resource.type}</div>
                    </div>
                  </div>
                  
                  <p className="text-neutral-700 mb-4">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-neutral-200"
                        onClick={() => setActiveTagFilter(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
                  {resource.link && (
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-2"
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Visit Website</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                  
                  {resource.phone && (
                    <a
                      href={`tel:${resource.phone}`}
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{resource.phone}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      <div className="bg-accent-50 rounded-xl p-6 border border-accent-100">
        <h3 className="text-xl font-serif font-semibold mb-4">Suggest a Resource</h3>
        <p className="text-neutral-700 mb-6">
          Do you know of a helpful resource for new parents that should be included here? Let us know and we'll review it for addition to our directory.
        </p>
        <button className="px-6 py-3 bg-accent-300 text-white rounded-full hover:bg-accent-400 transition-colors font-medium">
          Submit a Resource
        </button>
      </div>
    </div>
  );
};

export default Resources;