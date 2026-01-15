import { MULTIPLEX_LIST } from "@/constants/multiplex";

// ✅ multiplexId를 label로 변환
export const getMultiplexLabel = (multiplexId: number) =>
  MULTIPLEX_LIST.find(m => m.id === multiplexId)?.label || "Unknown";

// ✅ multiplexId를 브랜드로 변환
export const getMultiplexBrand = (multiplexId: number) =>
  MULTIPLEX_LIST.find(m => m.id === multiplexId)?.brand || "Unknown";
