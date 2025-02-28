import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IHero } from '../interfaces/ihero';
import { lastValueFrom, Observable } from 'rxjs';
import { IPower } from '../interfaces/ipower';

@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  httpClient = inject(HttpClient);

  private baseUrl: string = 'http://localhost:8080/api';

  constructor() { }

  getAllHeroes(page: number, itemPerPage: number): Observable<IHero[]> {
    return this.httpClient.get<IHero[]>(this.baseUrl + "/characters?page=" + page + "&size=" + itemPerPage);
  }
  getAllHeroSinPag(): Observable<IHero[]> {
    return this.httpClient.get<IHero[]>(this.baseUrl + "/characters");
  }

  update(hero: IHero): Promise<IHero> {
    return lastValueFrom(this.httpClient.put<IHero>(this.baseUrl + "/characters", hero));
  }

  insert(hero: IHero): Promise<IHero> {
    return lastValueFrom(this.httpClient.post<IHero>(this.baseUrl + "/characters", hero));
  }

  getPowerStats(value: number, page: number, itemPerPage: number): Observable<IPower[]> {
    return this.httpClient.get<IPower[]>(this.baseUrl + "/powerstats/power/" + value +"?page=" + page + "&size=" + itemPerPage);
  }

  getHeroById(id: number): Promise<IHero> {
    return lastValueFrom(this.httpClient.get<IHero>(`${this.baseUrl}/characters/${id}`));
  }

  deleteHero(id: number): Promise<IHero> {
    return lastValueFrom(this.httpClient.delete<IHero>(`${this.baseUrl}/characters/${id}`));
  }

  getHeroByPower(power: number): Observable<IHero[]>{
    return this.httpClient.get<IHero[]>(`${this.baseUrl}/characters/power/${power}`);
  }

  getHeroByName(name: string): Observable<IHero[]> {
    return this.httpClient.get<IHero[]>(`${this.baseUrl}/characters/name/${name}`);
  }








}
