import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// Define types for our context
type Location = {
  latitude: number;
  longitude: number;
};

type PlaceType =
  | "restaurant"
  | "grocery_supermarket"
  | "supermarket"
  | "pharmacy";

type Place = {
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
};

type PlacesContextType = {
  location: Location | null;
  restaurants: Place[];
  groceries: Place[];
  supermarkets: Place[];
  pharmacies: Place[];
  isLoading: boolean;
  error: string | null;
  refreshRestaurants: () => Promise<void>;
  refreshGroceries: () => Promise<void>;
  refreshSupermarkets: () => Promise<void>;
  refreshPharmacies: () => Promise<void>;
};

// Create the context
const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

// API key should be stored in an environment variable
const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

export const PlacesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [groceries, setGroceries] = useState<Place[]>([]);
  const [supermarkets, setSupermarkets] = useState<Place[]>([]);
  const [pharmacies, setPharmacies] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(`Error: ${error.message}`);
          }
        );
      }
    });
  };

  const baseUrl = process.env.BASE_URL;

  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=35000&type=${type}&key=${API_KEY}
  const fetchPlaces = useCallback(
    async (type: PlaceType, location: Location): Promise<Place[]> => {
      const url = `${baseUrl}/places/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=35000&type=${type}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.status === "OK") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return data.results.map((place: any) => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            photoUrl:
              place.photos && place.photos[0]
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`
                : "",
            rating: place.rating || 0,
            userRatingsTotal: place.user_ratings_total || 0,
            openingHours: place.opening_hours
              ? {
                  openNow: place.opening_hours.open_now,
                  periods: place.opening_hours.periods || [],
                }
              : { openNow: false, periods: [] },
            type,
          }));
        } else {
          throw new Error(`API returned status: ${data.status}`);
        }
      } catch (error) {
        throw new Error(`Failed to fetch ${type}s: ${error}`);
      }
    },
    []
  );

  const refreshPlaces = useCallback(
    async (type: PlaceType) => {
      if (!location) {
        setError("Location not available");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const places = await fetchPlaces(type, location);
        switch (type) {
          case "restaurant":
            setRestaurants(places);
            break;
          case "grocery_supermarket":
            setGroceries(places);
            break;
          case "supermarket":
            setSupermarkets(places);
            break;
          case "pharmacy":
            setPharmacies(places);
            break;
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [location, fetchPlaces]
  );

  const refreshRestaurants = useCallback(
    () => refreshPlaces("restaurant"),
    [refreshPlaces]
  );
  const refreshGroceries = useCallback(
    () => refreshPlaces("grocery_supermarket"),
    [refreshPlaces]
  );
  const refreshSupermarkets = useCallback(
    () => refreshPlaces("supermarket"),
    [refreshPlaces]
  );
  const refreshPharmacies = useCallback(
    () => refreshPlaces("pharmacy"),
    [refreshPlaces]
  );

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const userLocation = await getUserLocation();
        setLocation(userLocation);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    initializeLocation();
  }, []);

  useEffect(() => {
    if (location) {
      refreshRestaurants();
      refreshGroceries();
      refreshSupermarkets();
      refreshPharmacies();
    }
  }, [
    location,
    refreshRestaurants,
    refreshGroceries,
    refreshSupermarkets,
    refreshPharmacies,
  ]);

  const contextValue: PlacesContextType = {
    location,
    restaurants,
    groceries,
    supermarkets,
    pharmacies,
    isLoading,
    error,
    refreshRestaurants,
    refreshGroceries,
    refreshSupermarkets,
    refreshPharmacies,
  };

  return (
    <PlacesContext.Provider value={contextValue}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (context === undefined) {
    throw new Error("usePlaces must be used within a PlacesProvider");
  }
  return context;
};
