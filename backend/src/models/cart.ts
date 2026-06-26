export interface cartFlavour {
    flavour?: string;
    name: string;
    count: number;
}

export interface cartStructure {
    user: string;
    flavours?: cartFlavour[];
}
