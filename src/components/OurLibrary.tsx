import { motion } from 'motion/react';
import { RefreshCw, Search, ChevronDown, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seo } from './Seo';
import libraryData from '../data/naviter-library.json';

// Map the live "Our Library" category to the app's publication type
const CATEGORY_TO_TYPE: Record<string, string> = {
  'Insights': 'INSIGHT',
  'Market Commentary': 'MARKET COMMENTARY',
  'Newsletters': 'NEWSLETTER',
};

// Normalize live topic-tag labels to the app's complexity vocabulary
const TAG_NORMALIZE: Record<string, string> = {
  'Tax Mitigation': 'Mitigating Taxes',
};
const normTag = (t: string) => TAG_NORMALIZE[t] || t;

const fmtDate = (d: string) => {
  const dt = new Date((d || '').replace(' ', 'T'));
  if (isNaN(dt.getTime())) return d;
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${mm}/${dd}/${dt.getFullYear()}`;
};

const readTimeFor = (html: string) => {
  const words = (html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.round(words / 200))} min read`;
};

// Full migrated library dataset (171 posts) baked into the app
const LIBRARY_ARTICLES = (libraryData as any[])
  // Newsletter category is intentionally excluded from the Library
  .filter((p) => ((p.category && p.category[0]) || 'Insights') !== 'Newsletters')
  .map((p) => {
  const cat = (p.category && p.category[0]) || 'Insights';
  return {
    id: p.slug || p.id,
    slug: p.slug,
    title: p.title,
    type: CATEGORY_TO_TYPE[cat] || 'INSIGHT',
    date: fmtDate(p.date),
    readTime: readTimeFor(p.contentHtml),
    image: p.featuredImage || '/Library Image.jpg',
    tags: p.tags || [],
    complexityTags: (p.tags || []).map(normTag),
  };
});

// The 8 complexities listed in the complexity cards in OurServices
const COMPLEXITY_TAGS = [
  'Optimizing Portfolio Returns',
  'Mitigating Taxes',
  'Strategic Wealth Transfer',
  'Family Governance and Continuity',
  'Asset Protection & Risk Management',
  'Philanthropic Endeavors',
  'Business Transactions and Post-Liquidity Integration',
  'Consolidated Financial Reporting'
];

