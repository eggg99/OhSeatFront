import { useState } from "react";
import MultiplexSelector from "./MultiplexSelector";
import AreaSelector from "./AreaSelector";
import CinemaSelector from "./CinemaSelector";
import { getCinema } from "@/apis/api/recommend";

export default function RecommendCgv() {
    const multiplexId = "1"; // cgv → 1
    const [areaId, setAreaId] = useState<string | null>(null);
    const [cinemaList, setCinemaList] = useState<any[]>([]);

    const handleAreaChange = async (newAreaId: string) => {
        setAreaId(newAreaId);
        const response = await getCinema(multiplexId, newAreaId);
        if(!response){
            return;
        } else {
            setCinemaList(response);
        }
    }
    return(
        <section className="flex flex-col">
            
            <AreaSelector onAreaChange={handleAreaChange} />
            <CinemaSelector cinemaList={cinemaList} />
        </section>
    )
}