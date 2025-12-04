import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { getLocation } from "@/apis/api/cinesquare";

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
                    const newSearch = {city, district};
                    const filtered = state.recentSearches.filter(
                        (item) => !(item.city === city && item.district === district)
                    );
                    const updated = [newSearch, ...filtered].slice(0, 5); // 최대 5개
                    return {...state, recentSearches: updated};
            }),

            fetchLocation: async () => {
                if (!navigator.geolocation) {
                    alert("이 브라우저에서 위치 정보를 지원하지 않습니다.");
                    return;
                }
                navigator.geolocation.getCurrentPosition(async (pos) => {
                    const {latitude, longitude} = pos.coords;
                    try {
                        const response = await getLocation({x: longitude, y: latitude});
                        get().setCurrentLocation(response);
                    } catch (err) {
                        console.error("위치 정보 요청 실패:", err);
                    }
                }, (err) => {
                    console.error(err);
                    alert("위치 정보를 가져오지 못했습니다.");
                });
            },
            // 최근 검색어 1개 삭제
            removeRecentSearch: (city, district) =>
                set((state) => ({
                    recentSearches: state.recentSearches.filter(
                        (item) => !(item.city === city && item.district === district)
                    ),
                })),

        }),


        {
            name: 'location-store',
        }
    )
);
