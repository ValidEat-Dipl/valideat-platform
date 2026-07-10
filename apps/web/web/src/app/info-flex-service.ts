import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoFlexService {

  getInfoContainerMap() {
    return new Map()
        .set("Mitarbeitereinträge", 128)
        .set("Physische Markerl erfasst", 121)
        .set("Abgeglichen", 112)
        .set("Offene Konflikte", 0)
  }

}
