import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Bus,
  Car,
  Truck,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  MapPin,
  User,
  Calendar,
  Fuel,
  Wrench,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
} from "lucide-react-native";

interface Vehicle {
  id: string;
  plateNumber: string;
  type: 'bus' | 'taxi' | 'truck';
  model: string;
  year: number;
  capacity: number;
  status: 'active' | 'maintenance' | 'inactive';
  driverName: string;
  driverId: string;
  currentLocation: string;
  lastMaintenance: string;
  nextMaintenance: string;
  mileage: number;
  fuelLevel: number;
  rating: number;
  totalTrips: number;
  revenue: number;
  isInsured: boolean;
  insuranceExpiry: string;
  registrationExpiry: string;
}

export default function AdminVehicleFleet() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'all' | 'buses' | 'taxis' | 'trucks'>('all');
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fleetStats = {
    totalVehicles: 245,
    activeVehicles: 198,
    inMaintenance: 23,
    totalBuses: 89,
    totalTaxis: 134,
    totalTrucks: 22,
    averageRating: 4.6,
    utilizationRate: 78.5,
  };

  const vehicles: Vehicle[] = [
    {
      id: "1",
      plateNumber: "SOM-001-BUS",
      type: "bus",
      model: "Mercedes Sprinter",
      year: 2022,
      capacity: 25,
      status: "active",
      driverName: "Ahmed Hassan",
      driverId: "D001",
      currentLocation: "Hargeisa Terminal",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-04-15",
      mileage: 45678,
      fuelLevel: 85,
      rating: 4.8,
      totalTrips: 234,
      revenue: 12456.75,
      isInsured: true,
      insuranceExpiry: "2024-12-31",
      registrationExpiry: "2025-06-30",
    },
    {
      id: "2",
      plateNumber: "SOM-002-TAX",
      type: "taxi",
      model: "Toyota Corolla",
      year: 2021,
      capacity: 4,
      status: "active",
      driverName: "Fatima Ali",
      driverId: "D002",
      currentLocation: "Mogadishu Airport",
      lastMaintenance: "2024-02-10",
      nextMaintenance: "2024-05-10",
      mileage: 67890,
      fuelLevel: 45,
      rating: 4.9,
      totalTrips: 456,
      revenue: 8765.50,
      isInsured: true,
      insuranceExpiry: "2024-11-15",
      registrationExpiry: "2025-03-20",
    },
    {
      id: "3",
      plateNumber: "SOM-003-TRK",
      type: "truck",
      model: "Isuzu NPR",
      year: 2020,
      capacity: 3000,
      status: "maintenance",
      driverName: "Mohamed Omar",
      driverId: "D003",
      currentLocation: "Service Center",
      lastMaintenance: "2024-02-20",
      nextMaintenance: "2024-02-25",
      mileage: 89012,
      fuelLevel: 20,
      rating: 4.5,
      totalTrips: 189,
      revenue: 15678.90,
      isInsured: true,
      insuranceExpiry: "2024-10-30",
      registrationExpiry: "2025-01-15",
    },
    {
      id: "4",
      plateNumber: "SOM-004-BUS",
      type: "bus",
      model: "Hyundai County",
      year: 2019,
      capacity: 30,
      status: "inactive",
      driverName: "Sahra Abdi",
      driverId: "D004",
      currentLocation: "Depot",
      lastMaintenance: "2024-01-05",
      nextMaintenance: "2024-04-05",
      mileage: 123456,
      fuelLevel: 10,
      rating: 4.3,
      totalTrips: 567,
      revenue: 23456.25,
      isInsured: false,
      insuranceExpiry: "2024-01-31",
      registrationExpiry: "2024-12-10",
    },
  ];

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'bus':
        return Bus;
      case 'taxi':
        return Car;
      case 'truck':
        return Truck;
      default:
        return Car;
    }
  };

  const getVehicleColor = (type: string) => {
    switch (type) {
      case 'bus':
        return '#f97316';
      case 'taxi':
        return '#ef4444';
      case 'truck':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'maintenance':
        return '#f59e0b';
      case 'inactive':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#d1fae5';
      case 'maintenance':
        return '#fef3c7';
      case 'inactive':
        return '#fecaca';
      default:
        return '#f1f5f9';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'maintenance':
        return Wrench;
      case 'inactive':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'buses' && vehicle.type === 'bus') ||
                      (activeTab === 'taxis' && vehicle.type === 'taxi') ||
                      (activeTab === 'trucks' && vehicle.type === 'truck');
    
    return matchesSearch && matchesTab;
  });

  const isMaintenanceDue = (nextMaintenance: string) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const diffTime = maintenanceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const isDocumentExpiring = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      
      {/* Header */}
      <LinearGradient
        colors={["#1e293b", "#334155"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Vehicle Fleet</Text>
            <Text style={styles.headerSubtitle}>Manage your fleet</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Plus size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Download size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Fleet Stats */}
      <View style={styles.statsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScrollView}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Activity size={20} color="#3b82f6" />
            </View>
            <Text style={styles.statValue}>{fleetStats.totalVehicles}</Text>
            <Text style={styles.statLabel}>Total Fleet</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <CheckCircle size={20} color="#10b981" />
            </View>
            <Text style={styles.statValue}>{fleetStats.activeVehicles}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Wrench size={20} color="#f59e0b" />
            </View>
            <Text style={styles.statValue}>{fleetStats.inMaintenance}</Text>
            <Text style={styles.statLabel}>Maintenance</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Star size={20} color="#8b5cf6" />
            </View>
            <Text style={styles.statValue}>{fleetStats.averageRating}</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Activity size={20} color="#06b6d4" />
            </View>
            <Text style={styles.statValue}>{fleetStats.utilizationRate}%</Text>
            <Text style={styles.statLabel}>Utilization</Text>
          </View>
        </ScrollView>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vehicles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        {[
          { key: 'all', label: 'All', count: fleetStats.totalVehicles },
          { key: 'buses', label: 'Buses', count: fleetStats.totalBuses },
          { key: 'taxis', label: 'Taxis', count: fleetStats.totalTaxis },
          { key: 'trucks', label: 'Trucks', count: fleetStats.totalTrucks },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabButton, activeTab === tab.key && styles.activeTabButton]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === tab.key && styles.activeTabButtonText
            ]}>
              {tab.label}
            </Text>
            <View style={[
              styles.tabCount,
              activeTab === tab.key && styles.activeTabCount
            ]}>
              <Text style={[
                styles.tabCountText,
                activeTab === tab.key && styles.activeTabCountText
              ]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.vehiclesList}>
          {filteredVehicles.map((vehicle) => {
            const VehicleIcon = getVehicleIcon(vehicle.type);
            const StatusIcon = getStatusIcon(vehicle.status);
            const vehicleColor = getVehicleColor(vehicle.type);
            const statusColor = getStatusColor(vehicle.status);
            const statusBgColor = getStatusBgColor(vehicle.status);

            return (
              <TouchableOpacity key={vehicle.id} style={styles.vehicleCard}>
                <View style={styles.vehicleHeader}>
                  <View style={[styles.vehicleIcon, { backgroundColor: `${vehicleColor}20` }]}>
                    <VehicleIcon size={24} color={vehicleColor} />
                  </View>
                  
                  <View style={styles.vehicleInfo}>
                    <View style={styles.vehicleNameRow}>
                      <Text style={styles.vehiclePlate}>{vehicle.plateNumber}</Text>
                      <View style={styles.vehicleAlerts}>
                        {isMaintenanceDue(vehicle.nextMaintenance) && (
                          <View style={styles.alertBadge}>
                            <Wrench size={10} color="#f59e0b" />
                          </View>
                        )}
                        {!vehicle.isInsured && (
                          <View style={[styles.alertBadge, { backgroundColor: "#fecaca" }]}>
                            <Shield size={10} color="#ef4444" />
                          </View>
                        )}
                        {isDocumentExpiring(vehicle.registrationExpiry) && (
                          <View style={[styles.alertBadge, { backgroundColor: "#fed7aa" }]}>
                            <Calendar size={10} color="#f97316" />
                          </View>
                        )}
                      </View>
                    </View>
                    
                    <Text style={styles.vehicleModel}>{vehicle.model} ({vehicle.year})</Text>
                    
                    <View style={styles.vehicleDetailsRow}>
                      <View style={styles.vehicleDetail}>
                        <User size={12} color="#64748b" />
                        <Text style={styles.vehicleDetailText}>{vehicle.driverName}</Text>
                      </View>
                      <View style={styles.vehicleDetail}>
                        <MapPin size={12} color="#64748b" />
                        <Text style={styles.vehicleDetailText}>{vehicle.currentLocation}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.vehicleActions}>
                    <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
                      <StatusIcon size={12} color={statusColor} />
                      <Text style={[styles.statusText, { color: statusColor }]}>
                        {vehicle.status.toUpperCase()}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                      <MoreVertical size={16} color="#64748b" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.vehicleMetrics}>
                  <View style={styles.metricItem}>
                    <View style={styles.metricHeader}>
                      <Fuel size={14} color="#3b82f6" />
                      <Text style={styles.metricLabel}>Fuel</Text>
                    </View>
                    <View style={styles.fuelBar}>
                      <View 
                        style={[
                          styles.fuelFill, 
                          { 
                            width: `${vehicle.fuelLevel}%`,
                            backgroundColor: vehicle.fuelLevel > 50 ? "#10b981" : vehicle.fuelLevel > 25 ? "#f59e0b" : "#ef4444"
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.metricValue}>{vehicle.fuelLevel}%</Text>
                  </View>

                  <View style={styles.metricItem}>
                    <View style={styles.metricHeader}>
                      <Star size={14} color="#f59e0b" />
                      <Text style={styles.metricLabel}>Rating</Text>
                    </View>
                    <Text style={styles.metricValue}>{vehicle.rating}</Text>
                  </View>

                  <View style={styles.metricItem}>
                    <View style={styles.metricHeader}>
                      <Activity size={14} color="#8b5cf6" />
                      <Text style={styles.metricLabel}>Trips</Text>
                    </View>
                    <Text style={styles.metricValue}>{vehicle.totalTrips}</Text>
                  </View>

                  <View style={styles.metricItem}>
                    <View style={styles.metricHeader}>
                      <Activity size={14} color="#10b981" />
                      <Text style={styles.metricLabel}>Revenue</Text>
                    </View>
                    <Text style={styles.metricValue}>${vehicle.revenue.toLocaleString()}</Text>
                  </View>
                </View>

                <View style={styles.vehicleDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Capacity:</Text>
                    <Text style={styles.detailValue}>
                      {vehicle.capacity} {vehicle.type === 'truck' ? 'kg' : 'passengers'}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Mileage:</Text>
                    <Text style={styles.detailValue}>{vehicle.mileage.toLocaleString()} km</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Next Maintenance:</Text>
                    <Text style={[
                      styles.detailValue,
                      isMaintenanceDue(vehicle.nextMaintenance) && { color: "#f59e0b", fontWeight: "600" }
                    ]}>
                      {vehicle.nextMaintenance}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Insurance:</Text>
                    <View style={styles.insuranceStatus}>
                      <Switch
                        value={vehicle.isInsured}
                        onValueChange={() => {}}
                        trackColor={{ false: "#e2e8f0", true: "#10b981" }}
                        thumbColor={vehicle.isInsured ? "#ffffff" : "#f4f3f4"}
                        style={styles.insuranceSwitch}
                      />
                      <Text style={[
                        styles.detailValue,
                        !vehicle.isInsured && { color: "#ef4444", fontWeight: "600" }
                      ]}>
                        {vehicle.isInsured ? `Expires: ${vehicle.insuranceExpiry}` : 'Not Insured'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.vehicleActionButtons}>
                  <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
                    <Eye size={14} color="#3b82f6" />
                    <Text style={[styles.actionButtonText, { color: '#3b82f6' }]}>View</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
                    <Edit size={14} color="#f59e0b" />
                    <Text style={[styles.actionButtonText, { color: '#f59e0b' }]}>Edit</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.actionButton, styles.maintenanceButton]}>
                    <Wrench size={14} color="#8b5cf6" />
                    <Text style={[styles.actionButtonText, { color: '#8b5cf6' }]}>Maintenance</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  statsContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  statsScrollView: {
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 100,
    alignItems: "center",
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: "#64748b",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#ffffff",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  filterButton: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 12,
  },
  tabNavigation: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 2,
    gap: 8,
  },
  activeTabButton: {
    backgroundColor: "#eff6ff",
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
  },
  activeTabButtonText: {
    color: "#2563eb",
  },
  tabCount: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeTabCount: {
    backgroundColor: "#2563eb",
  },
  tabCountText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#64748b",
  },
  activeTabCountText: {
    color: "#ffffff",
  },
  content: {
    flex: 1,
  },
  vehiclesList: {
    padding: 20,
    gap: 16,
  },
  vehicleCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  vehicleHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  vehiclePlate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  vehicleAlerts: {
    flexDirection: "row",
    gap: 4,
  },
  alertBadge: {
    backgroundColor: "#fef3c7",
    padding: 4,
    borderRadius: 4,
  },
  vehicleModel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  vehicleDetailsRow: {
    gap: 4,
  },
  vehicleDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  vehicleDetailText: {
    fontSize: 11,
    color: "#64748b",
  },
  vehicleActions: {
    alignItems: "flex-end",
    gap: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  moreButton: {
    padding: 4,
  },
  vehicleMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
    marginBottom: 16,
  },
  metricItem: {
    alignItems: "center",
    flex: 1,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: "#64748b",
  },
  metricValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
  },
  fuelBar: {
    width: 40,
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    marginBottom: 4,
  },
  fuelFill: {
    height: 4,
    borderRadius: 2,
  },
  vehicleDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1f2937",
  },
  insuranceStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  insuranceSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  vehicleActionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  viewButton: {
    backgroundColor: "#eff6ff",
  },
  editButton: {
    backgroundColor: "#fffbeb",
  },
  maintenanceButton: {
    backgroundColor: "#f3f4f6",
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: "600",
  },
  spacer: {
    height: 20,
  },
});