import { IPower } from "./ipower";

export interface IHero {
    id: number;
    heroname: string;
    fullname: string;
    image1: string;
    image2: string;
    image3: string;
    gender: string;
    race: string;
    alignment: string;
    powerstats: IPower;
}
