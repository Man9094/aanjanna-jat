export interface Leader {
  id: number;
  name: string;
  nameHi: string;
  designation: string;
  designationHi: string;
  bio: string;
  image: string;
  phone?: string;
  email?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  category: "national" | "youth" | "women" | "district";
}

export interface ExecutiveMember {
  id: number;
  name: string;
  nameHi: string;
  designation: string;
  designationHi: string;
  state: "gujarat" | "mp" | "rajasthan";
  district: string;
  phone?: string;
  image: string;
}

// No office bearers, committee members or executive records have been supplied
// or verified yet. The leadership and community-member features (pages, cards,
// state filters) stay in place and will list real people as soon as the
// Mahasabha office provides their details. No names are invented here.
export const leaders: Leader[] = [];
export const communityExecutiveMembers: ExecutiveMember[] = [];
