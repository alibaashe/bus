import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Package,
  MapPin,
  Weight,
  Ruler,
  DollarSign,
  Camera,
  FileText,
  Truck,
  Clock,
  Shield,
} from "lucide-react-native";

interface CargoType {
  id: string;
  name: string;
  maxWeight: number;
  maxDimensions: string;
  pricePerKg: number;
  estimatedTime: string;
  icon: string;
  description: string;
}

const cargoTypes: CargoType[] = [
  {
    id: "1",
    name: "Small Package",
    maxWeight: 5,
    maxDimensions: "30x30x30 cm",
    pricePerKg: 3.0,
    estimatedTime: "Same day",
    icon: "📦",
    description: "Perfect for documents, small items",
  },
  {
    id: "2",
    name: "Medium Cargo",
    maxWeight: 25,
    maxDimensions: "60x60x60 cm",
    pricePerKg: 2.5,
    estimatedTime: "1-2 days",
    icon: "📋",
    description: "Ideal for electronics, clothing",
  },
  {
    id: "3",
    name: "Large Cargo",
    maxWeight: 100,
    maxDimensions: "120x120x120 cm",
    pricePerKg: 2.0,
    estimatedTime: "2-3 days",
    icon: "📊",
    description: "For furniture, appliances",
  },
  {
    id: "4",
    name: "Bulk Cargo",
    maxWeight: 500,
    maxDimensions: "Custom",
    pricePerKg: 1.5,
    estimatedTime: "3-5 days",
    icon: "🚛",
    description: "Commercial shipments",
  },
];

