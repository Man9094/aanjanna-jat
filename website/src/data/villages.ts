export interface VillageData {
  id: string;
  stateKey: "gujarat" | "mp" | "rajasthan";
  stateNameHi: string;
  stateNameGu: string;
  stateNameEn: string;
  districtHi: string;
  districtGu: string;
  districtEn: string;
  talukaHi: string;
  talukaGu: string;
  talukaEn: string;
  villagesHi: string[];
  villagesGu: string[];
  villagesEn: string[];
  famousHub?: string;
}

// No village, district or tehsil records have been supplied or verified yet.
// The directory feature (search, state/district/tehsil hierarchy, grouping)
// stays in place and will list real records as soon as owner-provided data is
// added here. Counts shown in the directory are derived from this list only.
export const aanjanaVillagesData: VillageData[] = [];
