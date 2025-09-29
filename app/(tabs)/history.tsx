import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Filter,
  Bus,
  Car,
  Package,
  Truck,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react-native";

interface Activity {
  id: string;
  type: "bus" | "taxi" | "cargo" | "delivery";
  code: string;
  route: string;
  status: "completed" | "in_progress" | "cancelled" | "pending";
  date: string;
  time: string;
  amount: number;
  details: {
    from?: string;
    to?: string;
    pickup?: string;
    delivery?: string;
    description?: string;
  };
}

const activities: Activity[] = [
  {
    id: "1",
    type: "taxi",
    code: "T352+Q6X",
    route: "Hargeisa Central → Airport",
    status: "completed",
    date: "2024-01-15",
    time: "14:30",
    amount: 12.50,
    details: {
      from: "Hargeisa Central Market",
      to: "Egal International Airport",
    },
  },
  {
    id: "2",
    type: "bus",
    code: "B789+M4K",
    route: "Hargeisa → Mogadishu",
    status: "in_progress",
    date: "2024-01-15",
    time: "08:00",
    amount: 45.00,
    details: {
      from: "Hargeisa Bus Terminal",
      to: "Mogadishu Central Station",
    },
  },
  {
    id: "3",
    type: "delivery",
    code: "DL456+R8T",
    route: "Express Delivery",
    status: "completed",
    date: "2024-01-14",
    time: "16:45",
    amount: 15.00,
    details: {
      pickup: "123 Main Street",
      delivery: "456 Oak Avenue",
      description: "Electronics package",
    },
  },
  {
    id: "4",
    type: "cargo",
    code: "CG123+P9L",
    route: "Bulk Cargo Shipment",
    status: "pending",
    date: "2024-01-14",
    time: "10:15",
    amount: 75.00,
    details: {
      pickup: "Warehouse District",
      delivery: "Industrial Zone",
      description: "Commercial goods - 150kg",
    },
  },
  {
    id: "5",
    type: "taxi",
    code: "T987+L3M",
    route: "Hotel → Shopping Mall",
    status: "cancelled",
    date: "2024-01-13",
    time: "12:20",
    amount: 8.75,
    details: {
      from: "Grand Hotel Hargeisa",
      to: "City Mall",
    },
  },
  {
    id: "6",
    type: "bus",
    code: "B654+N2V",
    route: "Borama → Hargeisa",
    status: "completed",
    date: "2024-01-12",
    time: "07:30",
    amount: 25.00,
    details: {
      from: "Borama Bus Station",
      to: "Hargeisa Terminal",
    },
  },
];

const filterOptions = [
  { id: "all", label: "All", icon: null },
  { id: "bus", label: "Bus", icon: Bus },
  { id: "taxi", label: "Taxi", icon: Car },
  { id: "cargo", label: "Cargo", icon: Package },
  { id: "delivery", label: "Delivery", icon: Truck },
];