export default function BookCargoScreen() {
  const [senderInfo, setSenderInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [cargoDetails, setCargoDetails] = useState({
    description: "",
    weight: "",
    dimensions: "",
    value: "",
    fragile: false,
  });
  const [selectedCargoType, setSelectedCargoType] = useState<CargoType>(cargoTypes[0]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const calculatePrice = () => {
    const weight = parseFloat(cargoDetails.weight) || 0;
    const basePrice = weight * selectedCargoType.pricePerKg;
    const insurancePrice = cargoDetails.fragile ? basePrice * 0.1 : 0;
    setEstimatedPrice(basePrice + insurancePrice);
  };

  React.useEffect(() => {
    calculatePrice();
  }, [cargoDetails.weight, selectedCargoType, cargoDetails.fragile]);

  const handleNext = () => {
    if (currentStep === 1) {
      if (!senderInfo.name || !senderInfo.phone || !senderInfo.address) {
        Alert.alert("Error", "Please fill in all sender information");
        return;
      }
    } else if (currentStep === 2) {
      if (!receiverInfo.name || !receiverInfo.phone || !receiverInfo.address) {
        Alert.alert("Error", "Please fill in all receiver information");
        return;
      }
    } else if (currentStep === 3) {
      if (!cargoDetails.description || !cargoDetails.weight) {
        Alert.alert("Error", "Please fill in cargo description and weight");
        return;
      }
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleBookCargo();
    }
  };

  const handleBookCargo = () => {
    Alert.alert(
      "Cargo Booked!",
      `Your cargo shipment has been scheduled. Tracking ID: CG${Date.now().toString().slice(-6)}`,
      [
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

  const renderSenderInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sender Information</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={senderInfo.name}
          onChangeText={(text) => setSenderInfo({ ...senderInfo, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={senderInfo.phone}
          onChangeText={(text) => setSenderInfo({ ...senderInfo, phone: text })}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Pickup Address"
          value={senderInfo.address}
          onChangeText={(text) => setSenderInfo({ ...senderInfo, address: text })}
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );

  const renderReceiverInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Receiver Information</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={receiverInfo.name}
          onChangeText={(text) => setReceiverInfo({ ...receiverInfo, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={receiverInfo.phone}
          onChangeText={(text) => setReceiverInfo({ ...receiverInfo, phone: text })}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Delivery Address"
          value={receiverInfo.address}
          onChangeText={(text) => setReceiverInfo({ ...receiverInfo, address: text })}
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );

  const renderCargoDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cargo Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your cargo (e.g., Electronics, Documents, Furniture)"
          value={cargoDetails.description}
          onChangeText={(text) => setCargoDetails({ ...cargoDetails, description: text })}
          multiline
          numberOfLines={3}
        />
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              value={cargoDetails.weight}
              onChangeText={(text) => setCargoDetails({ ...cargoDetails, weight: text })}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfWidth}>
            <TextInput
              style={styles.input}
              placeholder="Dimensions (LxWxH)"
              value={cargoDetails.dimensions}
              onChangeText={(text) => setCargoDetails({ ...cargoDetails, dimensions: text })}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Declared Value ($)"
          value={cargoDetails.value}
          onChangeText={(text) => setCargoDetails({ ...cargoDetails, value: text })}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setCargoDetails({ ...cargoDetails, fragile: !cargoDetails.fragile })}
        >
          <View style={[styles.checkbox, cargoDetails.fragile && styles.checkedBox]}>
            {cargoDetails.fragile && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Fragile item (requires special handling)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCargoTypes = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Select Cargo Type</Text>
      <View style={styles.cargoTypesContainer}>
        {cargoTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.cargoTypeCard,
              selectedCargoType.id === type.id && styles.selectedCargoType,
            ]}
            onPress={() => setSelectedCargoType(type)}
          >
            <View style={styles.cargoTypeHeader}>
              <Text style={styles.cargoTypeIcon}>{type.icon}</Text>
              <View style={styles.cargoTypeInfo}>
                <Text style={styles.cargoTypeName}>{type.name}</Text>
                <Text style={styles.cargoTypeTime}>{type.estimatedTime}</Text>
              </View>
              <Text style={styles.cargoTypePrice}>${type.pricePerKg}/kg</Text>
            </View>
            <Text style={styles.cargoTypeDescription}>{type.description}</Text>
            <View style={styles.cargoTypeSpecs}>
              <Text style={styles.specText}>Max: {type.maxWeight}kg</Text>
              <Text style={styles.specText}>{type.maxDimensions}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Price Estimate */}
      <View style={styles.priceEstimate}>
        <View style={styles.priceHeader}>
          <DollarSign size={20} color="#2563eb" />
          <Text style={styles.priceTitle}>Estimated Cost</Text>
        </View>
        <Text style={styles.priceAmount}>${estimatedPrice.toFixed(2)}</Text>
        <View style={styles.priceBreakdown}>
          <Text style={styles.priceBreakdownText}>
            Base: ${(parseFloat(cargoDetails.weight) || 0) * selectedCargoType.pricePerKg}
          </Text>
          {cargoDetails.fragile && (
            <Text style={styles.priceBreakdownText}>
              Insurance: ${(estimatedPrice * 0.1).toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderSenderInfo();
      case 2:
        return renderReceiverInfo();
      case 3:
        return renderCargoDetails();
      case 4:
        return renderCargoTypes();
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Sender Details";
      case 2:
        return "Receiver Details";
      case 3:
        return "Cargo Information";
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
          <Package size={20} color="#ffffff" />
          <Text style={styles.nextButtonText}>
            {currentStep === 4 ? "Book Cargo" : "Next"}
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#1f2937",
  },
  cargoTypesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  cargoTypeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  selectedCargoType: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  cargoTypeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cargoTypeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cargoTypeInfo: {
    flex: 1,
  },
  cargoTypeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  cargoTypeTime: {
    fontSize: 12,
    color: "#64748b",
  },
  cargoTypePrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
  cargoTypeDescription: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  cargoTypeSpecs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  specText: {
    fontSize: 12,
    color: "#64748b",
  },
  priceEstimate: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
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
    marginBottom: 8,
  },
  priceBreakdown: {
    gap: 2,
  },
  priceBreakdownText: {
    fontSize: 12,
    color: "#64748b",
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