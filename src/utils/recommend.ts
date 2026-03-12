import { MULTIPLEX_LIST } from "@/constants/multiplex";

// ✅ multiplexId를 label로 변환
export const getMultiplexLabel = (multiplexId: number) =>
  MULTIPLEX_LIST.find(m => m.id === multiplexId)?.label || "Unknown";

// ✅ multiplexId를 브랜드로 변환
export const getMultiplexBrand = (multiplexId: number) =>
  MULTIPLEX_LIST.find(m => m.id === multiplexId)?.brand || "Unknown";

// ✅ multiplexName을 브랜드로 변환
export const getMultiplexBrandByName = (multiplexName?: string | null) =>
  MULTIPLEX_LIST.find(m => m.label === multiplexName)?.brand || "Unknown";

// ✅ multiplexId가 없을 때 multiplexName으로 보완
export const getMultiplexBrandSafe = (
  multiplexId?: number | null,
  multiplexName?: string | null
) => {
  if (multiplexId) {
    return getMultiplexBrand(multiplexId);
  }

  return getMultiplexBrandByName(multiplexName);
};
