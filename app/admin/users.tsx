import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Users,
  UserPlus,
  UserCheck,
  UserX,
  Search,
  Filter,
  Download,
  Settings,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Shield,
  Car,
  Bus,
} from "lucide-react-native";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'driver';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
  totalRides: number;
  totalSpent: number;
  rating: number;
  location: string;
  vehicleType?: string;
  licenseNumber?: string;
  verified: boolean;
}

export default function AdminUserManagement() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'all' | 'customers' | 'drivers'>('all');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const userStats = {
    totalUsers: 12847,
    totalCustomers: 11234,
    totalDrivers: 1613,
    activeUsers: 8934,
    newUsersThisMonth: 456,
    verifiedDrivers: 1456,
  };

  const users: User[] = [
    {
      id: "1",
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      phone: "+252 61 234 5678",
      type: "customer",
      status: "active",
      joinDate: "2023-06-15",
      lastActive: "2 hours ago",
      totalRides: 89,
      totalSpent: 1250.75,
      rating: 4.8,
      location: "Hargeisa, Somalia",
      verified: true,
    },
    {
      id: "2",
      name: "Fatima Ali",
      email: "fatima@example.com",
      phone: "+252 61 345 6789",
      type: "driver",
      status: "active",
      joinDate: "2023-08-22",
      lastActive: "30 min ago",
      totalRides: 234,
      totalSpent: 0,
      rating: 4.9,
      location: "Mogadishu, Somalia",
      vehicleType: "Bus",
      licenseNumber: "DL123456",
      verified: true,
    },
    {
      id: "3",
      name: "Mohamed Omar",
      email: "mohamed@example.com",
      phone: "+252 61 456 7890",
      type: "customer",
      status: "inactive",
      joinDate: "2023-01-10",
      lastActive: "2 days ago",
      totalRides: 45,
      totalSpent: 567.25,
      rating: 4.6,
      location: "Bosaso, Somalia",
      verified: false,
    },
    {
      id: "4",
      name: "Sahra Abdi",
      email: "sahra@example.com",
      phone: "+252 61 567 8901",
      type: "driver",
      status: "suspended",
      joinDate: "2023-03-18",
      lastActive: "1 week ago",
      totalRides: 156,
      totalSpent: 0,
      rating: 4.2,
      location: "Kismayo, Somalia",
      vehicleType: "Taxi",
      licenseNumber: "DL789012",
      verified: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'inactive':
        return '#f59e0b';
      case 'suspended':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#d1fae5';
      case 'inactive':
        return '#fef3c7';
      case 'suspended':
        return '#fecaca';
      default:
        return '#f1f5f9';
    }
  };

  const getUserTypeIcon = (type: string) => {
    return type === 'driver' ? Car : Users;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'customers' && user.type === 'customer') ||
                      (activeTab === 'drivers' && user.type === 'driver');
    
    return matchesSearch && matchesTab;
  });

  const handleUserAction = (action: string, userId: string) => {
    Alert.alert(
      "Confirm Action",
      `Are you sure you want to ${action} this user?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => console.log(`${action} user ${userId}`) }
      ]
    );
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
            <Text style={styles.headerTitle}>User Management</Text>
            <Text style={styles.headerSubtitle}>Customers & Drivers</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <UserPlus size={20} color="#ffffff" />
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

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScrollView}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Users size={20} color="#3b82f6" />
            </View>
            <Text style={styles.statValue}>{userStats.totalUsers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
            <View style={styles.statTrend}>
              <TrendingUp size={10} color="#10b981" />
              <Text style={styles.statTrendText}>+12%</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <UserCheck size={20} color="#10b981" />
            </View>
            <Text style={styles.statValue}>{userStats.totalCustomers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Customers</Text>
            <View style={styles.statTrend}>
              <TrendingUp size={10} color="#10b981" />
              <Text style={styles.statTrendText}>+8%</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Car size={20} color="#f97316" />
            </View>
            <Text style={styles.statValue}>{userStats.totalDrivers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Drivers</Text>
            <View style={styles.statTrend}>
              <TrendingUp size={10} color="#10b981" />
              <Text style={styles.statTrendText}>+15%</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Shield size={20} color="#8b5cf6" />
            </View>
            <Text style={styles.statValue}>{userStats.verifiedDrivers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Verified</Text>
            <View style={styles.statTrend}>
              <TrendingUp size={10} color="#10b981" />
              <Text style={styles.statTrendText}>+5%</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
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
          { key: 'all', label: 'All Users', count: userStats.totalUsers },
          { key: 'customers', label: 'Customers', count: userStats.totalCustomers },
          { key: 'drivers', label: 'Drivers', count: userStats.totalDrivers },
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
                {tab.count.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.usersList}>
          {filteredUsers.map((user) => {
            const IconComponent = getUserTypeIcon(user.type);
            const statusColor = getStatusColor(user.status);
            const statusBgColor = getStatusBgColor(user.status);

            return (
              <TouchableOpacity key={user.id} style={styles.userCard}>
                <View style={styles.userHeader}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userInitials}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  
                  <View style={styles.userInfo}>
                    <View style={styles.userNameRow}>
                      <Text style={styles.userName}>{user.name}</Text>
                      <View style={styles.userTypeContainer}>
                        <IconComponent size={12} color="#64748b" />
                        <Text style={styles.userType}>{user.type}</Text>
                      </View>
                      {user.verified && (
                        <View style={styles.verifiedBadge}>
                          <Shield size={10} color="#10b981" />
                        </View>
                      )}
                    </View>
                    
                    <View style={styles.userContactRow}>
                      <Mail size={12} color="#64748b" />
                      <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                    
                    <View style={styles.userContactRow}>
                      <Phone size={12} color="#64748b" />
                      <Text style={styles.userPhone}>{user.phone}</Text>
                    </View>
                    
                    <View style={styles.userContactRow}>
                      <MapPin size={12} color="#64748b" />
                      <Text style={styles.userLocation}>{user.location}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.userActions}>
                    <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
                      <Text style={[styles.statusText, { color: statusColor }]}>
                        {user.status.toUpperCase()}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                      <MoreVertical size={16} color="#64748b" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.userStats}>
                  <View style={styles.userStat}>
                    <Text style={styles.userStatValue}>{user.totalRides}</Text>
                    <Text style={styles.userStatLabel}>Rides</Text>
                  </View>
                  
                  {user.type === 'customer' && (
                    <View style={styles.userStat}>
                      <Text style={styles.userStatValue}>${user.totalSpent}</Text>
                      <Text style={styles.userStatLabel}>Spent</Text>
                    </View>
                  )}
                  
                  <View style={styles.userStat}>
                    <View style={styles.ratingContainer}>
                      <Star size={12} color="#f59e0b" fill="#f59e0b" />
                      <Text style={styles.userStatValue}>{user.rating}</Text>
                    </View>
                    <Text style={styles.userStatLabel}>Rating</Text>
                  </View>
                  
                  <View style={styles.userStat}>
                    <Text style={styles.userStatValue}>{user.lastActive}</Text>
                    <Text style={styles.userStatLabel}>Last Active</Text>
                  </View>
                  
                  {user.type === 'driver' && user.vehicleType && (
                    <View style={styles.userStat}>
                      <View style={styles.vehicleContainer}>
                        {user.vehicleType === 'Bus' ? (
                          <Bus size={12} color="#f97316" />
                        ) : (
                          <Car size={12} color="#ef4444" />
                        )}
                        <Text style={styles.userStatValue}>{user.vehicleType}</Text>
                      </View>
                      <Text style={styles.userStatLabel}>Vehicle</Text>
                    </View>
                  )}
                </View>

                <View style={styles.userActionButtons}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.viewButton]}
                    onPress={() => console.log('View user', user.id)}
                  >
                    <Eye size={14} color="#3b82f6" />
                    <Text style={[styles.actionButtonText, { color: '#3b82f6' }]}>View</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => console.log('Edit user', user.id)}
                  >
                    <Edit size={14} color="#f59e0b" />
                    <Text style={[styles.actionButtonText, { color: '#f59e0b' }]}>Edit</Text>
                  </TouchableOpacity>
                  
                  {user.status === 'active' ? (
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.suspendButton]}
                      onPress={() => handleUserAction('suspend', user.id)}
                    >
                      <UserX size={14} color="#ef4444" />
                      <Text style={[styles.actionButtonText, { color: '#ef4444' }]}>Suspend</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.activateButton]}
                      onPress={() => handleUserAction('activate', user.id)}
                    >
                      <UserCheck size={14} color="#10b981" />
                      <Text style={[styles.actionButtonText, { color: '#10b981' }]}>Activate</Text>
                    </TouchableOpacity>
                  )}
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
    minWidth: 120,
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
    marginBottom: 4,
  },
  statTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  statTrendText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#10b981",
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
    marginHorizontal: 4,
    gap: 8,
  },
  activeTabButton: {
    backgroundColor: "#eff6ff",
  },
  tabButtonText: {
    fontSize: 14,
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
    fontSize: 10,
    fontWeight: "600",
    color: "#64748b",
  },
  activeTabCountText: {
    color: "#ffffff",
  },
  content: {
    flex: 1,
  },
  usersList: {
    padding: 20,
    gap: 16,
  },
  userCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  userInitials: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  userTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  userType: {
    fontSize: 10,
    fontWeight: "500",
    color: "#64748b",
    textTransform: "capitalize",
  },
  verifiedBadge: {
    backgroundColor: "#d1fae5",
    padding: 2,
    borderRadius: 4,
  },
  userContactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 8,
  },
  userEmail: {
    fontSize: 12,
    color: "#64748b",
  },
  userPhone: {
    fontSize: 12,
    color: "#64748b",
  },
  userLocation: {
    fontSize: 12,
    color: "#64748b",
  },
  userActions: {
    alignItems: "flex-end",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  moreButton: {
    padding: 4,
  },
  userStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
    marginBottom: 16,
  },
  userStat: {
    alignItems: "center",
    flex: 1,
  },
  userStatValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  userStatLabel: {
    fontSize: 10,
    color: "#64748b",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  vehicleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userActionButtons: {
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
  suspendButton: {
    backgroundColor: "#fef2f2",
  },
  activateButton: {
    backgroundColor: "#f0fdf4",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  spacer: {
    height: 20,
  },
});