// src/stores/recommendStore.js
import { create } from "zustand";

export const useRecommendStore = create((set) => ({
    areaId: "00",
    cinemaList: [],
    selectedCinema: "00",
    screenList: [],
    selectedScreen: "00",
    pageData: null,
    page: 0,
    orderType: "latest",
    size: 10,

    // 상태 업데이트 함수
    setAreaId: (areaId) => set({ areaId }),
    setCinemaList: (list) => set({ cinemaList: list }),
    setSelectedCinema: (cinema) => set({ selectedCinema: cinema }),
    setScreenList: (list) => set({ screenList: list }),
    setSelectedScreen: (screen) => set({ selectedScreen: screen }),
    setPageData: (data) => set({ pageData: data }),
    setPage: (page) => set({ page }),
    setOrderType: (order) => set({ orderType: order }),
}));