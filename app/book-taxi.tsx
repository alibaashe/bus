import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  Car,
  Users,
  Star,
  Phone,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

interface TaxiType {
  id: string;
  name: string;
  capacity: number;
  pricePerKm: number;
  estimatedTime: string;
  icon: string;
  description: string;
}

interface Driver {
  id: string;
  name: string;
  rating: number;
  vehicle: string;
  plateNumber: string;
  estimatedArrival: string;
  distance: string;
}

const taxiTypes: TaxiType[] = [
  {
    id: "1",
    name: "Economy",
    capacity: 4,
    pricePerKm: 2.5,
    estimatedTime: "5-10 min",
    icon: "🚗",
    description: "Affordable rides for everyday trips",
  },
  {
    id: "2",
    name: "Comfort",
    capacity: 4,
    pricePerKm: 3.5,
    estimatedTime: "3-8 min",
    icon: "🚙",
    description: "More space and comfort",
  },
  {
    id: "3",
    name: "Premium",
    capacity: 4,
    pricePerKm: 5.0,
    estimatedTime: "2-5 min",
    icon: "🚘",
    description: "Luxury vehicles for special occasions",
  },
  {
    id: "4",
    name: "Van",
    capacity: 8,
    pricePerKm: 4.0,
    estimatedTime: "5-12 min",
    icon: "🚐",
    description: "Perfect for groups and families",
  },
];

const availableDrivers: Driver[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    rating: 4.8,
    vehicle: "Toyota Camry 2020",
    plateNumber: "ABC-123",
    estimatedArrival: "3 min",
    distance: "0.8 km away",
  },
  {
    id: "2",
    name: "Mohamed Ali",
    rating: 4.9,
    vehicle: "Honda Accord 2021",
    plateNumber: "XYZ-456",
    estimatedArrival: "5 min",
    distance: "1.2 km away",
  },
  {
    id: "3",
    name: "Omar Farah",
    rating: 4.7,
    vehicle: "Nissan Altima 2019",
    plateNumber: "DEF-789",
    estimatedArrival: "7 min",
    distance: "1.8 km away",
  },
];

