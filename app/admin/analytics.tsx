import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Car,
  Star,
  Calendar,
  Download,
  Settings,
  Activity,
  Target,
  Clock,
  MapPin,
  Zap,
} from "lucide-react-native";

const { width } = Dimensions.get('window');

interface AnalyticsData {
  revenue: {
    total: number;
    growth: number;
    monthly: number[];
    labels: string[];
  };
  rides: {
    total: number;
    growth: number;
    completed: number;
    cancelled: number;
    daily: number[];
  };
  users: {
    total: number;
    growth: number;
    active: number;
    new: number;
  };
  performance: {
    averageRating: number;
    completionRate: number;
    responseTime: number;
    customerSatisfaction: number;
  };
}

export default function AdminAnalytics() {
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const analyticsData: AnalyticsData = {
    revenue: {
      total: 125678.90,
      growth: 15.2,
      monthly: [8500, 9200, 8800, 10500, 11200, 12800, 13400, 14200, 15600, 16800, 17200, 18900],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    rides: {
      total: 8934,
      growth: 12.8,
      completed: 8456,
      cancelled: 478,
      daily: [120, 135, 142, 128, 156, 189, 167, 145, 178, 192, 203, 187, 165, 198],
    },
    users: {
      total: 12847,
      growth: 8.5,
      active: 8934,
      new: 456,
    },
    performance: {
      averageRating: 4.8,
      completionRate: 94.6,
      responseTime: 3.2,
      customerSatisfaction: 92.4,
    },
  };

  const topRoutes = [
    { route: "Hargeisa → Mogadishu", rides: 1234, revenue: 15678.90, growth: 12.5 },
    { route: "Mogadishu → Bosaso", rides: 987, revenue: 12456.75, growth: 8.3 },
    { route: "Hargeisa → Bosaso", rides: 756, revenue: 9876.50, growth: -2.1 },
    { route: "Mogadishu → Kismayo", rides: 654, revenue: 8765.25, growth: 15.7 },
    { route: "Bosaso → Garowe", rides: 543, revenue: 6543.00, growth: 5.4 },
  ];

  const revenueByService = [
    { service: "Bus", amount: 67890.45, percentage: 54, color: "#f97316" },
    { service: "Taxi", amount: 34567.25, percentage: 27, color: "#ef4444" },
    { service: "Cargo", amount: 15678.90, percentage: 12, color: "#3b82f6" },
    { service: "Delivery", amount: 7542.30, percentage: 7, color: "#8b5cf6" },
  ];

  const renderChart = () => {
    const maxValue = Math.max(...analyticsData.revenue.monthly);
    const chartHeight = 120;
    const chartWidth = width - 80;
    const barWidth = chartWidth / analyticsData.revenue.monthly.length - 8;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Revenue Trend (Last 12 Months)</Text>
        <View style={styles.chart}>
          <View style={styles.chartBars}>
            {analyticsData.revenue.monthly.map((value, index) => {
              const barHeight = (value / maxValue) * chartHeight;
              return (
                <View key={index} style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: barHeight, 
                        width: barWidth,
                        backgroundColor: index === analyticsData.revenue.monthly.length - 1 ? "#2563eb" : "#e2e8f0"
                      }
                    ]} 
                  />
                  <Text style={styles.barLabel}>{analyticsData.revenue.labels[index]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
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
            <Text style={styles.headerTitle}>Analytics</Text>
            <Text style={styles.headerSubtitle}>Business Insights</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Download size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {[
          { key: '7d', label: '7 Days' },
          { key: '30d', label: '30 Days' },
          { key: '90d', label: '90 Days' },
          { key: '1y', label: '1 Year' },
        ].map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && styles.activePeriodButton
            ]}
            onPress={() => setSelectedPeriod(period.key as any)}
          >
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === period.key && styles.activePeriodButtonText
            ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIcon, { backgroundColor: "#dbeafe" }]}>
                <DollarSign size={24} color="#3b82f6" />
              </View>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#10b981" />
                <Text style={styles.metricTrendText}>+{analyticsData.revenue.growth}%</Text>
              </View>
            </View>
            <Text style={styles.metricValue}>${analyticsData.revenue.total.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIcon, { backgroundColor: "#fed7aa" }]}>
                <Car size={24} color="#f97316" />
              </View>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#10b981" />
                <Text style={styles.metricTrendText}>+{analyticsData.rides.growth}%</Text>
              </View>
            </View>
            <Text style={styles.metricValue}>{analyticsData.rides.total.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Total Rides</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIcon, { backgroundColor: "#d1fae5" }]}>
                <Users size={24} color="#10b981" />
              </View>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#10b981" />
                <Text style={styles.metricTrendText}>+{analyticsData.users.growth}%</Text>
              </View>
            </View>
            <Text style={styles.metricValue}>{analyticsData.users.total.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Total Users</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIcon, { backgroundColor: "#fef3c7" }]}>
                <Star size={24} color="#f59e0b" />
              </View>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#10b981" />
                <Text style={styles.metricTrendText}>+2.1%</Text>
              </View>
            </View>
            <Text style={styles.metricValue}>{analyticsData.performance.averageRating}</Text>
            <Text style={styles.metricLabel}>Avg Rating</Text>
          </View>
        </View>

        {/* Revenue Chart */}
        {renderChart()}

        {/* Performance Metrics */}
        <View style={styles.performanceContainer}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          <View style={styles.performanceGrid}>
            <View style={styles.performanceCard}>
              <View style={styles.performanceIcon}>
                <Target size={20} color="#10b981" />
              </View>
              <Text style={styles.performanceValue}>{analyticsData.performance.completionRate}%</Text>
              <Text style={styles.performanceLabel}>Completion Rate</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${analyticsData.performance.completionRate}%` }]} />
              </View>
            </View>

            <View style={styles.performanceCard}>
              <View style={styles.performanceIcon}>
                <Clock size={20} color="#3b82f6" />
              </View>
              <Text style={styles.performanceValue}>{analyticsData.performance.responseTime}m</Text>
              <Text style={styles.performanceLabel}>Avg Response Time</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "75%", backgroundColor: "#3b82f6" }]} />
              </View>
            </View>

            <View style={styles.performanceCard}>
              <View style={styles.performanceIcon}>
                <Zap size={20} color="#f59e0b" />
              </View>
              <Text style={styles.performanceValue}>{analyticsData.performance.customerSatisfaction}%</Text>
              <Text style={styles.performanceLabel}>Customer Satisfaction</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${analyticsData.performance.customerSatisfaction}%`, backgroundColor: "#f59e0b" }]} />
              </View>
            </View>

            <View style={styles.performanceCard}>
              <View style={styles.performanceIcon}>
                <Activity size={20} color="#8b5cf6" />
              </View>
              <Text style={styles.performanceValue}>{analyticsData.users.active.toLocaleString()}</Text>
              <Text style={styles.performanceLabel}>Active Users</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "85%", backgroundColor: "#8b5cf6" }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Revenue by Service */}
        <View style={styles.revenueByServiceContainer}>
          <Text style={styles.sectionTitle}>Revenue by Service</Text>
          <View style={styles.servicesList}>
            {revenueByService.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <View style={[styles.serviceColor, { backgroundColor: service.color }]} />
                  <Text style={styles.serviceName}>{service.service}</Text>
                </View>
                <View style={styles.serviceStats}>
                  <Text style={styles.serviceAmount}>${service.amount.toLocaleString()}</Text>
                  <Text style={styles.servicePercentage}>{service.percentage}%</Text>
                </View>
                <View style={styles.serviceBar}>
                  <View 
                    style={[
                      styles.serviceBarFill, 
                      { 
                        width: `${service.percentage}%`,
                        backgroundColor: service.color 
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Routes */}
        <View style={styles.topRoutesContainer}>
          <Text style={styles.sectionTitle}>Top Routes</Text>
          <View style={styles.routesList}>
            {topRoutes.map((route, index) => (
              <View key={index} style={styles.routeItem}>
                <View style={styles.routeRank}>
                  <Text style={styles.routeRankText}>{index + 1}</Text>
                </View>
                <View style={styles.routeInfo}>
                  <View style={styles.routeHeader}>
                    <MapPin size={14} color="#64748b" />
                    <Text style={styles.routeName}>{route.route}</Text>
                  </View>
                  <View style={styles.routeStats}>
                    <Text style={styles.routeStat}>{route.rides} rides</Text>
                    <Text style={styles.routeStat}>•</Text>
                    <Text style={styles.routeStat}>${route.revenue.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.routeGrowth}>
                  {route.growth > 0 ? (
                    <TrendingUp size={12} color="#10b981" />
                  ) : (
                    <TrendingDown size={12} color="#ef4444" />
                  )}
                  <Text style={[
                    styles.routeGrowthText,
                    { color: route.growth > 0 ? "#10b981" : "#ef4444" }
                  ]}>
                    {route.growth > 0 ? '+' : ''}{route.growth}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
  periodSelector: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    alignItems: "center",
  },
  activePeriodButton: {
    backgroundColor: "#2563eb",
  },
  periodButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
  },
  activePeriodButtonText: {
    color: "#ffffff",
  },
  content: {
    flex: 1,
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 12,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  metricTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metricTrendText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10b981",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 20,
  },
  chart: {
    height: 140,
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 120,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    borderRadius: 2,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: "#64748b",
  },
  performanceContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  performanceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  performanceCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  performanceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#10b981",
    borderRadius: 2,
  },
  revenueByServiceContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  servicesList: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 16,
  },
  serviceItem: {
    gap: 8,
  },
  serviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  serviceColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  serviceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },
  servicePercentage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  serviceBar: {
    height: 6,
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
  },
  serviceBarFill: {
    height: 6,
    borderRadius: 3,
  },
  topRoutesContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  routesList: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  routeRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  routeRankText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
  routeInfo: {
    flex: 1,
  },
  routeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  routeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  routeStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeStat: {
    fontSize: 12,
    color: "#64748b",
  },
  routeGrowth: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  routeGrowthText: {
    fontSize: 12,
    fontWeight: "600",
  },
  spacer: {
    height: 20,
  },
});