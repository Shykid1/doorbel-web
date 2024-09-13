import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

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

interface LocationState {
  pickup: string;
  destination: string;
}

const FindRiderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickup, destination } = location.state as LocationState;

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [riders, setRiders] = useState<Rider[]>([]);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCoords, setCurrentCoords] = useState({
    lat: 0,
    lng: 0,
  });

  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY || "";
  const MAP_ID = process.env.REACT_APP_GOOGLE_MAP_ID || "";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentCoords({ lat: latitude, lng: longitude });
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }, [isLoaded]);

  const fetchSampleRiders = useCallback(() => {
    // In a real application, this would be an API call
    const sampleRiders: Rider[] = [
      {
        id: 1,
        name: "John Doe",
        location: {
          lat: currentCoords.lat + 0.008,
          lng: currentCoords.lng + 0.008,
        },
        rating: 4.5,
      },
      {
        id: 2,
        name: "Jane Smith",
        location: {
          lat: currentCoords.lat - 0.003,
          lng: currentCoords.lng - 0.003,
        },
        rating: 4.8,
      },
      {
        id: 3,
        name: "Bob Johnson",
        location: {
          lat: currentCoords.lat + 0.005,
          lng: currentCoords.lng + 0.005,
        },
        rating: 4.2,
      },
    ];
    setRiders(sampleRiders);
  }, [currentCoords.lat, currentCoords.lng]);

  const calculatePrice = useCallback((distanceInMeters: number) => {
    const basePrice = 5; // Base price in dollars
    const pricePerKm = 1.5; // Price per kilometer in dollars
    const distanceInKm = distanceInMeters / 1000;
    return basePrice + distanceInKm * pricePerKm;
  }, []);

  const calculateRoute = useCallback(() => {
    if (!isLoaded) return;
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
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
  }, [isLoaded, pickup, destination, calculatePrice]);

  useEffect(() => {
    if (isLoaded) {
      fetchSampleRiders();
      calculateRoute();
    }
  }, [isLoaded, fetchSampleRiders, calculateRoute]);

  const handleRiderSelect = (rider: Rider) => {
    setSelectedRider(rider);
    setIsDialogOpen(true);
  };

  const handleGoBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const mapOptions = {
    mapId: MAP_ID,
  };

  return (
    <div className="find-rider-page p-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleGoBack}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Find a Rider</h1>
      </div>
      <div className="map-container mb-4" style={mapContainerStyle}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentCoords}
          zoom={14}
          options={mapOptions}
        >
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                suppressMarkers: true,
              }}
            />
          )}
          {riders.map((rider) => (
            <Marker
              key={rider.id}
              position={rider.location}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor:
                  rider.id === selectedRider?.id ? "#FF0000" : "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
              label={{
                text: "🏍️",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              onClick={() => handleRiderSelect(rider)}
            />
          ))}
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
        <DialogContent
          className="sm:max-w-[425px]"
          aria-describedby="rider-details-description"
        >
          <DialogHeader>
            <DialogTitle>Rider Details</DialogTitle>
            <DialogDescription>
              Review the selected rider's information and trip details.
            </DialogDescription>
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
