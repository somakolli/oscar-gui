export enum SearchState {
  Pending = 0x1,
  Success = 0x2,
  DrawingComplete = 0x4,
  ToManyItems = 0x8,
  NoQuery = 0x16
}
