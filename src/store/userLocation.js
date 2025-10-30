import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const locationStore = create(
  persist(
    (set, get) => ({
      // ✅ 현재 위치 단일 객체
      currentLocation: {
        city: '',
        district: '',
        timestamp: null,
      },

      // ✅ 최근 검색 리스트 (최대 5개)
      recentSearches: [],

      // 현재 위치 갱신
      setCurrentLocation: (location) => 
        set((state) => ({
          ...state,
          currentLocation: { 
            ...location, 
            timestamp: Date.now() 
          },
        })),

      // 최근 검색어 추가
      addRecentSearch: (city, district) =>
        set((state) => {
          const newSearch = { city, district };
          const filtered = state.recentSearches.filter(
            (item) => !(item.city === city && item.district === district)
          );
          const updated = [newSearch, ...filtered].slice(0, 5); // 최대 5개
          return { ...state, recentSearches: updated };
        }),
    }),
    {
      name: 'location-store',
    }
  )
);
