import { IHero } from "./ihero";

export interface IPower {
    id: number;
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
    characters: IHero;
}
