export enum MultiplexCode {
    Cgv = 1,
    Megabox = 2,
    LotteCinema = 3
}

export const MULTIPLEX_LIST = [
    {id: MultiplexCode.Cgv, label:"CGV", brand:"cgv"},
    {id: MultiplexCode.Megabox, label:"메가박스", brand:"megabox"},
    {id: MultiplexCode.LotteCinema, label:"롯데시네마", brand:"lottecinema"},
]