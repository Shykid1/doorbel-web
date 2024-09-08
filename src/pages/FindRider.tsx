import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const libraries: ("places" | "geometry" | "drawing" | "marker")[] = [
  "places",
  "marker",
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

interface Rider {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
}

const FindRiderPage: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";
  const MAP_ID = process.env.REACT_APP_GOOGLE_MAP_ID || "";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const fetchSampleRiders = useCallback(() => {
    // In a real application, this would be an API call
    const sampleRiders: Rider[] = [
      {
        id: 1,
        name: "John Doe",
        location: { lat: 40.7128, lng: -74.006 },
        rating: 4.5,
      },
      {
        id: 2,
        name: "Jane Smith",
        location: { lat: 40.7138, lng: -74.008 },
        rating: 4.8,
      },
      {
        id: 3,
        name: "Bob Johnson",
        location: { lat: 40.7118, lng: -74.004 },
        rating: 4.2,
      },
    ];
    setRiders(sampleRiders);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      fetchSampleRiders();
    }
  }, [isLoaded, fetchSampleRiders]);

  const calculatePrice = useCallback((distanceInMeters: number) => {
    const basePrice = 5; // Base price in dollars
    const pricePerKm = 1.5; // Price per kilometer in dollars
    const distanceInKm = distanceInMeters / 1000;
    return basePrice + distanceInKm * pricePerKm;
  }, []);

  const calculateRoute = useCallback(
    (rider: Rider) => {
      if (!isLoaded || !map) return;
      const directionsService = new google.maps.DirectionsService();
      const origin = new google.maps.LatLng(
        rider.location.lat,
        rider.location.lng
      );
      const destination = map.getCenter();

      if (!destination) return;

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirectionsResponse(result);
            const distanceText = result.routes[0].legs[0].distance?.text || "";
            const durationText = result.routes[0].legs[0].duration?.text || "";
            setDistance(distanceText);
            setDuration(durationText);

            const distanceInMeters =
              result.routes[0].legs[0].distance?.value || 0;
            const calculatedPrice = calculatePrice(distanceInMeters);
            setPrice(parseFloat(calculatedPrice.toFixed(2)));
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },
    [isLoaded, map, calculatePrice]
  );

  const handleRiderSelect = (rider: Rider) => {
    setSelectedRider(rider);
    calculateRoute(rider);
    setIsDialogOpen(true);
  };

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const mapOptions = {
    mapId: MAP_ID,
  };

  return (
    <div className="find-rider-page p-4">
      <h1 className="text-2xl font-bold mb-4">Find a Rider</h1>
      <div className="map-container mb-4" style={mapContainerStyle}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: 40.7128, lng: -74.006 }} // New York City coordinates
          zoom={14}
          onLoad={onMapLoad}
          options={mapOptions}
        >
          {riders.map((rider) => (
            <Marker
              key={rider.id}
              position={rider.location}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/motorcycle.png",
                scaledSize: new google.maps.Size(32, 32),
              }}
              onClick={() => handleRiderSelect(rider)}
            />
          ))}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div className="riders-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {riders.map((rider) => (
          <Card key={rider.id} className="rider-card">
            <CardHeader>
              <CardTitle>{rider.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Rating: {rider.rating}</p>
              <Button onClick={() => handleRiderSelect(rider)}>
                Select Rider
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rider Details</DialogTitle>
          </DialogHeader>
          {selectedRider && (
            <div className="rider-details">
              <p>Name: {selectedRider.name}</p>
              <p>Rating: {selectedRider.rating}</p>
              <p>Distance: {distance}</p>
              <p>Duration: {duration}</p>
              <p>Estimated Price: ${price}</p>
              <Button onClick={() => setIsDialogOpen(false)} className="mt-4">
                Confirm Rider
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FindRiderPage;
