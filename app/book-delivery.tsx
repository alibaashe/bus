import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Package2,
  Zap,
  Shield,
  Calendar,
  User,
  Phone,
} from "lucide-react-native";

interface DeliveryOption {
  id: string;
  name: string;
  duration: string;
  price: number;
  icon: string;
  description: string;
  features: string[];
}

const deliveryOptions: DeliveryOption[] = [
  {
    id: "1",
    name: "Express Delivery",
    duration: "1-2 hours",
    price: 15.0,
    icon: "⚡",
    description: "Fastest delivery for urgent items",
    features: ["Real-time tracking", "Priority handling", "SMS updates"],
  },
  {
    id: "2",
    name: "Same Day",
    duration: "4-6 hours",
    price: 10.0,
    icon: "🚚",
    description: "Delivered within the same day",
    features: ["Scheduled delivery", "Photo confirmation", "SMS updates"],
  },
  {
    id: "3",
    name: "Next Day",
    duration: "24 hours",
    price: 7.0,
    icon: "📦",
    description: "Reliable next-day delivery",
    features: ["Tracking available", "Secure handling", "Email updates"],
  },
  {
    id: "4",
    name: "Standard",
    duration: "2-3 days",
    price: 5.0,
    icon: "🚛",
    description: "Economical delivery option",
    features: ["Basic tracking", "Standard handling", "Email updates"],
  },
];

interface DeliveryDetails {
  pickupAddress: string;
  deliveryAddress: string;
  pickupContact: {
    name: string;
    phone: string;
  };
  deliveryContact: {
    name: string;
    phone: string;
  };
  packageDetails: {
    description: string;
    weight: string;
    value: string;
    specialInstructions: string;
  };
  scheduledTime: string;
}

