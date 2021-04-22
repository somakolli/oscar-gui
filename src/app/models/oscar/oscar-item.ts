export class OscarItem {
  firstPoint: any;
  geometry: L.GeoJSON;
  properties: {
    id: number;
    osmid: number;
    type: string;
    score: number;
    bbox: number[];
    k: string[];
    v: string[];
    name: string;
  };
  type: string;
  static setName(item: OscarItem): void {
    let nameFound = false;
    for (let i = 0; i < item.properties.k.length; i++) {
      if (item.properties.k[i] === 'name') {
        item.properties.name = item.properties.v[i];
        nameFound = true;
      }
      if (!nameFound) {
        item.properties.name = 'No Name';
      }
    }
  }
  static setFirstPoint(item: OscarItem): void {

  }
  static getValue(item: OscarItem, key: string): string {
    for (let i = 0; i < item.properties.k.length; i++) {
      const searchKey = item.properties.k[i];
      console.log('key-search', key, searchKey, key === searchKey);
      if (key === searchKey ) {
        return item.properties.v[i];
      }
    }
    return null;
  }
}