const statusOptions = [
  { id: "all", label: "All Status" },
  { id: "completed", label: "Completed" },
  { id: "in_progress", label: "In Progress" },
  { id: "pending", label: "Pending" },
  { id: "cancelled", label: "Cancelled" },
];

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.route.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedFilter === "all" || activity.type === selectedFilter;
    const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "bus":
        return Bus;
      case "taxi":
        return Car;
      case "cargo":
        return Package;
      case "delivery":
        return Truck;
      default:
        return Bus;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case "bus":
        return "#f97316";
      case "taxi":
        return "#ef4444";
      case "cargo":
        return "#3b82f6";
      case "delivery":
        return "#8b5cf6";
      default:
        return "#64748b";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "in_progress":
      case "pending":
        return AlertCircle;
      case "cancelled":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in_progress":
        return "#2563eb";
      case "pending":
        return "#f59e0b";
      case "cancelled":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trip History</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by code or route..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              {filterOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterChip,
                      selectedFilter === option.id && styles.activeFilterChip,
                    ]}
                    onPress={() => setSelectedFilter(option.id)}
                  >
                    {IconComponent && (
                      <IconComponent
                        size={16}
                        color={selectedFilter === option.id ? "#ffffff" : "#64748b"}
                      />
                    )}
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedFilter === option.id && styles.activeFilterChipText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.statusChip,
                    selectedStatus === option.id && styles.activeStatusChip,
                  ]}
                  onPress={() => setSelectedStatus(option.id)}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      selectedStatus === option.id && styles.activeStatusChipText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Activities List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.activitiesContainer}>
          {filteredActivities.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No activities found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredActivities.map((activity) => {
              const ServiceIcon = getServiceIcon(activity.type);
              const StatusIcon = getStatusIcon(activity.status);
              
              return (
                <TouchableOpacity key={activity.id} style={styles.activityCard}>
                  <View style={styles.activityHeader}>
                    <View style={styles.activityIconContainer}>
                      <View
                        style={[
                          styles.activityIcon,
                          { backgroundColor: getServiceColor(activity.type) + "20" },
                        ]}
                      >
                        <ServiceIcon size={20} color={getServiceColor(activity.type)} />
                      </View>
                    </View>
                    
                    <View style={styles.activityInfo}>
                      <View style={styles.activityTitleRow}>
                        <Text style={styles.activityCode}>{activity.code}</Text>
                        <View style={styles.statusContainer}>
                          <StatusIcon size={12} color={getStatusColor(activity.status)} />
                          <Text
                            style={[
                              styles.statusText,
                              { color: getStatusColor(activity.status) },
                            ]}
                          >
                            {getStatusText(activity.status)}
                          </Text>
                        </View>
                      </View>
                      
                      <Text style={styles.activityRoute}>{activity.route}</Text>
                      
                      <View style={styles.activityMeta}>
                        <View style={styles.metaItem}>
                          <Calendar size={12} color="#64748b" />
                          <Text style={styles.metaText}>{formatDate(activity.date)}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Clock size={12} color="#64748b" />
                          <Text style={styles.metaText}>{activity.time}</Text>
                        </View>
                      </View>
                      
                      {/* Route Details */}
                      {(activity.details.from || activity.details.pickup) && (
                        <View style={styles.routeDetails}>
                          <View style={styles.routePoint}>
                            <View style={[styles.routeDot, { backgroundColor: "#10b981" }]} />
                            <Text style={styles.routeText}>
                              {activity.details.from || activity.details.pickup}
                            </Text>
                          </View>
                          {(activity.details.to || activity.details.delivery) && (
                            <>
                              <View style={styles.routeLine} />
                              <View style={styles.routePoint}>
                                <View style={[styles.routeDot, { backgroundColor: "#ef4444" }]} />
                                <Text style={styles.routeText}>
                                  {activity.details.to || activity.details.delivery}
                                </Text>
                              </View>
                            </>
                          )}
                        </View>
                      )}
                      
                      {activity.details.description && (
                        <Text style={styles.activityDescription}>
                          {activity.details.description}
                        </Text>
                      )}
                    </View>
                    
                    <View style={styles.activityAmount}>
                      <Text style={styles.amountText}>${activity.amount.toFixed(2)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  searchBar: {
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
  filtersContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    gap: 12,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    gap: 6,
  },
  activeFilterChip: {
    backgroundColor: "#2563eb",
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
  },
  activeFilterChipText: {
    color: "#ffffff",
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  activeStatusChip: {
    backgroundColor: "#eff6ff",
    borderColor: "#2563eb",
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
  },
  activeStatusChipText: {
    color: "#2563eb",
  },
  content: {
    flex: 1,
  },
  activitiesContainer: {
    padding: 20,
    gap: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9ca3af",
  },
  activityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  activityIconContainer: {
    marginRight: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activityInfo: {
    flex: 1,
  },
  activityTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  activityCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  activityRoute: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#64748b",
  },
  routeDetails: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  routeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  routeLine: {
    width: 1,
    height: 12,
    backgroundColor: "#e2e8f0",
    marginLeft: 3,
    marginBottom: 4,
  },
  routeText: {
    fontSize: 12,
    color: "#64748b",
    flex: 1,
  },
  activityDescription: {
    fontSize: 12,
    color: "#64748b",
    fontStyle: "italic",
    marginTop: 4,
  },
  activityAmount: {
    alignItems: "flex-end",
    marginLeft: 12,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
  },
  spacer: {
    height: 20,
  },
});