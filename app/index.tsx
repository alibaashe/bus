import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Car,
  Star,
  Navigation,
  Share,
} from "lucide-react-native";

const { width, height } = Dimensions.get("window");

interface RideStatus {
  status: string;
  message: string;
  estimatedTime: string;
  color: string;
}

const rideStatuses: RideStatus[] = [
  {
    status: "confirmed",
    message: "Driver is on the way",
    estimatedTime: "3 min",
    color: "#f59e0b",
  },
  {
    status: "arrived",
    message: "Driver has arrived",
    estimatedTime: "Now",
    color: "#10b981",
  },
  {
    status: "pickup",
    message: "Trip in progress",
    estimatedTime: "12 min",
    color: "#2563eb",
  },
  {
    status: "completed",
    message: "Trip completed",
    estimatedTime: "Arrived",
    color: "#10b981",
  },
];

export default function RideTrackingScreen() {
  const params = useLocalSearchParams();
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [driverLocation, setDriverLocation] = useState({ lat: 9.5370, lng: 44.0750 });

  const driverName = params.driverName as string || "Ahmed Hassan";
  const vehicle = params.vehicle as string || "Toyota Camry 2020";
  const plateNumber = params.plateNumber as string || "ABC-123";
  const estimatedArrival = params.estimatedArrival as string || "3 min";

  useEffect(() => {
    // Simulate ride progress
    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => {
        if (prev < rideStatuses.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 10000); // Change status every 10 seconds for demo

    // Pulse animation for current location
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      clearInterval(interval);
      pulseAnimation.stop();
    };
  }, []);

  const currentStatus = rideStatuses[currentStatusIndex];

  const handleCallDriver = () => {
    Alert.alert(
      "Call Driver",
      `Call ${driverName}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => console.log("Calling driver...") },
      ]
    );
  };

  const handleMessageDriver = () => {
    Alert.alert(
      "Message Driver",
      "Send a message to your driver?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Message", onPress: () => console.log("Opening messages...") },
      ]
    );
  };

  const handleShareTrip = () => {
    Alert.alert(
      "Share Trip",
      "Share your trip details with someone?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Share", onPress: () => console.log("Sharing trip...") },
      ]
    );
  };

  const handleCancelRide = () => {
    Alert.alert(
      "Cancel Ride",
      "Are you sure you want to cancel this ride?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            Alert.alert("Ride Cancelled", "Your ride has been cancelled.", [
              { text: "OK", onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  if (currentStatusIndex === rideStatuses.length - 1) {
    // Trip completed screen
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completedContainer}>
          <View style={styles.completedIcon}>
            <Text style={styles.completedEmoji}>🎉</Text>
          </View>
          <Text style={styles.completedTitle}>Trip Completed!</Text>
          <Text style={styles.completedMessage}>
            Thank you for riding with {driverName}
          </Text>
          
          <View style={styles.tripSummary}>
            <Text style={styles.summaryTitle}>Trip Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Driver:</Text>
              <Text style={styles.summaryValue}>{driverName}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Vehicle:</Text>
              <Text style={styles.summaryValue}>{vehicle}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Fare:</Text>
              <Text style={styles.summaryValue}>$12.50</Text>
            </View>
          </View>

          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>Rate your driver</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} style={styles.starButton}>
                  <Star size={32} color="#fbbf24" fill="#fbbf24" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.back()}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Ride</Text>
        <TouchableOpacity onPress={handleShareTrip} style={styles.shareButton}>
          <Share size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>🗺️ Live Map View</Text>
          <Text style={styles.mapSubtext}>Tracking your ride in real-time</Text>
          
          {/* Driver Location Indicator */}
          <Animated.View
            style={[
              styles.driverLocationIndicator,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <Car size={20} color="#ffffff" />
          </Animated.View>
          
          {/* Your Location Indicator */}
          <View style={styles.yourLocationIndicator}>
            <Navigation size={16} color="#ffffff" />
          </View>
        </View>
      </View>

      {/* Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: currentStatus.color },
            ]}
          />
          <View style={styles.statusInfo}>
            <Text style={styles.statusMessage}>{currentStatus.message}</Text>
            <Text style={styles.statusTime}>
              Estimated: {currentStatus.estimatedTime}
            </Text>
          </View>
        </View>

        {/* Driver Info */}
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverInitial}>{driverName.charAt(0)}</Text>
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driverName}</Text>
            <View style={styles.driverRating}>
              <Star size={14} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
            <Text style={styles.vehicleInfo}>
              {vehicle} • {plateNumber}
            </Text>
          </View>
          <View style={styles.driverActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleCallDriver}
            >
              <Phone size={20} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleMessageDriver}
            >
              <MessageCircle size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trip Progress */}
        <View style={styles.tripProgress}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, { backgroundColor: "#10b981" }]} />
            <Text style={styles.progressText}>Pickup Location</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, { backgroundColor: "#ef4444" }]} />
            <Text style={styles.progressText}>Destination</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {currentStatusIndex === 0 && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelRide}
          >
            <Text style={styles.cancelButtonText}>Cancel Ride</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>🚨 Emergency</Text>
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
  shareButton: {
    padding: 4,
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  mapText: {
    fontSize: 24,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: "#64748b",
  },
  driverLocationIndicator: {
    position: "absolute",
    top: "30%",
    left: "60%",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },
  yourLocationIndicator: {
    position: "absolute",
    bottom: "30%",
    left: "40%",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },
  statusCard: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  statusTime: {
    fontSize: 14,
    color: "#64748b",
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
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
  driverActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  tripProgress: {
    marginBottom: 20,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  progressText: {
    fontSize: 14,
    color: "#1f2937",
  },
  progressLine: {
    width: 1,
    height: 20,
    backgroundColor: "#e2e8f0",
    marginLeft: 4,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  emergencyButton: {
    flex: 1,
    backgroundColor: "#dc2626",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  // Completed screen styles
  completedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  completedIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  completedEmoji: {
    fontSize: 32,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  completedMessage: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
  },
  tripSummary: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  ratingSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  doneButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    alignItems: "center",
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});