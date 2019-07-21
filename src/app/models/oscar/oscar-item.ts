export class OscarItem {
  id: number;
  osmid: number;
  type: string;
  score: number;
  bbox: number[];
  shape: any;
  k: string[];
  v: string[];
  name: string;
  static setName(item: OscarItem): void {
    for (let i = 0; i < item.k.length; i++) {
      if (item.k[i] === 'name') {
        item.name = item.v[i];
      }
    }
  }
}
