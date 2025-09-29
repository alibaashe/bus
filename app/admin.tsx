import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  BarChart2,
  Users,
  Car,
  Award,
  Settings,
  Bell,
  ArrowLeft,
} from 'lucide-react-native';

const adminMenuItems = [
  {
    title: 'Analytics',
    icon: BarChart2,
    color: '#3b82f6',
    href: '/admin/analytics',
  },
  { title: 'Users', icon: Users, color: '#16a34a', href: '/admin/users' },
  {
    title: 'Vehicles',
    icon: Car,
    color: '#f97316',
    href: '/admin/vehicles',
  },
  {
    title: 'Loyalty Program',
    icon: Award,
    color: '#8b5cf6',
    href: '/admin/loyalty',
  },
];

export default function AdminDashboard() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Bell size={24} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Welcome, Admin!</Text>
          <Text style={styles.summaryText}>
            Here's a quick overview of your platform's activity.
          </Text>
        </View>
        <View style={styles.grid}>
          {adminMenuItems.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.card}
              onPress={() => router.push(item.href)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <item.icon size={32} color="#fff" />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  content: {
    padding: 20,
  },
  summary: {
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#64748b',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
});