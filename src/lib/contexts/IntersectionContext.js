import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce'; // or use throttle



const IntersectionContext = createContext();

export function IntersectionProvider({ children }) {
  const [visibleSections, setVisibleSections] = useState(new Set());

  const addVisibleSection = useCallback((id) => {
    setVisibleSections(prev => {
      // Only update if the id isn't already in the set
      if (!prev.has(id)) {
        return new Set(prev).add(id);
      }
      return prev;
    });
  }, []);

  const removeVisibleSection = useCallback((id) => {
    setVisibleSections(prev => {
      // Only update if the id exists in the set
      if (prev.has(id)) {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      }
      return prev;
    });
  }, []);

  // Memoize the context value to prevent unnecessary rerenders
  const value = useMemo(() => ({
    visibleSections,
    addVisibleSection,
    removeVisibleSection
  }), [visibleSections, addVisibleSection, removeVisibleSection]);

  return (
    <IntersectionContext.Provider value={value}>
      {children}
    </IntersectionContext.Provider>
  );
}

export function useIntersection() {
  const context = useContext(IntersectionContext);
  if (!context) {
    throw new Error('useIntersection must be used within an IntersectionProvider');
  }
  return context;
} 




export function useWrapperIntersection(id, options = {}) {
  const { ref, inView } = useInView({ threshold: 0.1, ...options });
  const { addVisibleSection, removeVisibleSection } = useIntersection();

  const handleIntersection = useCallback(
    debounce((isVisible) => {
      if (!id) return;
      
      if (isVisible) {
        addVisibleSection(id);
      } else {
        removeVisibleSection(id);
      }
    }, 100), // Adjust the delay as needed
    [id, addVisibleSection, removeVisibleSection]
  );

  useEffect(() => {
    handleIntersection(inView);
    
    // Cleanup
    return () => {
      handleIntersection.cancel();
      if (id) removeVisibleSection(id);
    };
  }, [inView, handleIntersection, id, removeVisibleSection]);

  return ref;
}