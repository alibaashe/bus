import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Package,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle,
  Truck,
  User,
  Share,
} from "lucide-react-native";

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "current" | "pending";
  icon: React.ComponentType<any>;
}

const trackingSteps: TrackingStep[] = [
  {
    id: "1",
    title: "Order Confirmed",
    description: "Your delivery request has been confirmed",
    timestamp: "10:30 AM",
    status: "completed",
    icon: CheckCircle,
  },
  {
    id: "2",
    title: "Driver Assigned",
    description: "Ahmed Hassan is assigned to your delivery",
    timestamp: "10:35 AM",
    status: "completed",
    icon: User,
  },
  {
    id: "3",
    title: "Package Picked Up",
    description: "Your package has been collected from pickup location",
    timestamp: "11:15 AM",
    status: "current",
    icon: Package,
  },
  {
    id: "4",
    title: "Out for Delivery",
    description: "Package is on the way to destination",
    timestamp: "Est. 11:45 AM",
    status: "pending",
    icon: Truck,
  },
  {
    id: "5",
    title: "Delivered",
    description: "Package delivered successfully",
    timestamp: "Est. 12:30 PM",
    status: "pending",
    icon: CheckCircle,
  },
];

export default function DeliveryTrackingScreen() {
  const params = useLocalSearchParams();
  const trackingId = params.trackingId as string || "DL123456";
  const [currentStepIndex, setCurrentStepIndex] = useState(2);
  const [steps, setSteps] = useState(trackingSteps);

  useEffect(() => {
    // Simulate delivery progress
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          const newSteps = [...steps];
          if (prev >= 0) {
            newSteps[prev].status = "completed";
          }
          if (prev + 1 < steps.length) {
            newSteps[prev + 1].status = "current";
            newSteps[prev + 1].timestamp = new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }
          setSteps(newSteps);
          return prev + 1;
        }
        return prev;
      });
    }, 15000); // Progress every 15 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const handleCallDriver = () => {
    Alert.alert(
      "Call Driver",
      "Call Ahmed Hassan?",
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

  const handleShareTracking = () => {
    Alert.alert(
      "Share Tracking",
      `Share tracking link for ${trackingId}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Share", onPress: () => console.log("Sharing tracking...") },
      ]
    );
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "current":
        return "#2563eb";
      default:
        return "#e2e8f0";
    }
  };

  const getStepTextColor = (status: string) => {
    switch (status) {
      case "completed":
      case "current":
        return "#1f2937";
      default:
        return "#9ca3af";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Delivery</Text>
        <TouchableOpacity onPress={handleShareTracking} style={styles.shareButton}>
          <Share size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tracking ID Card */}
        <View style={styles.trackingCard}>
          <View style={styles.trackingHeader}>
            <Package size={24} color="#2563eb" />
            <View style={styles.trackingInfo}>
              <Text style={styles.trackingId}>#{trackingId}</Text>
              <Text style={styles.trackingStatus}>
                {steps[currentStepIndex]?.title || "Processing"}
              </Text>
            </View>
          </View>
          <Text style={styles.estimatedTime}>
            Estimated delivery: {steps[steps.length - 1]?.timestamp}
          </Text>
        </View>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitial}>A</Text>
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>Ahmed Hassan</Text>
              <Text style={styles.driverRole}>Delivery Driver</Text>
              <Text style={styles.vehicleInfo}>Toyota Hiace • ABC-789</Text>
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
        </View>

        {/* Delivery Route */}
        <View style={styles.routeCard}>
          <Text style={styles.routeTitle}>Delivery Route</Text>
          <View style={styles.routeInfo}>
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: "#10b981" }]} />
              <View style={styles.routeDetails}>
                <Text style={styles.routeLabel}>Pickup</Text>
                <Text style={styles.routeAddress}>123 Main Street, Hargeisa</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, { backgroundColor: "#ef4444" }]} />
              <View style={styles.routeDetails}>
                <Text style={styles.routeLabel}>Delivery</Text>
                <Text style={styles.routeAddress}>456 Oak Avenue, Hargeisa</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tracking Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>Delivery Progress</Text>
          <View style={styles.timeline}>
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <View key={step.id} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View
                      style={[
                        styles.timelineIcon,
                        { backgroundColor: getStepStatusColor(step.status) },
                      ]}
                    >
                      <IconComponent
                        size={16}
                        color={step.status === "pending" ? "#9ca3af" : "#ffffff"}
                      />
                    </View>
                    {index < steps.length - 1 && (
                      <View
                        style={[
                          styles.timelineLine,
                          {
                            backgroundColor:
                              step.status === "completed" ? "#10b981" : "#e2e8f0",
                          },
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <View style={styles.timelineHeader}>
                      <Text
                        style={[
                          styles.timelineStepTitle,
                          { color: getStepTextColor(step.status) },
                        ]}
                      >
                        {step.title}
                      </Text>
                      <Text
                        style={[
                          styles.timelineTimestamp,
                          { color: getStepTextColor(step.status) },
                        ]}
                      >
                        {step.timestamp}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.timelineDescription,
                        { color: getStepTextColor(step.status) },
                      ]}
                    >
                      {step.description}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Package Details */}
        <View style={styles.packageCard}>
          <Text style={styles.packageTitle}>Package Details</Text>
          <View style={styles.packageInfo}>
            <View style={styles.packageRow}>
              <Text style={styles.packageLabel}>Description:</Text>
              <Text style={styles.packageValue}>Electronics</Text>
            </View>
            <View style={styles.packageRow}>
              <Text style={styles.packageLabel}>Weight:</Text>
              <Text style={styles.packageValue}>2.5 kg</Text>
            </View>
            <View style={styles.packageRow}>
              <Text style={styles.packageLabel}>Value:</Text>
              <Text style={styles.packageValue}>$150</Text>
            </View>
            <View style={styles.packageRow}>
              <Text style={styles.packageLabel}>Service:</Text>
              <Text style={styles.packageValue}>Express Delivery</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Action Buttons */}
      {currentStepIndex < steps.length - 1 && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>🚨 Report Issue</Text>
          </TouchableOpacity>
        </View>
      )}
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
  content: {
    flex: 1,
  },
  trackingCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  trackingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  trackingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  trackingId: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  trackingStatus: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "500",
  },
  estimatedTime: {
    fontSize: 14,
    color: "#64748b",
  },
  driverCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
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
  driverRole: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 2,
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
  routeCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  routeInfo: {
    gap: 8,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  routeDetails: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 2,
  },
  routeAddress: {
    fontSize: 14,
    color: "#1f2937",
  },
  routeLine: {
    width: 1,
    height: 20,
    backgroundColor: "#e2e8f0",
    marginLeft: 4,
  },
  timelineCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  timeline: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 16,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineLine: {
    width: 2,
    height: 24,
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  timelineStepTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  timelineTimestamp: {
    fontSize: 12,
    fontWeight: "500",
  },
  timelineDescription: {
    fontSize: 12,
  },
  packageCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  packageInfo: {
    gap: 8,
  },
  packageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  packageLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  packageValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emergencyButton: {
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
  spacer: {
    height: 20,
  },
});