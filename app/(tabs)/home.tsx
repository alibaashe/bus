import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Bus,
  Car,
  Package,
  Truck,
  Wallet,
  Gift,
  Send,
  Bell,
  Phone,
  Menu,
  ChevronRight,
  MessageCircle,
  Settings,
} from "lucide-react-native";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const services = [
    {
      id: 1,
      title: "Bus",
      subtitle: "Book now",
      icon: Bus,
      color: "#f97316",
      bgColor: "#fed7aa",
    },
    {
      id: 2,
      title: "Taxi",
      subtitle: "Quick ride",
      icon: Car,
      color: "#ef4444",
      bgColor: "#fecaca",
    },
    {
      id: 3,
      title: "Cargo",
      subtitle: "Send Fast",
      icon: Package,
      color: "#3b82f6",
      bgColor: "#bfdbfe",
    },
    {
      id: 4,
      title: "Delivery",
      subtitle: "Deliver fast",
      icon: Truck,
      color: "#8b5cf6",
      bgColor: "#ddd6fe",
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "Wallet",
      subtitle: "Top up & Manage",
      icon: Wallet,
      gradient: ["#f97316", "#ea580c"] as const,
    },
    {
      id: 2,
      title: "Promos",
      subtitle: "View History",
      icon: Gift,
      gradient: ["#3b82f6", "#2563eb"] as const,
    },
    {
      id: 3,
      title: "Send",
      subtitle: "Transfer Money",
      icon: Send,
      gradient: ["#8b5cf6", "#7c3aed"] as const,
    },
  ];

  const activities = [
    {
      id: 1,
      code: "T352+Q6X",
      route: "Hargeisa, Som...",
      status: "COMPLETED",
      time: "2:15",
      type: "taxi",
    },
    {
      id: 2,
      code: "B789+M4K",
      route: "Mogadishu, Som...",
      status: "IN PROGRESS",
      time: "1:45",
      type: "bus",
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color="#1f2937" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>SOMBEDER TRANSPORT</Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Bell size={20} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Phone size={20} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/admin')}
          >
            <Settings size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Location Banner */}
        <View style={styles.locationBanner}>
          <View style={styles.locationContent}>
            <View style={styles.locationIcon}>
              <View style={styles.locationDot} />
            </View>
            <View style={styles.locationText}>
              <Text style={styles.locationTitle}>📍 Hargeisa, Somalia</Text>
              <Text style={styles.locationSubtitle}>GPS accuracy: High • Last updated: Now</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
            <TouchableOpacity style={styles.locationButton}>
              <ChevronRight size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id} 
              style={styles.serviceCard}
              onPress={() => {
                if (service.title === 'Bus') {
                  router.push('/book-bus');
                } else if (service.title === 'Taxi') {
                  router.push('/book-taxi');
                } else if (service.title === 'Cargo') {
                  router.push('/book-cargo');
                } else if (service.title === 'Delivery') {
                  router.push('/book-delivery');
                }
              }}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.bgColor }]}>
                <service.icon size={28} color={service.color} />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={styles.quickActionCard}
                onPress={() => {
                  if (action.title === 'Wallet') {
                    router.push('/wallet');
                  }
                }}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.quickActionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.quickActionContent}>
                    <action.icon size={24} color="#ffffff" />
                    <View style={styles.quickActionText}>
                      <Text style={styles.quickActionTitle}>{action.title}</Text>
                      <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                    </View>
                    <ChevronRight size={16} color="#ffffff" opacity={0.8} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promotional Banner */}
        <TouchableOpacity style={styles.promoBanner}>
          <LinearGradient
            colors={["#2563eb", "#3b82f6"]}
            style={styles.promoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.promoContent}>
              <View style={styles.promoText}>
                <Text style={styles.promoTitle}>🎉 Special Offer!</Text>
                <Text style={styles.promoSubtitle}>Get 20% off your first 3 rides</Text>
                <Text style={styles.promoCode}>Use code: WELCOME20</Text>
              </View>
              <View style={styles.promoIcon}>
                <Text style={styles.promoEmoji}>🚗</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Weather & Traffic Info */}
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoEmoji}>🌤️</Text>
              <Text style={styles.infoTitle}>Weather</Text>
            </View>
            <Text style={styles.infoValue}>28°C</Text>
            <Text style={styles.infoSubtitle}>Partly Cloudy</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoEmoji}>🚦</Text>
              <Text style={styles.infoTitle}>Traffic</Text>
            </View>
            <Text style={styles.infoValue}>Light</Text>
            <Text style={styles.infoSubtitle}>Good conditions</Text>
          </View>
        </View>

        {/* Latest Activities */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Trips</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesContainer}>
            {activities.map((activity) => (
              <TouchableOpacity key={activity.id} style={styles.activityCard}>
                <View style={styles.activityIcon}>
                  {activity.type === 'taxi' ? (
                    <Car size={20} color="#ef4444" />
                  ) : (
                    <Bus size={20} color="#f97316" />
                  )}
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityCode}>
                    {activity.code}
                  </Text>
                  <Text style={styles.activityRoute}>{activity.route}</Text>
                  <Text style={styles.activityTime}>{activity.time} • Today</Text>
                </View>
                <View style={styles.activityRight}>
                  <View style={[
                    styles.statusBadge,
                    activity.status === 'COMPLETED' ? styles.statusBadgeCompleted : styles.statusBadgeInProgress,
                  ]}>
                    <Text style={styles.statusText}>{activity.status}</Text>
                  </View>
                  <Text style={styles.activityAmount}>$12.50</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* WhatsApp FAB */}
      <TouchableOpacity style={styles.whatsappFab}>
        <MessageCircle size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
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
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563eb",
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  locationBanner: {
    margin: 20,
    marginBottom: 24,
  },
  locationContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 16,
    padding: 20,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  locationText: {
    flex: 1,
  },
  locationTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  locationSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginBottom: 8,
  },
  locationButton: {
    padding: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    width: "70%",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 32,
  },
  serviceCard: {
    width: "47%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  viewAllText: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "500",
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  quickActionCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionGradient: {
    padding: 20,
  },
  quickActionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  quickActionText: {
    flex: 1,
    marginLeft: 16,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  promoBanner: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  promoGradient: {
    padding: 20,
  },
  promoContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 4,
  },
  promoCode: {
    fontSize: 12,
    color: "#fbbf24",
    fontWeight: "600",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  promoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  promoEmoji: {
    fontSize: 24,
  },
  infoCards: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  infoEmoji: {
    fontSize: 16,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 2,
  },
  infoSubtitle: {
    fontSize: 11,
    color: "#64748b",
  },
  activitiesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityCode: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  activityRoute: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: "#9ca3af",
  },
  activityRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  activityAmount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10b981",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeCompleted: {
    backgroundColor: "#10b981",
  },
  statusBadgeInProgress: {
    backgroundColor: "#2563eb",
  },
  statusText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#ffffff",
  },
  whatsappFab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#25d366",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  spacer: {
    height: 20,
  },
});