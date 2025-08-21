import { useState, useEffect } from "react";
import RegionSelector from "@/components/recommend/RegionSelector";
import MultiplexSelector from "@/components/recommend/MultiplexSelector";
import NavRecommend from "@/components/recommend/NavRecommend";
import { getRecommendList } from "@/apis/api/recommend";

export default function PageRecommend() {
  const [selectedMultiplex, setSelectedMultiplex] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [recommendList, setRecommendList] = useState<any[]>([]);

  // 필터 바뀔때마다 리스트 호출
  useEffect(() => {
    if(selectedMultiplex.length === 0 && selectedRegions.length === 0) return;

    const fetchData = async () => {
      try {
        const formData = {
          multiplex: selectedMultiplex, // ex) ["cgv", "megabox"]
          regions: selectedRegions,   // ex) ["seoul", "busan"]
        };
        const data = await getRecommendList(formData);
        setRecommendList(data);
      } catch (e) {
        console.error("추천 리스트 조회 실패:", e);
      }
    };
    fetchData();
  }, [selectedMultiplex, selectedRegions]);

  return (
    <div className="flex flex-col">
        <MultiplexSelector onChange={setSelectedMultiplex}/>
        <RegionSelector/>
        <NavRecommend/>
    </div>
  )
}
