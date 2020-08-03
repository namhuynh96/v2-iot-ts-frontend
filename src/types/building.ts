export interface Building {
    _id: string;
    name: string;
}

export interface BuildingList {
  buildings: Building[] | null;
  selectedBuildingId: string | null;
  loading: boolean;
  error: boolean;
}

