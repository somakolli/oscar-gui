export class TagSuggestion {
  data: Suggestion[];
  data_until: string;
  page: number;
  rp: number;
  total: number;
  url: string;
}

export class Suggestion {
  count_all: number;
  count_all_fraction: number;
  count_nodes: number;
  count_nodes_fraction: number;
  count_relations: number;
  count_relations_fraction: number;
  count_ways: number;
  count_ways_fraction: number;
  in_wiki: number;
  key: string;
  pojects: number;
  value: string;
}
