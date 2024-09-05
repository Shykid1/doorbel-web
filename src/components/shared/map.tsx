import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { StandaloneSearchBox } from "@react-google-maps/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const libraries: ("places" | "geometry" | "drawing")[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

const MapSection: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [currentCoords, setCurrentCoords] = useState(defaultCenter);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pickup, setPickup] = useState("");

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!isLoaded) return;
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results && results[0]) {
            setCurrentLocation(results[0].formatted_address);
          } else {
            console.error("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    },
    [isLoaded]
  );

  useEffect(() => {
    if (!isLoaded) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentCoords({ lat: latitude, lng: longitude });
          reverseGeocode(latitude, longitude);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }, [isLoaded, reverseGeocode]);

  const calculateRoute = useCallback(() => {
    if (!isLoaded || !pickup) return;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pickup,
        destination: currentCoords,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          setDirectionsResponse(result);
          setDistance(result.routes[0].legs[0].distance?.text || "");
          setDuration(result.routes[0].legs[0].duration?.text || "");
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [isLoaded, pickup, currentCoords]);

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setPickup("");
  };

  const findRider = () => {
    console.log("Finding a rider...");
    // Implement rider finding logic here
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      setPickup(places[0].formatted_address || "");
    }
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="map-section">
      <div className="controls mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Schedule a Delivery</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule a Delivery</DialogTitle>
              <DialogDescription>
                Enter the pickup location for your delivery.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="pickup" className="text-right">
                  Pickup
                </label>
                <div className="col-span-3">
                  <StandaloneSearchBox
                    onLoad={(ref) => (searchBoxRef.current = ref)}
                    onPlacesChanged={onPlacesChanged}
                  >
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </StandaloneSearchBox>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="destination" className="text-right">
                  Destination
                </label>
                <Input
                  id="destination"
                  value={currentLocation}
                  className="col-span-3"
                  readOnly
                />
              </div>
            </div>
            {distance && duration && (
              <div className="mt-4">
                <p>Distance: {distance}</p>
                <p>Duration: {duration}</p>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button onClick={calculateRoute}>Calculate Route</Button>
              <Button onClick={clearRoute}>Clear Route</Button>
              <Button onClick={findRider}>Find Rider</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="map-container" style={mapContainerStyle}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentCoords}
          zoom={14}
          onLoad={onMapLoad}
        >
          {map &&
            currentCoords &&
            currentCoords.lat !== 0 &&
            currentCoords.lng !== 0 && (
              <Marker
                position={currentCoords}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapSection;
