import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TagSuggestion} from '../../models/osm/tag-suggestion';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OsmService {

  constructor(private http: HttpClient) { }
  getTagSuggestions(key: string, value: string): Observable<TagSuggestion> {
    let url = 'https://taginfo.openstreetmap.org/api/4/tags/popular?sortname=count_all&sortorder=desc&page=1&rp=10&query=';
    if (key !== '') {
      if (value === '') {
        url = url + key;
      } else {
        url = url + value + '&key=' + key;
      }
    } else {
      url = url + value;
    }
    return this.http.get<TagSuggestion>(url);
  }
}