// High fidelity fallback & default dataset containing rich publications and local public assets to guarantee visual completeness
const FALLBACK_ARTICLES = [
  {
    id: 'f1',
    title: 'Navigating Pre-Transaction Estate Planning: Maximize Value Before the Sale',
    type: 'INSIGHT',
    date: '06/05/2026',
    readTime: '6 min read',
    image: '/Dunes.jpg',
    tags: ['Pre-Transaction', 'Tax planning', 'Estate Planning'],
    complexityTags: ['Mitigating Taxes', 'Business Transactions and Post-Liquidity Integration']
  },
  {
    id: 'f2',
    title: 'The Modern Family Constitution: Preserving Values Across Generations',
    type: 'INSIGHT',
    date: '05/28/2026',
    readTime: '8 min read',
    image: '/Library Image.jpg',
    tags: ['Family Wealth', 'Governance', 'Education'],
    complexityTags: ['Family Governance and Continuity', 'Strategic Wealth Transfer']
  },
  {
    id: 'f3',
    title: 'Market Commentary: Navigating Inflationary Pressures and Interest Rate Pivots',
    type: 'MARKET COMMENTARY',
    date: '06/01/2026',
    readTime: '4 min read',
    image: '/Prismatic.jpg',
    tags: ['Inflation', 'Interest Rates', 'Equities', 'Private Markets'],
    complexityTags: []
  },
  {
    id: 'f4',
    title: 'Naviter Wealth Spring Newsletter: Modular Solutions for an Uncommon Life',
    type: 'NEWSLETTER',
    date: '05/15/2026',
    readTime: '5 min read',
    image: '/Bison-Winter-0598-Edit.jpg',
    tags: ['Newsletter', 'Modular Family Office', 'Updates'],
    complexityTags: []
  },
  {
    id: 'f5',
    title: 'Maximizing Risk-Adjusted Portfolio Returns Through Private Placement Structures',
    type: 'INSIGHT',
    date: '05/10/2026',
    readTime: '7 min read',
    image: '/accordions/d0707b4b-933d-409a-9834-34ef2312a4e5Original.jpg',
    tags: ['Private Markets', 'Allocation', 'PPLI'],
    complexityTags: ['Optimizing Portfolio Returns', 'Asset Protection & Risk Management']
  },
  {
    id: 'f6',
    title: 'Establishing a Mission-Driven Donor Advised Fund for Family Legacy',
    type: 'INSIGHT',
    date: '04/22/2026',
    readTime: '9 min read',
    image: '/redwood-forest.jpg',
    tags: ['Philanthropy', 'Charitable Giving', 'Donor Advised Fund'],
    complexityTags: ['Philanthropic Endeavors', 'Family Governance and Continuity']
  },
  {
    id: 'f7',
    title: 'Market Commentary: Dynamic Sector Rotation in Fixed Income Allocations',
    type: 'MARKET COMMENTARY',
    date: '05/01/2026',
    readTime: '4 min read',
    image: '/accordions/e368f64b-37e3-42a3-a713-a350cb110a1aOriginal.jpg',
    tags: ['Fixed Income', 'Bonds', 'Yield Curve'],
    complexityTags: []
  },
  {
    id: 'f8',
    title: 'Unified Wealth Views: The Power of Multi-Custodian Data Aggregation',
    type: 'INSIGHT',
    date: '04/15/2026',
    readTime: '5 min read',
    image: '/accordions/b0e6301f-f4bd-4604-b8a3-f2b9ed7a14efOriginal.jpg',
    tags: ['Reporting', 'Aggregation', 'PFS'],
    complexityTags: ['Consolidated Financial Reporting']
  },
  {
    id: 'f9',
    title: 'Naviter Wealth Quarterly Newsletter: Q2 Strategic Asset Allocation Perspectives',
    type: 'NEWSLETTER',
    date: '04/01/2026',
    readTime: '6 min read',
    image: '/D523C4B2-1DD8-B71B-0B5DB9B6085AC60AOriginal.jpg',
    tags: ['Asset Allocation', 'Quarterly Updates', 'Portfolio Strategy'],
    complexityTags: []
  }
];

