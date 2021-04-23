import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class WikiData {
  pictures =  new Array<string>();
  population: number;
  area: number;
  coatOfArmsUrl: string;
  name = 'Region';
  postalCode: string = null;
}
@Injectable({
  providedIn: 'root'
})
export class WikiServiceService {
  constructor(private http: HttpClient) { }
  async getPictureUrls(entity: string): Promise<WikiData> {
    const wikidataResponse = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${entity}&format=json&origin=*`);
    const wikidata = await wikidataResponse.json();
    const wikiData = new WikiData();
    if (wikidata.claims.P18) {
      for (const claim of wikidata.claims.P18) {
        const pictureName = claim.mainsnak.datavalue.value;
        const url = this.getPictureUrl(pictureName);
        wikiData.pictures.push(url);
      }
    }
    if (wikidata.claims.P1082)
      wikiData.population = Number.parseInt(wikidata.claims.P1082.pop().mainsnak.datavalue.value.amount, 10);
    if (wikidata.claims.P2046)
      wikiData.area = Number.parseFloat(wikidata.claims.P2046.pop().mainsnak.datavalue.value.amount);
    if (wikidata.claims.P94)
      wikiData.coatOfArmsUrl = this.getPictureUrl(wikidata.claims.P94.pop().mainsnak.datavalue.value);
    if (wikidata.claims.P373)
      wikiData.name = 'Region: ' + wikidata.claims.P373.pop().mainsnak.datavalue.value;
    if(wikidata.claims.P281)
      wikiData.postalCode = wikidata.claims.P281.pop().mainsnak.datavalue.value;
    return wikiData;
  }
  getPictureUrl(pictureName: string) {
    return `https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/${pictureName}&width=400&origin=*`;
  }
}
