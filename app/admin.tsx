import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  User,
  MapPin,
  Calendar,
  ArrowUpDown,
  Search,
  ChevronRight
} from 'lucide-react-native';
import { cities, popularRoutes } from '@/constants/cities';
import { Image } from 'expo-image';

export default function BookBusScreen() {
  const insets = useSafeAreaInsets();
  const [fromCity, setFromCity] = useState<string>('');
  const [toCity, setToCity] = useState<string>('');
  const [departureDate, setDepartureDate] = useState('19/9/2025');
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');

  const handleCitySelect = (cityName: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromCity(cityName);
      setShowFromModal(false);
    } else {
      setToCity(cityName);
      setShowToModal(false);
    }
  };

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = () => {
    if (fromCity && toCity) {
      router.push({
        pathname: '/bus-schedule',
        params: {
          from: fromCity,
          to: toCity,
          date: departureDate
        }
      });
    }
  };

  const CitySelectionModal = ({ 
    visible, 
    onClose, 
    onSelect, 
    title 
  }: {
    visible: boolean;
    onClose: () => void;
    onSelect: (city: string) => void;
    title: string;
  }) => (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <ScrollView style={styles.modalContent}>
          {cities.map((city) => (
            <TouchableOpacity
              key={city.id}
              style={styles.cityOption}
              onPress={() => onSelect(city.name)}
            >
              <Image source={{ uri: city.image }} style={styles.cityImage} />
              <View style={styles.cityInfo}>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.cityCountry}>{city.country}</Text>
              </View>
              <ChevronRight size={20} color="#64748b" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f59e0b" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Bus</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Bell size={20} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <User size={20} color="#1f2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trip Selection */}
        <View style={styles.section}>
          <View style={styles.tripTypeContainer}>
            <TouchableOpacity
              style={[
                styles.tripTypeButton,
                tripType === 'one-way' && styles.tripTypeButtonActive
              ]}
              onPress={() => setTripType('one-way')}
            >
              <Text style={[
                styles.tripTypeText,
                tripType === 'one-way' && styles.tripTypeTextActive
              ]}>MAANTA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tripTypeButton,
                tripType === 'round-trip' && styles.tripTypeButtonActive
              ]}
              onPress={() => setTripType('round-trip')}
            >
              <Text style={[
                styles.tripTypeText,
                tripType === 'round-trip' && styles.tripTypeTextActive
              ]}>BERRI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarButton}>
              <Calendar size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Route Selection */}
        <View style={styles.section}>
          <View style={styles.routeContainer}>
            {/* From */}
            <TouchableOpacity
              style={styles.locationInput}
              onPress={() => setShowFromModal(true)}
            >
              <View style={styles.locationIcon}>
                <View style={[styles.locationDot, { backgroundColor: '#3b82f6' }]} />
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationLabel}>FROM</Text>
                <Text style={styles.locationValue}>
                  {fromCity || 'Select departure city'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Swap Button */}
            <TouchableOpacity style={styles.swapButton} onPress={handleSwapCities}>
              <ArrowUpDown size={20} color="#64748b" />
            </TouchableOpacity>

            {/* To */}
            <TouchableOpacity
              style={styles.locationInput}
              onPress={() => setShowToModal(true)}
            >
              <View style={styles.locationIcon}>
                <View style={[styles.locationDot, { backgroundColor: '#ef4444' }]} />
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationLabel}>TO</Text>
                <Text style={styles.locationValue}>
                  {toCity || 'Select destination city'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Date Selection */}
          <View style={styles.dateContainer}>
            <View style={styles.dateIcon}>
              <Calendar size={20} color="#f59e0b" />
            </View>
            <View style={styles.dateContent}>
              <Text style={styles.dateLabel}>DEPARTURE DATE</Text>
              <Text style={styles.dateValue}>{departureDate}</Text>
            </View>
          </View>
        </View>

        {/* Search Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.searchButton,
              (!fromCity || !toCity) && styles.searchButtonDisabled
            ]}
            onPress={handleSearch}
            disabled={!fromCity || !toCity}
          >
            <Search size={20} color="#1f2937" />
            <Text style={styles.searchButtonText}>Raadi</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Routes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <View style={styles.popularRoutesContainer}>
            {popularRoutes.map((route) => (
              <TouchableOpacity
                key={route.id}
                style={styles.routeCard}
                onPress={() => {
                  setFromCity(route.from.name);
                  setToCity(route.to.name);
                }}
              >
                <View style={styles.routeImages}>
                  <Image source={{ uri: route.from.image }} style={styles.routeImageFrom} />
                  <View style={styles.routeArrow}>
                    <ChevronRight size={16} color="#64748b" />
                  </View>
                  <Image source={{ uri: route.to.image }} style={styles.routeImageTo} />
                </View>
                <View style={styles.routeInfo}>
                  <Text style={styles.routeTitle}>
                    {route.from.name} → {route.to.name}
                  </Text>
                  <Text style={styles.routeSubtitle}>Popular route • Tap to search</Text>
                </View>
                <ChevronRight size={20} color="#64748b" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* City Selection Modals */}
      <CitySelectionModal
        visible={showFromModal}
        onClose={() => setShowFromModal(false)}
        onSelect={(city) => handleCitySelect(city, 'from')}
        title="Select Departure City"
      />
      
      <CitySelectionModal
        visible={showToModal}
        onClose={() => setShowToModal(false)}
        onSelect={(city) => handleCitySelect(city, 'to')}
        title="Select Destination City"
      />
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
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tripTypeButtonActive: {
    backgroundColor: '#3b82f6',
  },
  tripTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  tripTypeTextActive: {
    color: '#ffffff',
  },
  calendarButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  locationContent: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  locationValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  swapButton: {
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    marginVertical: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dateContent: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f59e0b',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  popularRoutesContainer: {
    gap: 12,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  routeImages: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  routeImageFrom: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  routeArrow: {
    marginHorizontal: 8,
  },
  routeImageTo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  routeInfo: {
    flex: 1,
  },
  routeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  routeSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  cityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cityImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  cityCountry: {
    fontSize: 12,
    color: '#64748b',
  },
});