export default function BookTaxiScreen() {
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [destination, setDestination] = useState("");
  const [selectedTaxiType, setSelectedTaxiType] = useState<TaxiType>(taxiTypes[0]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showDrivers, setShowDrivers] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [bookingStep, setBookingStep] = useState<"select" | "confirm" | "tracking">("select");

  useEffect(() => {
    // Simulate price calculation based on distance
    const estimatedDistance = 5; // km
    setEstimatedPrice(estimatedDistance * selectedTaxiType.pricePerKm);
  }, [selectedTaxiType]);

  const handleBookRide = () => {
    if (!destination.trim()) {
      Alert.alert("Error", "Please enter your destination");
      return;
    }
    setShowDrivers(true);
    setBookingStep("confirm");
  };

  const confirmBooking = (driver: Driver) => {
    setSelectedDriver(driver);
    setBookingStep("tracking");
    Alert.alert(
      "Ride Booked!",
      `${driver.name} will arrive in ${driver.estimatedArrival}. You can track your ride now.`,
      [
        {
          text: "OK",
          onPress: () => {
            // Navigate to ride tracking screen
            router.push({
              pathname: "/ride-tracking",
              params: {
                driverId: driver.id,
                driverName: driver.name,
                vehicle: driver.vehicle,
                plateNumber: driver.plateNumber,
                estimatedArrival: driver.estimatedArrival,
              },
            });
          },
        },
      ]
    );
  };

  if (showDrivers) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowDrivers(false)}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Available Drivers</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.tripSummary}>
            <Text style={styles.tripTitle}>Trip Summary</Text>
            <View style={styles.tripRoute}>
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, { backgroundColor: "#10b981" }]} />
                <Text style={styles.routeText}>{pickupLocation}</Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routePoint}>
                <View style={[styles.routeDot, { backgroundColor: "#ef4444" }]} />
                <Text style={styles.routeText}>{destination}</Text>
              </View>
            </View>
            <View style={styles.tripDetails}>
              <Text style={styles.tripDetailText}>
                {selectedTaxiType.name} • ${estimatedPrice.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.driversSection}>
            <Text style={styles.sectionTitle}>Choose Your Driver</Text>
            {availableDrivers.map((driver) => (
              <TouchableOpacity
                key={driver.id}
                style={styles.driverCard}
                onPress={() => confirmBooking(driver)}
              >
                <View style={styles.driverInfo}>
                  <View style={styles.driverAvatar}>
                    <Text style={styles.driverInitial}>
                      {driver.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.driverDetails}>
                    <Text style={styles.driverName}>{driver.name}</Text>
                    <View style={styles.driverRating}>
                      <Star size={14} color="#fbbf24" fill="#fbbf24" />
                      <Text style={styles.ratingText}>{driver.rating}</Text>
                    </View>
                    <Text style={styles.vehicleInfo}>
                      {driver.vehicle} • {driver.plateNumber}
                    </Text>
                  </View>
                </View>
                <View style={styles.driverMeta}>
                  <Text style={styles.arrivalTime}>{driver.estimatedArrival}</Text>
                  <Text style={styles.driverDistance}>{driver.distance}</Text>
                  <TouchableOpacity style={styles.callButton}>
                    <Phone size={16} color="#2563eb" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Taxi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Location Inputs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Where to?</Text>
          
          <View style={styles.locationContainer}>
            <View style={styles.locationInput}>
              <MapPin size={20} color="#10b981" />
              <TextInput
                style={styles.locationText}
                value={pickupLocation}
                onChangeText={setPickupLocation}
                placeholder="Pickup location"
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity>
                <Navigation size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.locationInput}>
              <MapPin size={20} color="#ef4444" />
              <TextInput
                style={styles.locationText}
                value={destination}
                onChangeText={setDestination}
                placeholder="Where are you going?"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>
        </View>

        {/* Taxi Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Vehicle Type</Text>
          <View style={styles.taxiTypesContainer}>
            {taxiTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.taxiTypeCard,
                  selectedTaxiType.id === type.id && styles.selectedTaxiType,
                ]}
                onPress={() => setSelectedTaxiType(type)}
              >
                <View style={styles.taxiTypeHeader}>
                  <Text style={styles.taxiTypeIcon}>{type.icon}</Text>
                  <View style={styles.taxiTypeInfo}>
                    <Text style={styles.taxiTypeName}>{type.name}</Text>
                    <Text style={styles.taxiTypeTime}>{type.estimatedTime}</Text>
                  </View>
                  <Text style={styles.taxiTypePrice}>${type.pricePerKm}/km</Text>
                </View>
                <Text style={styles.taxiTypeDescription}>{type.description}</Text>
                <View style={styles.taxiTypeFooter}>
                  <View style={styles.capacityInfo}>
                    <Users size={14} color="#64748b" />
                    <Text style={styles.capacityText}>{type.capacity} seats</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Estimate */}
        <View style={styles.section}>
          <View style={styles.priceEstimate}>
            <View style={styles.priceHeader}>
              <DollarSign size={20} color="#2563eb" />
              <Text style={styles.priceTitle}>Estimated Fare</Text>
            </View>
            <Text style={styles.priceAmount}>${estimatedPrice.toFixed(2)}</Text>
            <Text style={styles.priceNote}>
              *Final price may vary based on actual distance and time
            </Text>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Book Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
          <Car size={20} color="#ffffff" />
          <Text style={styles.bookButtonText}>Book {selectedTaxiType.name}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  locationContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  taxiTypesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  taxiTypeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  selectedTaxiType: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  taxiTypeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  taxiTypeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  taxiTypeInfo: {
    flex: 1,
  },
  taxiTypeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  taxiTypeTime: {
    fontSize: 12,
    color: "#64748b",
  },
  taxiTypePrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
  taxiTypeDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  taxiTypeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  capacityInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  capacityText: {
    fontSize: 12,
    color: "#64748b",
  },
  priceEstimate: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  priceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 4,
  },
  priceNote: {
    fontSize: 12,
    color: "#64748b",
  },
  footer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  spacer: {
    height: 20,
  },
  // Driver selection styles
  tripSummary: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  tripRoute: {
    marginBottom: 12,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  routeLine: {
    width: 1,
    height: 20,
    backgroundColor: "#e2e8f0",
    marginLeft: 4,
    marginBottom: 8,
  },
  routeText: {
    fontSize: 14,
    color: "#1f2937",
  },
  tripDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  tripDetailText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2563eb",
  },
  driversSection: {
    paddingHorizontal: 20,
  },
  driverCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  driverInfo: {
    flexDirection: "row",
    flex: 1,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  driverInitial: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  driverRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 12,
    color: "#64748b",
  },
  vehicleInfo: {
    fontSize: 12,
    color: "#64748b",
  },
  driverMeta: {
    alignItems: "flex-end",
  },
  arrivalTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10b981",
    marginBottom: 2,
  },
  driverDistance: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  callButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
  },
});