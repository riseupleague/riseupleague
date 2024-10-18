"use client";

// google.d.ts
declare global {
	interface Window {
		google: any;
	}
}

export {};

// GymFinder.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@ui/components/card";
import { Loader2, MapPin } from "lucide-react";

// Declare Google Maps API key
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// Mock gyms data
const gyms = [
	{
		id: 1,
		name: "Downtown Basketball Center",
		address: "123 Main St, Cityville",
		lat: 40.7128,
		lng: -74.006,
	},
	{
		id: 2,
		name: "Westside Hoops Arena",
		address: "456 Park Ave, Townsburg",
		lat: 40.7282,
		lng: -73.9942,
	},
	{
		id: 3,
		name: "Eastside Court Complex",
		address: "789 Broadway, Villageton",
		lat: 40.7589,
		lng: -73.9851,
	},
];

export default function HomeGymFinder() {
	const [address, setAddress] = useState("");
	const [userLocation, setUserLocation] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const [nearestGyms, setNearestGyms] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [mapLoaded, setMapLoaded] = useState(false);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
		script.async = true;
		script.onload = () => setMapLoaded(true);
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const geocodeAddress = async (
		address: string
	): Promise<google.maps.LatLng> => {
		if (!window.google || !google.maps) {
			throw new Error("Google Maps API not loaded yet");
		}

		const geocoder = new google.maps.Geocoder();
		return new Promise((resolve, reject) => {
			geocoder.geocode({ address }, (results, status) => {
				if (status === "OK" && results[0]) {
					resolve(results[0].geometry.location);
				} else {
					reject(new Error("Geocoding failed"));
				}
			});
		});
	};

	const findNearestGyms = (userLat: number, userLng: number) => {
		return gyms
			.map((gym) => ({
				...gym,
				distance: getDistance(userLat, userLng, gym.lat, gym.lng),
			}))
			.sort((a, b) => a.distance - b.distance)
			.slice(0, 3);
	};

	const getDistance = (
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number
	) => {
		const R = 6371; // Radius of the earth in km
		const dLat = deg2rad(lat2 - lat1);
		const dLon = deg2rad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) *
				Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c; // Distance in km
		return d;
	};

	const deg2rad = (deg: number) => {
		return deg * (Math.PI / 180);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const location = await geocodeAddress(address);
			setUserLocation({ lat: location.lat(), lng: location.lng() });
			const nearest = findNearestGyms(location.lat(), location.lng());
			setNearestGyms(nearest);
		} catch (error) {
			console.error("Error finding gyms:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (mapLoaded && userLocation) {
			const map = new google.maps.Map(
				document.getElementById("map") as HTMLElement,
				{
					center: userLocation,
					zoom: 12,
				}
			);

			new google.maps.Marker({
				position: userLocation,
				map: map,
				icon: {
					path: google.maps.SymbolPath.CIRCLE,
					scale: 7,
					fillColor: "#4CAF50",
					fillOpacity: 1,
					strokeWeight: 2,
					strokeColor: "#FFFFFF",
				},
			});

			nearestGyms.forEach((gym) => {
				new google.maps.Marker({
					position: { lat: gym.lat, lng: gym.lng },
					map: map,
					title: gym.name,
					icon: {
						path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
						scale: 5,
						fillColor: "#FF5722",
						fillOpacity: 1,
						strokeWeight: 2,
						strokeColor: "#FFFFFF",
					},
				});
			});
		}
	}, [mapLoaded, userLocation, nearestGyms]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="mx-auto max-w-3xl">
					<CardHeader>
						<CardTitle className="text-primary text-center text-3xl font-bold">
							Basketball Gym Finder
						</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="flex space-x-2">
								<Input
									type="text"
									placeholder="Enter your address"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className="flex-grow"
								/>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<MapPin className="mr-2 h-4 w-4" />
									)}
									Find Gyms
								</Button>
							</div>
						</form>

						<div
							id="map"
							className="mt-4 h-64 w-full overflow-hidden rounded-lg"
						/>

						{nearestGyms.length > 0 && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<h3 className="text-primary mb-4 mt-6 text-xl font-semibold">
									Nearest Gyms:
								</h3>
								<div className="space-y-4">
									{nearestGyms.map((gym) => (
										<motion.div
											key={gym.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.4 }}
										>
											<Card className="p-4 shadow-sm">
												<h4 className="text-lg font-semibold">{gym.name}</h4>
												<p className="text-gray-600">{gym.address}</p>
												<p className="text-gray-600">
													Distance: {gym.distance.toFixed(2)} km
												</p>
											</Card>
										</motion.div>
									))}
								</div>
							</motion.div>
						)}
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
