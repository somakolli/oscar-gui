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

  constructor(private configService: ConfigService, private http: HttpClient) { }
  getRoute(source: GeoPoint, target: GeoPoint): Observable<RoutingPath> {
    const lat1 = source.lat;
    const lon1 = source.lon;
    const lat2 = target.lat;
    const lon2 = target.lon;
    let params = new HttpParams();
    params = params.append('q', String('[[' + source.lat + ',' + source.lon + '],[' + target.lat + ',' + target.lon + ']]'));
    return this.http.get<RoutingPath>(this.configService.getRoutingUrl(), {params});
  }
}
