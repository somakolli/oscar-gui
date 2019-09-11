export enum RefinementType {
  Parent,
  Key,
  KeyValue
}
export class Refinement {
  id: number;
  key = '';
  value = '';
  refinementType: RefinementType;
}
export class ActiveRefinement extends Refinement {
  excluding: boolean;
}


