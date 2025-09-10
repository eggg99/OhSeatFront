import { useState } from "react";
import MultiplexSelector from "./MultiplexSelector";
import AreaSelector from "./AreaSelector";
import CinemaSelector from "./CinemaSelector";

export default function RecommendCgv() {
    const [selectedMultiplex, setselectedMultiplex] = useState<string[]>([]);
    const [selectedArea, setselectedArea] = useState<string[]>([]);
    return(
        <section className="flex flex-col">
            <MultiplexSelector
                selectedMultiplex={selectedMultiplex}
                onChange={setselectedMultiplex}
            />
            <AreaSelector
                selectedArea = {selectedArea}
                onChange = {setselectedArea}
            />
            <CinemaSelector
            />
        </section>
    )
}