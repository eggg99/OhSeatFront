import RegionSelector from "@/components/recommend/RegionSelector";
import TheaterSelector from "@/components/recommend/TheaterSelector";
import NavRecommend from "@/components/recommend/NavRecommend";

export default function PageRecommend() {
  return (
    <div className="flex flex-col">
        <TheaterSelector/>
        <RegionSelector/>
        <NavRecommend/>
    </div>
  )
}
