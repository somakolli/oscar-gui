export class ParentRefinements {
  clustering: Parent[];
  hasMore: boolean;
  queryId: number;
}

export class Parent {
  name: string;
}

export class FacetRefinements {
  clustering: Facet[];
  hasMore: boolean;
  queryId: number;
}
export class Facet {
  key: string;
  keyId: number;
  hasMore: boolean;
  values: FacetValues[];
}
export class FacetValues {
  name: string;
  count: number;
}
