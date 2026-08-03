/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { OurFirm } from './components/OurFirm';
import { OurServices } from './components/OurServices';
import { OurTeam } from './components/OurTeam';
import { OurLibrary } from './components/OurLibrary';
import { AffiliateProgram } from './components/AffiliateProgram';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PolicyStatement } from './components/PolicyStatement';
import { DDQPage } from './components/DDQPage';
import { OverviewPage } from './components/OverviewPage';
import { PostDetail } from './components/PostDetail';

const PAGE_ID_TO_PATH: Record<string, string> = {
  'firm': '/',
  'services': '/our-services',
  'team': '/our-team',
  'library': '/our-library',
  'affiliate': '/joinnaviter',
  'contact': '/contact',
  'policystatement': '/policystatement',
  'ddq': '/ddq'
};

const PATH_TO_PAGE_ID: Record<string, string> = {
  '/': 'firm',
  '/our-services': 'services',
  '/our-team': 'team',
  '/our-library': 'library',
  '/joinnaviter': 'affiliate',
  '/contact': 'contact',
  '/policystatement': 'policystatement',
  '/ddq': 'ddq'
};

const KeyedRoutes = Routes as React.ComponentType<any>;

const PAGES = ['/', '/our-services', '/our-team', '/our-library', '/joinnaviter', '/contact'];
const ALL_PAGES = [...PAGES, '/policystatement', '/ddq'];

const PageWrapper = ({ children, direction }: { children: React.ReactNode, direction: number }) => (
  <motion.div
    initial={{ opacity: 0, x: direction * 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction * -50 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [initialComplexityFilter, setInitialComplexityFilter] = useState<string | null>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    let currentPath = location.pathname;
    if (currentPath !== '/' && currentPath.endsWith('/')) {
      currentPath = currentPath.slice(0, -1);
    }
    
    const prevIndex = ALL_PAGES.indexOf(prevPathRef.current);
    const nextIndex = ALL_PAGES.indexOf(currentPath);
    
    if (prevIndex !== -1 && nextIndex !== -1 && prevIndex !== nextIndex) {
      setDirection(nextIndex > prevIndex ? 1 : -1);
    }
    prevPathRef.current = currentPath;
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const handleNavigate = useCallback((pageOrPath: string, initialFilter: string | null = null) => {
    let targetPath = PAGE_ID_TO_PATH[pageOrPath] || (pageOrPath.startsWith('/') ? pageOrPath : `/${pageOrPath}`);
    setInitialComplexityFilter(targetPath === '/our-library' ? initialFilter : null);
    navigate(targetPath);
  }, [navigate]);

  let normalizedPath = location.pathname;
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }
  let activePageName = PATH_TO_PAGE_ID[normalizedPath]
    || (normalizedPath.startsWith('/our-library') ? 'library' : 'firm');

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = endX - touchStart.current.x;
    const diffY = endY - touchStart.current.y;
    
    // Gesture must be primarily horizontal and exceed 60px distance
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
      const currentIndex = PAGES.indexOf(normalizedPath);
      
      if (currentIndex !== -1) {
        if (diffX < 0) {
          // Swiped left -> navigate forward to next page
          if (currentIndex < PAGES.length - 1) {
            navigate(PAGES[currentIndex + 1]);
          }
        } else {
          // Swiped right -> navigate backward to previous page
          if (currentIndex > 0) {
            navigate(PAGES[currentIndex - 1]);
          }
        }
      }
    }
  };

  return (
    <div 
      className="relative min-h-screen overflow-x-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Navigation activePage={activePageName} onNavigate={handleNavigate} />
      
      <main className="w-full">
        <AnimatePresence mode="wait" initial={false}>
          <KeyedRoutes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageWrapper direction={direction}>
                <OurFirm onNavigateToServices={() => handleNavigate('services')} />
              </PageWrapper>
            } />
            <Route path="/our-services" element={
              <PageWrapper direction={direction}>
                <OurServices 
                  onNavigateToTeam={() => handleNavigate('team')} 
                  onNavigateToLibraryWithComplexity={(complexity) => handleNavigate('library', complexity)}
                />
              </PageWrapper>
            } />
            <Route path="/our-team" element={
              <PageWrapper direction={direction}>
                <OurTeam onNavigateToLibrary={() => handleNavigate('library')} />
              </PageWrapper>
            } />
            <Route path="/our-library" element={
              <PageWrapper direction={direction}>
                <OurLibrary 
                  onNavigateToFirm={() => handleNavigate('firm')}
                  onNavigateToServices={() => handleNavigate('services')}
                  onNavigateToTeam={() => handleNavigate('team')} 
                  initialComplexityFilter={initialComplexityFilter}
                />
              </PageWrapper>
            } />
            <Route path="/joinnaviter" element={
              <PageWrapper direction={direction}>
                <AffiliateProgram />
              </PageWrapper>
            } />
            <Route path="/contact" element={
              <PageWrapper direction={direction}>
                <Contact />
              </PageWrapper>
            } />
            <Route path="/policystatement" element={
              <PageWrapper direction={direction}>
                <PolicyStatement 
                  onNavigateToContact={() => handleNavigate('contact')} 
                  onNavigateToFirm={() => handleNavigate('firm')}
                />
              </PageWrapper>
            } />
            <Route path="/ddq" element={
              <PageWrapper direction={direction}>
                <DDQPage 
                  onNavigateToContact={() => handleNavigate('contact')} 
                  onNavigateToFirm={() => handleNavigate('firm')}
                  onNavigateToPolicy={() => handleNavigate('policystatement')}
                />
              </PageWrapper>
            } />
            
            <Route path="/our-library/:slug" element={
              <PageWrapper direction={direction}>
                <PostDetail onNavigateToLibrary={() => handleNavigate('library')} />
              </PageWrapper>
            } />

            {/* Legacy URL Redirects */}
            <Route path="/our-firm" element={<Navigate to="/" replace />} />
            <Route path="/disclaimers" element={<Navigate to="/policystatement" replace />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </KeyedRoutes>
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