export const OurLibrary = ({ onNavigateToFirm, onNavigateToServices, onNavigateToTeam, initialComplexityFilter }: { onNavigateToFirm: () => void, onNavigateToServices: () => void, onNavigateToTeam: () => void, initialComplexityFilter?: string | null }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedComplexities, setSelectedComplexities] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initialize filter when visiting with an initial complexity tag
  useEffect(() => {
    if (initialComplexityFilter) {
      setSelectedComplexities([initialComplexityFilter]);
      setSelectedCategories([]);
      setSearchText('');
      setExpanded(true);
    }
  }, [initialComplexityFilter]);

  // Reset expanded when filters or search change
  useEffect(() => {
    if (!initialComplexityFilter) {
      setExpanded(false);
    }
  }, [selectedCategories, selectedComplexities, searchText, initialComplexityFilter]);

  const toggleCategory = (catId: string) => {
    if (catId === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) => {
        if (prev.includes(catId)) {
          return prev.filter((id) => id !== catId);
        } else {
          return [...prev, catId];
        }
      });
    }
  };

  const isCategoryChecked = (catId: string) => {
    if (catId === 'all') {
      return selectedCategories.length === 0;
    }
    return selectedCategories.includes(catId);
  };

  const toggleComplexity = (tag: string) => {
    setSelectedComplexities((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    // UX aid: Auto-select Insights category when selecting a complexity
    setSelectedCategories((prev) => {
      if (prev.length > 0 && !prev.includes('INSIGHT')) {
        return [...prev, 'INSIGHT'];
      }
      return prev;
    });
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const syncArticles = () => {
    // Library content is migrated and baked into the app (independent of WordPress).
    setLoading(true);
    const data = LIBRARY_ARTICLES.length ? LIBRARY_ARTICLES : FALLBACK_ARTICLES;
    setArticles(data);
    setTimeout(() => setLoading(false), 200);
  };

  useEffect(() => {
    syncArticles();
  }, []);

  // Category absolute counts
  const countAll = articles.length;
  const countInsights = articles.filter(a => a.type === 'INSIGHT').length;
  const countCommentaries = articles.filter(a => a.type === 'MARKET COMMENTARY').length;
  const countNewsletters = articles.filter(a => a.type === 'NEWSLETTER').length;

  // Helper to count how many INSIGHT articles possess a specific complexity tag
  const getComplexityCount = (tag: string) => {
    return articles.filter(a => a.type === 'INSIGHT' && a.complexityTags?.includes(tag)).length;
  };

  // Compute number of Insights represented by the selected complexity tags
  const selectedComplexitiesInsightsCount = useMemo(() => {
    if (selectedComplexities.length === 0) return 0;
    return articles.filter(a => 
      a.type === 'INSIGHT' && 
      a.complexityTags?.some((tag: string) => selectedComplexities.includes(tag))
    ).length;
  }, [articles, selectedComplexities]);

  // Filtered articles memoized calculation
  const filteredArticles = useMemo(() => {
    return articles.filter((article: any) => {
      // 1. Category check
      if (selectedCategories.length > 0 && !selectedCategories.includes(article.type)) {
        return false;
      }

      // 2. Complexity check (Insights only possess these)
      if (selectedComplexities.length > 0) {
        if (!article.complexityTags || !article.complexityTags.some((tag: string) => selectedComplexities.includes(tag))) {
          return false;
        }
      }

      // 3. Keyword Search check
      if (searchText.trim() !== '') {
        const query = searchText.toLowerCase();
        const titleMatch = article.title?.toLowerCase().includes(query);
        const tagsMatch = article.tags?.some((tag: string) => tag.toLowerCase().includes(query));
        const compMatch = article.complexityTags?.some((tag: string) => tag.toLowerCase().includes(query));
        
        if (!titleMatch && !tagsMatch && !compMatch) {
          return false;
        }
      }

      return true;
    });
  }, [articles, selectedCategories, selectedComplexities, searchText]);

  // Check if any filters or search keywords are currently active
  const isSearchingOrFiltering = useMemo(() => {
    return selectedCategories.length > 0 || selectedComplexities.length > 0 || searchText.trim() !== '';
  }, [selectedCategories, selectedComplexities, searchText]);

  // If viewing initially or with search/filter parameters, show only 15 unless expanded is true.
  const displayedArticles = useMemo(() => {
    if (expanded) {
      return filteredArticles;
    }
    return filteredArticles.slice(0, 15);
  }, [filteredArticles, expanded]);

  return (
    <div className="flex flex-col w-full bg-[#f4f4f8]" id="library-page-root">
      <Seo 
        title="Our Library - Naviter Wealth" 
        description="Insights, articles and resources from Naviter Wealth to help you navigate wealth management and legacy planning." 
      />
      {/* Hero Banner */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-naviter-navy">
        <div className="absolute inset-0 z-0">
          <img
            src="/Library Image.jpg"
            alt="Library"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl text-naviter-navy font-serif leading-tight mb-6"
          >
            Navigating Complexities via a Modular Family Office
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-serif text-naviter-blue lowercase mb-6">
              our library
            </h2>
            <div className="w-16 h-[1px] bg-naviter-blue mx-auto mb-12" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-2xl md:text-3xl font-serif text-naviter-navy leading-[1.6] font-light max-w-3xl mx-auto"
          >
            We have created content intentionally and thoughtfully for UHNW families like yours. Our goal is to help you navigate the complexities inherent in significant wealth.
          </motion.p>
        </div>
      </section>

      {/* Sync Banner */}
      {/* <div className="bg-white/90 p-4 border-b flex justify-between items-center text-sm px-6 md:px-10 cursor-pointer" onClick={syncArticles}>
        <div className="flex items-center gap-2 text-naviter-navy font-semibold uppercase tracking-wider">
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} /> {loading ? 'LOADING...' : 'REFRESH LIBRARY'}
        </div>
        <div className="hidden md:block text-gray-500 italic">Naviter Wealth publications library.</div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs md:text-sm">{articles.length} PUBLICATIONS</div>
      </div> */}
      
      <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto space-y-8 w-full">
        {/* Row 1: The 4 Buttons with count tags and Checkbox indicators */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono tracking-[0.2em] text-[#154372]/60 uppercase font-bold">publication category</p>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'all', label: 'All Publications', count: countAll },
              { id: 'INSIGHT', label: 'Insights', count: countInsights },
              { id: 'MARKET COMMENTARY', label: 'Market Commentaries', count: countCommentaries },
            ].map((cat) => {
              const isChecked = isCategoryChecked(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full flex items-center gap-2.5 text-sm font-sans font-medium transition-all duration-300 cursor-pointer ${
                    isChecked
                      ? 'bg-naviter-navy text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {/* Styled Checkbox indicator */}
                  <div className={`size-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? 'border-white bg-[#58aadb]'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {isChecked && (
                      <svg className="size-2.5 stroke-white stroke-[3] fill-none" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border transition-colors ${
                    isChecked 
                      ? 'bg-white border-white text-naviter-navy' 
                      : 'bg-white border-gray-100 text-gray-500 shadow-2xs'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Search Box & Dynamic Complexity Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Keyword Search Input */}
          <div className="bg-white px-4 rounded-xl border border-gray-200 flex items-center gap-3 shadow-xs h-[52px] w-full">
            <Search className="text-gray-400 size-5 shrink-0" />
            <input 
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by keywords, topics, or tags..." 
              className="w-full bg-transparent focus:outline-none text-naviter-navy text-sm font-sans font-medium placeholder:text-naviter-navy/50" 
            />
            {searchText && (
              <button 
                onClick={() => setSearchText('')} 
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                title="Clear Search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Interactive Complexity Dropdown Selector */}
          <div ref={dropdownRef} className="relative w-full">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white px-4 rounded-xl border border-gray-200 flex items-center gap-2 w-full justify-between text-left text-naviter-navy hover:bg-gray-50 transition-all shadow-xs cursor-pointer h-[52px]"
            >
              <span className="text-sm font-medium font-sans truncate">
                {selectedComplexities.length === 0 
                  ? 'Filter by Complexity Tag' 
                  : selectedComplexities.length === 1 
                    ? selectedComplexities[0] 
                    : `${selectedComplexities.length} Complexities Selected`}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {selectedComplexities.length > 0 && (
                  <span className="text-[10px] bg-[#58aadb]/10 text-naviter-navy px-2 py-0.5 rounded-full font-bold">
                    {selectedComplexitiesInsightsCount}
                  </span>
                )}
                <ChevronDown className={`size-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 divide-y divide-gray-100">
                {/* Clear filter selector row inside the search dropdown */}
                {selectedComplexities.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedComplexities([]);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex justify-between items-center cursor-pointer"
                  >
                    <span>Clear All Complexities</span>
                    <span className="text-sm">✕</span>
                  </button>
                )}
                
                {COMPLEXITY_TAGS.map((tag) => {
                  const count = getComplexityCount(tag);
                  const isChecked = selectedComplexities.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        toggleComplexity(tag);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-[#58aadb]/5 transition-colors flex items-center justify-between gap-4 text-gray-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Styled Checkbox */}
                        <div className={`size-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked 
                            ? 'border-naviter-navy bg-naviter-navy text-white' 
                            : 'border-gray-300 bg-white'
                        }`}>
                          {isChecked && (
                            <svg className="size-2.5 stroke-white stroke-[3] fill-none" viewBox="0 0 24 24">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs md:text-sm leading-snug ${isChecked ? 'font-semibold text-naviter-navy' : 'text-gray-700'}`}>{tag}</span>
                      </div>
                      <span className="text-[10px] bg-[#58aadb]/10 text-[#154372] px-2.5 py-1 rounded-full font-bold shrink-0">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Filter pills display */}
        {(selectedComplexities.length > 0 || selectedCategories.length > 0 || searchText) && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-gray-500 mr-1 font-semibold">Active filters:</span>
            
            {selectedCategories.length > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-naviter-navy/10 text-naviter-navy px-3 py-1 rounded-full border border-naviter-navy/20">
                <span className="font-semibold">Categories:</span> {selectedCategories.map(c => c === 'INSIGHT' ? 'Insights' : c === 'MARKET COMMENTARY' ? 'Market Commentaries' : 'Newsletters').join(', ')}
                <button 
                  onClick={() => setSelectedCategories([])}
                  className="hover:text-red-600 transition-colors focus:outline-none ml-1 text-sm font-bold cursor-pointer"
                  title="Remove category filter"
                >
                  ✕
                </button>
              </span>
            )}

            {selectedComplexities.map((complexity) => (
              <span 
                key={complexity} 
                className="inline-flex items-center gap-1.5 text-xs bg-[#58aadb]/10 text-naviter-navy px-3 py-1 rounded-full border border-[#58aadb]/30"
              >
                <span className="font-semibold">Complexity:</span> {complexity}
                <button 
                  onClick={() => setSelectedComplexities((prev) => prev.filter((c) => c !== complexity))}
                  className="hover:text-red-600 transition-colors focus:outline-none ml-1 text-sm font-bold cursor-pointer"
                  title="Remove complexity filter"
                >
                  ✕
                </button>
              </span>
            ))}
            
            {searchText && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full border border-gray-200">
                <span className="font-semibold">Search:</span> "{searchText}"
                <button 
                  onClick={() => setSearchText('')}
                  className="hover:text-red-600 transition-colors focus:outline-none ml-1 text-sm font-bold cursor-pointer"
                  title="Clear Search"
                >
                  ✕
                </button>
              </span>
            )}
            
            <button 
              onClick={() => {
                setSelectedCategories([]);
                setSelectedComplexities([]);
                setSearchText('');
              }}
              className="text-xs text-red-600 hover:text-red-800 font-bold underline-offset-4 hover:underline pl-1 cursor-pointer"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Results Info Bar */}
        {filteredArticles.length > 0 && (
          <div className="text-xs text-[#154372]/60 font-mono tracking-wider pb-2">
            {expanded ? (
              <span>Showing all {filteredArticles.length} matching publications</span>
            ) : filteredArticles.length > 15 ? (
              <span>Showing 15 of {filteredArticles.length} publications. Click "explore more publications" below to see the full set.</span>
            ) : (
              <span>Showing {filteredArticles.length} matching publications</span>
            )}
          </div>
        )}

        {/* Article Grid container */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 max-w-lg mx-auto space-y-4">
            <p className="text-xl font-serif text-naviter-navy font-bold">No publications found</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              There are no publications matching your filters or search keywords. Please reset the parameters to browse other publications.
            </p>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedComplexities([]);
                setSearchText('');
              }}
              className="bg-naviter-navy text-white text-xs font-semibold font-sans uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-naviter-blue transition-colors mt-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article: any) => {
              // Convert type label for clean printing (title-case / proper capitalization)
              const formattedType = 
                article.type === 'INSIGHT' ? 'Insight' 
                : article.type === 'MARKET COMMENTARY' ? 'Market Commentary' 
                : 'Newsletter';

              return (
                <div
                  key={article.id}
                  onClick={() => article.slug && navigate(`/our-library/${article.slug}`)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between cursor-pointer"
                  id={`article-card-${article.id}`}
                >
                  <div>
                    {/* Visual Card Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="h-full w-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      {/* Premium accent bar matching category type */}
                      <div className={`absolute top-0 inset-x-0 h-1.5 ${
                        article.type === 'INSIGHT' ? 'bg-[#58aadb]' 
                        : article.type === 'MARKET COMMENTARY' ? 'bg-naviter-navy' 
                        : 'bg-naviter-secondary-2'
                      }`} />
                    </div>

                    <div className="p-6 space-y-4">
                      {/* State publication type JUST ABOVE the article (the card content description text) */}
                      <span className={`text-[10px] font-mono tracking-[0.2em] font-extrabold uppercase ${
                        article.type === 'INSIGHT' ? 'text-[#58aadb]' 
                        : article.type === 'MARKET COMMENTARY' ? 'text-naviter-navy' 
                        : 'text-naviter-secondary-3'
                      }`}>
                        {formattedType}
                      </span>
                      
                      <h3 className="font-serif text-xl text-naviter-navy leading-snug">
                        {article.title}
                      </h3>

                      {/* Complexity tags for INSIGHTS ONLY directly under the title in light-blue pill form */}
                      {article.type === 'INSIGHT' && article.complexityTags && article.complexityTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {article.complexityTags.map((cTag: string) => {
                            const isSelected = selectedComplexities.includes(cTag);
                            return (
                              <button 
                                key={cTag}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleComplexity(cTag);
                                }}
                                className={`text-[10px] font-sans font-bold px-2.5 py-1 rounded-full border tracking-wide cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'bg-[#154372] border-[#154372] text-white hover:bg-[#154372]/90' 
                                    : 'bg-[#58aadb]/10 border-[#58aadb]/20 text-[#154372] hover:bg-[#58aadb]/20 hover:border-[#58aadb]/40'
                                }`}
                                title={isSelected ? `Remove ${cTag} filter` : `Filter by ${cTag}`}
                              >
                                {cTag}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-4">
                    {/* Publication Read statistics */}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {article.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {article.readTime}</span>
                    </div>

                    {/* Interactive read link */}
                    <div className="border-t border-gray-100 pt-4 text-naviter-navy text-xs font-bold tracking-wider uppercase flex justify-between items-center hover:text-[#58aadb] transition-colors cursor-pointer group">
                      <span>read article</span> 
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredArticles.length > 15 && !expanded && (
            <div className="flex justify-center mt-12 bg-transparent">
              <motion.button
                onClick={() => setExpanded(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-between px-12 py-6 bg-naviter-navy text-white overflow-hidden transition-all duration-500 rounded-sm w-full max-w-md cursor-pointer"
              >
                <span className="relative z-10 font-serif text-lg lowercase tracking-widest">explore more publications</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                <div className="absolute inset-0 bg-naviter-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </div>
          )}
        </>
      )}
    </div>

      <div className="py-24 px-10 bg-[#e5e5f0]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { label: 'explore our firm', action: onNavigateToFirm },
            { label: 'explore our services', action: onNavigateToServices },
            { label: 'explore our team', action: onNavigateToTeam }
          ].map((item, idx) => (
            <motion.button 
              key={item.label}
              onClick={item.action}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-between px-12 py-6 bg-naviter-navy text-white overflow-hidden transition-all duration-500 rounded-sm w-full cursor-pointer"
            >
              <span className="relative z-10 font-serif text-lg lowercase tracking-widest">{item.label}</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              <div className="absolute inset-0 bg-naviter-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