export default function BookDeliveryScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<DeliveryOption>(deliveryOptions[0]);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    pickupAddress: "",
    deliveryAddress: "",
    pickupContact: { name: "", phone: "" },
    deliveryContact: { name: "", phone: "" },
    packageDetails: {
      description: "",
      weight: "",
      value: "",
      specialInstructions: "",
    },
    scheduledTime: "ASAP",
  });

  const handleNext = () => {
    if (currentStep === 1) {
      if (!deliveryDetails.pickupAddress || !deliveryDetails.deliveryAddress) {
        Alert.alert("Error", "Please enter both pickup and delivery addresses");
        return;
      }
    } else if (currentStep === 2) {
      if (
        !deliveryDetails.pickupContact.name ||
        !deliveryDetails.pickupContact.phone ||
        !deliveryDetails.deliveryContact.name ||
        !deliveryDetails.deliveryContact.phone
      ) {
        Alert.alert("Error", "Please fill in all contact information");
        return;
      }
    } else if (currentStep === 3) {
      if (!deliveryDetails.packageDetails.description) {
        Alert.alert("Error", "Please describe the package");
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleBookDelivery();
    }
  };

  const handleBookDelivery = () => {
    const trackingId = `DL${Date.now().toString().slice(-6)}`;
    Alert.alert(
      "Delivery Booked!",
      `Your delivery has been scheduled. Tracking ID: ${trackingId}\n\nEstimated delivery: ${selectedOption.duration}`,
      [
        {
          text: "Track Order",
          onPress: () => {
            router.push({
              pathname: "/delivery-tracking",
              params: { trackingId },
            });
          },
        },
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              currentStep >= step && styles.activeStep,
            ]}
          >
            <Text
              style={[
                styles.stepNumber,
                currentStep >= step && styles.activeStepText,
              ]}
            >
              {step}
            </Text>
          </View>
          {step < 4 && (
            <View
              style={[
                styles.stepLine,
                currentStep > step && styles.activeStepLine,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderAddressStep = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pickup & Delivery Addresses</Text>
      <View style={styles.inputContainer}>
        <View style={styles.addressInput}>
          <MapPin size={20} color="#10b981" />
          <TextInput
            style={styles.addressText}
            placeholder="Pickup address"
            value={deliveryDetails.pickupAddress}
            onChangeText={(text) =>
              setDeliveryDetails({ ...deliveryDetails, pickupAddress: text })
            }
            multiline
          />
        </View>
        <View style={styles.addressInput}>
          <MapPin size={20} color="#ef4444" />
          <TextInput
            style={styles.addressText}
            placeholder="Delivery address"
            value={deliveryDetails.deliveryAddress}
            onChangeText={(text) =>
              setDeliveryDetails({ ...deliveryDetails, deliveryAddress: text })
            }
            multiline
          />
        </View>
      </View>

      {/* Quick Address Options */}
      <View style={styles.quickAddresses}>
        <Text style={styles.quickAddressTitle}>Quick Select</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quickAddressContainer}>
            {["Home", "Office", "Mall", "Airport", "Hospital"].map((location) => (
              <TouchableOpacity key={location} style={styles.quickAddressButton}>
                <Text style={styles.quickAddressText}>{location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );

  const renderContactStep = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>
      
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Pickup Contact</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contact Name"
            value={deliveryDetails.pickupContact.name}
            onChangeText={(text) =>
              setDeliveryDetails({
                ...deliveryDetails,
                pickupContact: { ...deliveryDetails.pickupContact, name: text },
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={deliveryDetails.pickupContact.phone}
            onChangeText={(text) =>
              setDeliveryDetails({
                ...deliveryDetails,
                pickupContact: { ...deliveryDetails.pickupContact, phone: text },
              })
            }
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Delivery Contact</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contact Name"
            value={deliveryDetails.deliveryContact.name}
            onChangeText={(text) =>
              setDeliveryDetails({
                ...deliveryDetails,
                deliveryContact: { ...deliveryDetails.deliveryContact, name: text },
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={deliveryDetails.deliveryContact.phone}
            onChangeText={(text) =>
              setDeliveryDetails({
                ...deliveryDetails,
                deliveryContact: { ...deliveryDetails.deliveryContact, phone: text },
              })
            }
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );

  const renderPackageStep = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Package Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What are you sending? (e.g., Documents, Food, Electronics)"
          value={deliveryDetails.packageDetails.description}
          onChangeText={(text) =>
            setDeliveryDetails({
              ...deliveryDetails,
              packageDetails: {
                ...deliveryDetails.packageDetails,
                description: text,
              },
            })
          }
          multiline
          numberOfLines={3}
        />
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              value={deliveryDetails.packageDetails.weight}
              onChangeText={(text) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  packageDetails: {
                    ...deliveryDetails.packageDetails,
                    weight: text,
                  },
                })
              }
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfWidth}>
            <TextInput
              style={styles.input}
              placeholder="Value ($)"
              value={deliveryDetails.packageDetails.value}
              onChangeText={(text) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  packageDetails: {
                    ...deliveryDetails.packageDetails,
                    value: text,
                  },
                })
              }
              keyboardType="numeric"
            />
          </View>
        </View>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Special instructions (optional)"
          value={deliveryDetails.packageDetails.specialInstructions}
          onChangeText={(text) =>
            setDeliveryDetails({
              ...deliveryDetails,
              packageDetails: {
                ...deliveryDetails.packageDetails,
                specialInstructions: text,
              },
            })
          }
          multiline
          numberOfLines={2}
        />
      </View>

      {/* Scheduling */}
      <View style={styles.schedulingSection}>
        <Text style={styles.contactTitle}>Pickup Time</Text>
        <View style={styles.timeOptions}>
          {["ASAP", "In 1 hour", "In 2 hours", "Schedule later"].map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeOption,
                deliveryDetails.scheduledTime === time && styles.selectedTimeOption,
              ]}
              onPress={() =>
                setDeliveryDetails({ ...deliveryDetails, scheduledTime: time })
              }
            >
              <Text
                style={[
                  styles.timeOptionText,
                  deliveryDetails.scheduledTime === time && styles.selectedTimeOptionText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderDeliveryOptions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Choose Delivery Option</Text>
      <View style={styles.deliveryOptionsContainer}>
        {deliveryOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.deliveryOptionCard,
              selectedOption.id === option.id && styles.selectedDeliveryOption,
            ]}
            onPress={() => setSelectedOption(option)}
          >
            <View style={styles.deliveryOptionHeader}>
              <Text style={styles.deliveryOptionIcon}>{option.icon}</Text>
              <View style={styles.deliveryOptionInfo}>
                <Text style={styles.deliveryOptionName}>{option.name}</Text>
                <Text style={styles.deliveryOptionDuration}>{option.duration}</Text>
              </View>
              <Text style={styles.deliveryOptionPrice}>${option.price}</Text>
            </View>
            <Text style={styles.deliveryOptionDescription}>{option.description}</Text>
            <View style={styles.deliveryOptionFeatures}>
              {option.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureBullet}>•</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service:</Text>
          <Text style={styles.summaryValue}>{selectedOption.name}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Time:</Text>
          <Text style={styles.summaryValue}>{selectedOption.duration}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Pickup Time:</Text>
          <Text style={styles.summaryValue}>{deliveryDetails.scheduledTime}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${selectedOption.price}</Text>
        </View>
      </View>
    </View>
  );

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderAddressStep();
      case 2:
        return renderContactStep();
      case 3:
        return renderPackageStep();
      case 4:
        return renderDeliveryOptions();
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Addresses";
      case 2:
        return "Contacts";
      case 3:
        return "Package Info";
      case 4:
        return "Review & Book";
      default:
        return "";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getStepTitle()}</Text>
        <View style={styles.placeholder} />
      </View>

      {renderStepIndicator()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {getStepContent()}
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Truck size={20} color="#ffffff" />
          <Text style={styles.nextButtonText}>
            {currentStep === 4 ? "Book Delivery" : "Next"}
          </Text>
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
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  activeStep: {
    backgroundColor: "#2563eb",
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  activeStepText: {
    color: "#ffffff",
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 8,
  },
  activeStepLine: {
    backgroundColor: "#2563eb",
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
  inputContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  addressInput: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
    minHeight: 20,
  },
  quickAddresses: {
    marginTop: 16,
  },
  quickAddressTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  quickAddressContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
  },
  quickAddressButton: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  quickAddressText: {
    fontSize: 12,
    color: "#64748b",
  },
  contactSection: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
    color: "#1f2937",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  schedulingSection: {
    marginTop: 20,
  },
  timeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 8,
  },
  timeOption: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  selectedTimeOption: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  timeOptionText: {
    fontSize: 12,
    color: "#64748b",
  },
  selectedTimeOptionText: {
    color: "#ffffff",
  },
  deliveryOptionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  deliveryOptionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  selectedDeliveryOption: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  deliveryOptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  deliveryOptionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  deliveryOptionInfo: {
    flex: 1,
  },
  deliveryOptionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  deliveryOptionDuration: {
    fontSize: 12,
    color: "#64748b",
  },
  deliveryOptionPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563eb",
  },
  deliveryOptionDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  deliveryOptionFeatures: {
    gap: 2,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureBullet: {
    fontSize: 12,
    color: "#10b981",
    marginRight: 6,
  },
  featureText: {
    fontSize: 12,
    color: "#64748b",
  },
  orderSummary: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
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
    color: "#1f2937",
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563eb",
  },
  footer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  spacer: {
    height: 20,
  },
});