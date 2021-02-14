import { Injectable } from '@angular/core';
import {ConfigService} from '../../config/config.service';
import {GeoPoint} from '../../models/geo-point';
import {RoutingPath} from '../../models/routing/routing';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  currentRoute: RoutingPath;

  constructor(private configService: ConfigService, private http: HttpClient) { }
  getRoute(points: GeoPoint[], maxCellDiagInM: number): Observable<RoutingPath> {
    let params = new HttpParams();
    let pointString = '[';
    let first = true;
    for (const point of points) {
      if (first) {
        first = false;
      } else {
        pointString += ',';
      }
      pointString += `[${point.lat},${point.lon}]`;
    }
    pointString += ']';
    params = params.append('q', pointString);
    params = params.append('d', String(maxCellDiagInM));
    return this.http.get<RoutingPath>(this.configService.getRoutingUrl(), {params});
  }
}
