interface AbilityAttrib {
  key: string;
  header: string;
  value: string[];
  generated?: boolean;
}


export interface OneAbilityFullInfo{
  
    dname: string;
    behavior?: string[];
    dispellable?: string;
    dmg_type?: string;
    bkbpierce?: string;
    desc?: string;
    target_team?: string;
    target_type?:string[];
    attrib?: AbilityAttrib[];
    lore?: string;
    mc?: string[];
    cd?: string[];
    img: string;
  
}

export interface AbilitiesFullInfo {
  [key: string]: {
    dname: string;
    behaviour?: string[];
    dispellable?: string;
    dmg_type?: string;
    bkbpierce?: string;
    desc?: string;
    target_team?: string;
    target_type?:string[];
    attrib?: AbilityAttrib[];
    lore?: string;
    mc?: string[];
    cd?: string[];
    img: string;
  };
}
