export type Tile = {
    ID: number,
    landscape: string,
    description: string,
    accessible: boolean,
}

export type WorldGrid = {
    x: number,
    y: number,
    tile: Tile,
}