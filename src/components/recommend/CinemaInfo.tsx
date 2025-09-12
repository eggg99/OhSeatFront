interface CinemaInfoProps {
    selectedCinema: any | null;
}

export default function CinemaInfo({ selectedCinema }: CinemaInfoProps) {
    if (!selectedCinema) return <p>극장을 선택해주세요.</p>;

    return (
        <div className="content-wrapper py-4">
            <div className="flex flex-col items-center gap-4 flex-wrap">
            <p>
                <span>지점명 : </span>
                <span>{selectedCinema.cinemaName}</span>
            </p>
            <p>
                <span>지점 주소 : </span>
                <span>{selectedCinema.cinemaAddr}</span>
            </p>
            {/* ({selectedCinema.cinemaId})
            ({selectedCinema.multiplexId})
            ({selectedCinema.areaId})
            
            
            ({selectedCinema.multiplexName})
            ({selectedCinema.areaName}) */}
            </div>
        </div>
    );
}