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
  firstPoint: any;
  static setName(item: OscarItem): void {
    let nameFound = false;
    for (let i = 0; i < item.k.length; i++) {
      if (item.k[i] === 'name') {
        item.name = item.v[i];
        nameFound = true;
      }
      if (!nameFound) {
        item.name = 'No Name';
      }
    }
  }
}
