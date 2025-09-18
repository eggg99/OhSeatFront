export enum AreaCode {
    All = "00",
    Seoul = "11",
    Gyeonggi= "12",
    Incheon = "13",
    Gangwon = "14",
    DaejeonChungcheong = "15",
    Daegu = "16",
    BusanUlsan = "17",
    Gyeongsang = "18",
    GwangjuJeollaJeju = "19"
}

export const AREA_LIST = [
    { id: AreaCode.All, label: "전체" },
    { id: AreaCode.Seoul, label: "서울" },
    { id: AreaCode.Gyeonggi, label: "경기" },
    { id: AreaCode.Incheon, label: "인천" },
    { id: AreaCode.Gangwon, label: "강원" },
    { id: AreaCode.DaejeonChungcheong, label: "대전/충청" },
    { id: AreaCode.Daegu, label: "대구" },
    { id: AreaCode.BusanUlsan, label: "부산/울산" },
    { id: AreaCode.Gyeongsang, label: "경상" },
    { id: AreaCode.GwangjuJeollaJeju, label: "광주/전라/제주" },
]