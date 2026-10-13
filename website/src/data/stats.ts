export interface CommunityStat {
  id: number;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

// Community statistics are never estimated or invented. This list stays empty
// until the Mahasabha office supplies figures that can be verified; counters
// are computed from real records wherever possible.
export const communityStats: CommunityStat[] = [];
