export interface ItemInfo {
  hint: string[];
  id: number;
  img: string;
  dname: string;
  qual: string;
  cost: number;
  notes: string;
  attrib: [];
  ms: false | number;
  cd: false | number;
  lore: string;
  components: string[] | null;
  created: boolean;
  charges: false | number;
  tier?: number;
}

export interface ItemFullInfo {
  [key: string]: ItemInfo;
}
