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
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  User,
  Bus,
  Clock,
  Wifi,
  Snowflake
} from 'lucide-react-native';
import { Image } from 'expo-image';
import { busSchedules } from '@/constants/buses';

export default function BusScheduleScreen() {
  const insets = useSafeAreaInsets();
  const { from, to, date } = useLocalSearchParams<{
    from: string;
    to: string;
    date: string;
  }>();

  const schedule = busSchedules[0]; // Mock data

  const handleBusSelect = (busId: string) => {
    router.push({
      pathname: '/seat-selection',
      params: {
        busId,
        from,
        to,
        date
      }
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f59e0b" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basaska bann...</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Bell size={20} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <User size={20} color="#1f2937" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Route Info */}
      <View style={styles.routeInfo}>
        <View style={styles.routeBadges}>
          <View style={styles.routeBadge}>
            <Text style={styles.routeBadgeText}>{from}</Text>
          </View>
          <View style={styles.routeConnector}>
            <View style={[styles.routeDot, { backgroundColor: '#10b981' }]} />
            <Bus size={16} color="#64748b" />
            <View style={[styles.routeDot, { backgroundColor: '#ef4444' }]} />
          </View>
          <View style={[styles.routeBadge, styles.routeBadgeDestination]}>
            <Text style={[styles.routeBadgeText, styles.routeBadgeTextDestination]}>{to}</Text>
          </View>
        </View>
        
        <View style={styles.dateInfo}>
          <Text style={styles.dateText}>📅 Sabti • {date}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {schedule.buses.map((bus) => (
          <TouchableOpacity
            key={bus.id}
            style={styles.busCard}
            onPress={() => handleBusSelect(bus.id)}
          >
            <View style={styles.busHeader}>
              <Image source={{ uri: bus.image }} style={styles.busImage} />
              <View style={styles.busInfo}>
                <Text style={styles.busName}>{bus.name}</Text>
                <Text style={styles.busPrice}>{bus.currency} {bus.price.toLocaleString()}</Text>
              </View>
            </View>
            
            <View style={styles.amenities}>
              {bus.amenities.includes('AC') && (
                <View style={styles.amenityBadge}>
                  <Snowflake size={12} color="#ef4444" />
                  <Text style={styles.amenityText}>AC</Text>
                </View>
              )}
              {bus.amenities.includes('WIFI') && (
                <View style={styles.amenityBadge}>
                  <Wifi size={12} color="#10b981" />
                  <Text style={styles.amenityText}>WIFI</Text>
                </View>
              )}
            </View>
            
            <View style={styles.scheduleInfo}>
              <View style={styles.timeInfo}>
                <View style={styles.timePoint}>
                  <Text style={styles.timeText}>{bus.departureTime}</Text>
                  <Text style={styles.locationText}>{from}</Text>
                </View>
                
                <View style={styles.journeyLine}>
                  <View style={[styles.journeyDot, { backgroundColor: '#3b82f6' }]} />
                  <View style={styles.journeyPath} />
                  <View style={[styles.journeyDot, { backgroundColor: '#ef4444' }]} />
                  <Text style={styles.durationText}>{bus.duration} Muddada</Text>
                </View>
                
                <View style={styles.timePoint}>
                  <Text style={styles.timeText}>{bus.arrivalTime}</Text>
                  <Text style={styles.locationText}>{to}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f59e0b',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  routeInfo: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  routeBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  routeBadgeDestination: {
    backgroundColor: '#fecaca',
  },
  routeBadgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e40af',
  },
  routeBadgeTextDestination: {
    color: '#dc2626',
  },
  routeConnector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    gap: 4,
  },
  routeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#64748b',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  busCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  busHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  busImage: {
    width: 60,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  busInfo: {
    flex: 1,
  },
  busName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  busPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b82f6',
  },
  amenities: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
  },
  amenityText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748b',
  },
  scheduleInfo: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timePoint: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#64748b',
  },
  journeyLine: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 20,
  },
  journeyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 0,
  },
  journeyPath: {
    width: '100%',
    height: 2,
    backgroundColor: '#e2e8f0',
    marginVertical: 4,
  },
  durationText: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 8,
  },
});