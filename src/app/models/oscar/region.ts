declare var L;
export class Region {
  regionId: number;
  name: string;
  shape: L.GeoJSON;
  boundary: L.LatLngBounds;
}
