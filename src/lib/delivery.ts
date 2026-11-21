export const DELIVERY = {
  dhaka: { label: "Inside Dhaka", charge: 70 },
  outside: { label: "Outside Dhaka", charge: 120 },
} as const;

export type Area = keyof typeof DELIVERY;