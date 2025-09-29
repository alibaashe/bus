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
  Modal,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ArrowLeft,
  Star,
  Gift,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Award,
  Target,
  Calendar,
  DollarSign,
  Percent,
  Settings,
  Eye,
  MoreVertical,
} from "lucide-react-native";

interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  color: string;
  bgColor: string;
  members: number;
  multiplier: number;
}

interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'freeRide' | 'upgrade' | 'cashback';
  value: number;
  isActive: boolean;
  expiryDate: string;
  usageCount: number;
  maxUsage: number;
}

interface LoyaltyMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  tier: string;
  joinDate: string;
  totalSpent: number;
  ridesCount: number;
  lastActivity: string;
}

export default function AdminLoyaltyProgram() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'overview' | 'tiers' | 'rewards' | 'members'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const loyaltyStats = {
    totalMembers: 3456,
    activeMembers: 2890,
    totalPointsIssued: 125000,
    totalPointsRedeemed: 89000,
    averagePointsPerMember: 156,
    conversionRate: 68.5,
  };

  const loyaltyTiers: LoyaltyTier[] = [
    {
      id: "1",
      name: "Bronze",
      minPoints: 0,
      maxPoints: 499,
      benefits: ["5% discount on rides", "Birthday bonus"],
      color: "#cd7f32",
      bgColor: "#fef3e2",
      members: 1890,
      multiplier: 1.0,
    },
    {
      id: "2",
      name: "Silver",
      minPoints: 500,
      maxPoints: 1499,
      benefits: ["10% discount on rides", "Priority booking", "Free cancellation"],
      color: "#c0c0c0",
      bgColor: "#f8fafc",
      members: 1234,
      multiplier: 1.5,
    },
    {
      id: "3",
      name: "Gold",
      minPoints: 1500,
      maxPoints: 4999,
      benefits: ["15% discount on rides", "Premium support", "Free upgrades", "Airport lounge access"],
      color: "#ffd700",
      bgColor: "#fffbeb",
      members: 298,
      multiplier: 2.0,
    },
    {
      id: "4",
      name: "Platinum",
      minPoints: 5000,
      maxPoints: 999999,
      benefits: ["20% discount on rides", "Dedicated concierge", "Free premium rides", "VIP treatment"],
      color: "#e5e4e2",
      bgColor: "#f1f5f9",
      members: 34,
      multiplier: 3.0,
    },
  ];

  const loyaltyRewards: LoyaltyReward[] = [
    {
      id: "1",
      title: "10% Off Next Ride",
      description: "Get 10% discount on your next bus or taxi ride",
      pointsCost: 100,
      type: "discount",
      value: 10,
      isActive: true,
      expiryDate: "2024-12-31",
      usageCount: 234,
      maxUsage: 1000,
    },
    {
      id: "2",
      title: "Free Bus Ride",
      description: "Complimentary bus ride up to $25 value",
      pointsCost: 500,
      type: "freeRide",
      value: 25,
      isActive: true,
      expiryDate: "2024-12-31",
      usageCount: 89,
      maxUsage: 200,
    },
    {
      id: "3",
      title: "Premium Upgrade",
      description: "Upgrade to premium seat at no extra cost",
      pointsCost: 200,
      type: "upgrade",
      value: 0,
      isActive: true,
      expiryDate: "2024-12-31",
      usageCount: 156,
      maxUsage: 500,
    },
    {
      id: "4",
      title: "$5 Cashback",
      description: "Get $5 cashback to your wallet",
      pointsCost: 750,
      type: "cashback",
      value: 5,
      isActive: false,
      expiryDate: "2024-11-30",
      usageCount: 45,
      maxUsage: 100,
    },
  ];

  const loyaltyMembers: LoyaltyMember[] = [
    {
      id: "1",
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      phone: "+252 61 234 5678",
      points: 2450,
      tier: "Gold",
      joinDate: "2023-06-15",
      totalSpent: 1250.75,
      ridesCount: 89,
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      name: "Fatima Ali",
      email: "fatima@example.com",
      phone: "+252 61 345 6789",
      points: 890,
      tier: "Silver",
      joinDate: "2023-08-22",
      totalSpent: 567.25,
      ridesCount: 45,
      lastActivity: "1 day ago",
    },
    {
      id: "3",
      name: "Mohamed Omar",
      email: "mohamed@example.com",
      phone: "+252 61 456 7890",
      points: 6750,
      tier: "Platinum",
      joinDate: "2023-01-10",
      totalSpent: 3450.50,
      ridesCount: 234,
      lastActivity: "30 min ago",
    },
  ];

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return Percent;
      case 'freeRide':
        return Gift;
      case 'upgrade':
        return Award;
      case 'cashback':
        return DollarSign;
      default:
        return Star;
    }
  };

  const getRewardColor = (type: string) => {
    switch (type) {
      case 'discount':
        return '#f59e0b';
      case 'freeRide':
        return '#10b981';
      case 'upgrade':
        return '#8b5cf6';
      case 'cashback':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  };

  const getTierColor = (tierName: string) => {
    const tier = loyaltyTiers.find(t => t.name === tierName);
    return tier ? tier.color : '#64748b';
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Users size={24} color="#3b82f6" />
          </View>
          <Text style={styles.statValue}>{loyaltyStats.totalMembers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Members</Text>
          <View style={styles.statTrend}>
            <TrendingUp size={12} color="#10b981" />
            <Text style={styles.statTrendText}>+12%</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Star size={24} color="#f59e0b" />
          </View>
          <Text style={styles.statValue}>{loyaltyStats.totalPointsIssued.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Points Issued</Text>
          <View style={styles.statTrend}>
            <TrendingUp size={12} color="#10b981" />
            <Text style={styles.statTrendText}>+8%</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Gift size={24} color="#10b981" />
          </View>
          <Text style={styles.statValue}>{loyaltyStats.totalPointsRedeemed.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Points Redeemed</Text>
          <View style={styles.statTrend}>
            <TrendingUp size={12} color="#10b981" />
            <Text style={styles.statTrendText}>+15%</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Target size={24} color="#8b5cf6" />
          </View>
          <Text style={styles.statValue}>{loyaltyStats.conversionRate}%</Text>
          <Text style={styles.statLabel}>Conversion Rate</Text>
          <View style={styles.statTrend}>
            <TrendingUp size={12} color="#10b981" />
            <Text style={styles.statTrendText}>+5%</Text>
          </View>
        </View>
      </View>

      {/* Tier Distribution */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tier Distribution</Text>
        <View style={styles.tiersList}>
          {loyaltyTiers.map((tier) => (
            <View key={tier.id} style={styles.tierCard}>
              <View style={[styles.tierIcon, { backgroundColor: tier.bgColor }]}>
                <Award size={20} color={tier.color} />
              </View>
              <View style={styles.tierInfo}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text style={styles.tierRange}>{tier.minPoints} - {tier.maxPoints === 999999 ? '∞' : tier.maxPoints} points</Text>
                <Text style={styles.tierMembers}>{tier.members} members</Text>
              </View>
              <View style={styles.tierMultiplier}>
                <Text style={styles.multiplierText}>{tier.multiplier}x</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderTiers = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Loyalty Tiers</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Plus size={16} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Tier</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tiersList}>
        {loyaltyTiers.map((tier) => (
          <View key={tier.id} style={styles.tierDetailCard}>
            <View style={styles.tierHeader}>
              <View style={[styles.tierIcon, { backgroundColor: tier.bgColor }]}>
                <Award size={24} color={tier.color} />
              </View>
              <View style={styles.tierInfo}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text style={styles.tierRange}>{tier.minPoints} - {tier.maxPoints === 999999 ? '∞' : tier.maxPoints} points</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <MoreVertical size={16} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.tierStats}>
              <View style={styles.tierStat}>
                <Text style={styles.tierStatValue}>{tier.members}</Text>
                <Text style={styles.tierStatLabel}>Members</Text>
              </View>
              <View style={styles.tierStat}>
                <Text style={styles.tierStatValue}>{tier.multiplier}x</Text>
                <Text style={styles.tierStatLabel}>Multiplier</Text>
              </View>
              <View style={styles.tierStat}>
                <Text style={styles.tierStatValue}>{tier.benefits.length}</Text>
                <Text style={styles.tierStatLabel}>Benefits</Text>
              </View>
            </View>

            <View style={styles.tierBenefits}>
              <Text style={styles.benefitsTitle}>Benefits:</Text>
              {tier.benefits.map((benefit, index) => (
                <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderRewards = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Loyalty Rewards</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Plus size={16} color="#ffffff" />
          <Text style={styles.addButtonText}>Add Reward</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rewardsList}>
        {loyaltyRewards.map((reward) => {
          const IconComponent = getRewardIcon(reward.type);
          const iconColor = getRewardColor(reward.type);

          return (
            <View key={reward.id} style={styles.rewardCard}>
              <View style={styles.rewardHeader}>
                <View style={[styles.rewardIcon, { backgroundColor: `${iconColor}20` }]}>
                  <IconComponent size={20} color={iconColor} />
                </View>
                <View style={styles.rewardInfo}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                </View>
                <View style={styles.rewardStatus}>
                  <Switch
                    value={reward.isActive}
                    onValueChange={(value) => {
                      // Handle toggle
                    }}
                    trackColor={{ false: "#e2e8f0", true: "#10b981" }}
                    thumbColor={reward.isActive ? "#ffffff" : "#f4f3f4"}
                  />
                </View>
              </View>

              <View style={styles.rewardDetails}>
                <View style={styles.rewardDetail}>
                  <Text style={styles.rewardDetailLabel}>Cost</Text>
                  <Text style={styles.rewardDetailValue}>{reward.pointsCost} pts</Text>
                </View>
                <View style={styles.rewardDetail}>
                  <Text style={styles.rewardDetailLabel}>Used</Text>
                  <Text style={styles.rewardDetailValue}>{reward.usageCount}/{reward.maxUsage}</Text>
                </View>
                <View style={styles.rewardDetail}>
                  <Text style={styles.rewardDetailLabel}>Expires</Text>
                  <Text style={styles.rewardDetailValue}>{reward.expiryDate}</Text>
                </View>
              </View>

              <View style={styles.rewardActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Eye size={16} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Edit size={16} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Trash2 size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderMembers = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search members..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <View style={styles.membersList}>
        {loyaltyMembers.map((member) => (
          <TouchableOpacity key={member.id} style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitials}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberEmail}>{member.email}</Text>
                <Text style={styles.memberPhone}>{member.phone}</Text>
              </View>
              <View style={styles.memberTier}>
                <View style={[styles.tierBadge, { backgroundColor: `${getTierColor(member.tier)}20` }]}>
                  <Text style={[styles.tierBadgeText, { color: getTierColor(member.tier) }]}>
                    {member.tier}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.memberStats}>
              <View style={styles.memberStat}>
                <Text style={styles.memberStatValue}>{member.points}</Text>
                <Text style={styles.memberStatLabel}>Points</Text>
              </View>
              <View style={styles.memberStat}>
                <Text style={styles.memberStatValue}>{member.ridesCount}</Text>
                <Text style={styles.memberStatLabel}>Rides</Text>
              </View>
              <View style={styles.memberStat}>
                <Text style={styles.memberStatValue}>${member.totalSpent}</Text>
                <Text style={styles.memberStatLabel}>Spent</Text>
              </View>
              <View style={styles.memberStat}>
                <Text style={styles.memberStatValue}>{member.lastActivity}</Text>
                <Text style={styles.memberStatLabel}>Last Active</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

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
            <Text style={styles.headerTitle}>Loyalty Program</Text>
            <Text style={styles.headerSubtitle}>Manage rewards & tiers</Text>
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

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollView}>
          {[
            { key: 'overview', label: 'Overview', icon: Star },
            { key: 'tiers', label: 'Tiers', icon: Award },
            { key: 'rewards', label: 'Rewards', icon: Gift },
            { key: 'members', label: 'Members', icon: Users },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, activeTab === tab.key && styles.activeTabButton]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <tab.icon 
                size={16} 
                color={activeTab === tab.key ? "#2563eb" : "#64748b"} 
              />
              <Text style={[
                styles.tabButtonText,
                activeTab === tab.key && styles.activeTabButtonText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tiers' && renderTiers()}
        {activeTab === 'rewards' && renderRewards()}
        {activeTab === 'members' && renderMembers()}
        
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
  tabNavigation: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tabScrollView: {
    paddingHorizontal: 20,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
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
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
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
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statTrendText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10b981",
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  tiersList: {
    gap: 12,
  },
  tierCard: {
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
  tierDetailCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tierHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  tierIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  tierRange: {
    fontSize: 12,
    color: "#64748b",
  },
  tierMembers: {
    fontSize: 11,
    color: "#9ca3af",
  },
  tierMultiplier: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  multiplierText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  moreButton: {
    padding: 4,
  },
  tierStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },
  tierStat: {
    alignItems: "center",
  },
  tierStatValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  tierStatLabel: {
    fontSize: 11,
    color: "#64748b",
  },
  tierBenefits: {
    gap: 4,
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  benefitItem: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 16,
  },
  rewardsList: {
    gap: 16,
  },
  rewardCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  rewardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 16,
  },
  rewardStatus: {
    marginLeft: 12,
  },
  rewardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },
  rewardDetail: {
    alignItems: "center",
  },
  rewardDetailLabel: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 2,
  },
  rewardDetailValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
  },
  rewardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  filterButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  membersList: {
    gap: 16,
  },
  memberCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  memberHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  memberInitials: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  memberEmail: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 1,
  },
  memberPhone: {
    fontSize: 12,
    color: "#64748b",
  },
  memberTier: {
    marginLeft: 12,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tierBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  memberStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  memberStat: {
    alignItems: "center",
  },
  memberStatValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
  },
  memberStatLabel: {
    fontSize: 10,
    color: "#64748b",
  },
  spacer: {
    height: 20,
  },
});