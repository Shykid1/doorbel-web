// @/types/place.ts

export type PlaceType = "restaurant" | "grocery" | "supermarket" | "pharmacy";

export interface Place {
  id: string;
  name: string;
  address: string;
  photoUrl: string;
  rating: number;
  userRatingsTotal: number;
  openingHours: {
    openNow: boolean;
  };
  type?: PlaceType;
}
