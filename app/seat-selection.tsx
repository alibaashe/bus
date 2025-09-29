import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  User,
  Bus,
  X,
  Check
} from 'lucide-react-native';
import { seatLayout, paymentMethods } from '@/constants/buses';

interface Seat {
  id: number;
  row: number;
  position: string;
  isAvailable: boolean;
  isSelected?: boolean;
  isBooked?: boolean;
}

export default function SeatSelectionScreen() {
  const insets = useSafeAreaInsets();
  const { busId, from, to, date } = useLocalSearchParams<{
    busId: string;
    from: string;
    to: string;
    date: string;
  }>();

  const [seats, setSeats] = useState<Seat[]>(
    seatLayout.map(seat => ({
      ...seat,
      isSelected: false,
      isBooked: seat.id === 4 // Mock some booked seats
    }))
  );
  
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('dollar');
  const [selectedPayment, setSelectedPayment] = useState('zaad');
  const [customerName, setCustomerName] = useState('Sahal Customer');
  const [phoneNumber, setPhoneNumber] = useState('636807814');

  const selectedSeats = seats.filter(seat => seat.isSelected);
  const totalPrice = selectedSeats.length * 65000;

  const handleSeatPress = (seatId: number) => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId && seat.isAvailable && !seat.isBooked
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('Error', 'Please select at least one seat');
      return;
    }
    setShowBookingModal(true);
  };

  const handlePayment = () => {
    // Mock payment processing
    Alert.alert(
      'Payment Successful',
      `Your booking for ${selectedSeats.length} seat(s) has been confirmed!`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowBookingModal(false);
            router.push('/history');
          }
        }
      ]
    );
  };

  const renderSeat = (seat: Seat) => {
    let seatStyle = [styles.seat];
    let seatColor = '#10b981'; // Available - green
    
    if (seat.isBooked) {
      seatColor = '#ef4444'; // Booked - red
    } else if (seat.isSelected) {
      seatColor = '#f59e0b'; // Selected - yellow
    }
    
    return (
      <TouchableOpacity
        key={seat.id}
        style={[
          styles.seat,
          { backgroundColor: seatColor },
          !seat.isAvailable && styles.seatUnavailable
        ]}
        onPress={() => handleSeatPress(seat.id)}
        disabled={seat.isBooked || !seat.isAvailable}
      >
        <Text style={styles.seatNumber}>{seat.id}</Text>
      </TouchableOpacity>
    );
  };

  const renderSeatRow = (rowNumber: number) => {
    const rowSeats = seats.filter(seat => seat.row === rowNumber);
    
    return (
      <View key={rowNumber} style={styles.seatRow}>
        {rowSeats.map(seat => renderSeat(seat))}
        {rowNumber > 2 && <View style={styles.aisle} />}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f59e0b" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Seats</Text>
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
        
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>⏰ 07:30 AM → 09:30 AM</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#10b981' }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#f59e0b' }]} />
          <Text style={styles.legendText}>Selected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.legendText}>Booked</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Bus Layout */}
        <View style={styles.busLayout}>
          {/* Driver Section */}
          <View style={styles.driverSection}>
            <View style={styles.driverSeat}>
              <Bus size={24} color="#1f2937" />
            </View>
          </View>
          
          {/* Seats */}
          <View style={styles.seatsContainer}>
            {[1, 2, 3, 4, 5].map(rowNumber => renderSeatRow(rowNumber))}
          </View>
          
          <Text style={styles.backRowLabel}>Back Row</Text>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      {selectedSeats.length > 0 && (
        <View style={styles.bottomSection}>
          <View style={styles.selectionInfo}>
            <Text style={styles.selectedSeatsText}>
              👥 Selected Seats: {selectedSeats.map(s => s.id).join(', ')}
            </Text>
            <Text style={styles.totalPriceText}>
              Total Price: SHL {totalPrice.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmBooking}
          >
            <Text style={styles.confirmButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Booking Confirmation Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowBookingModal(false)}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Booking Confirmation</Text>
            <View style={{ width: 24 }} />
          </View>
          
          <ScrollView style={styles.modalContent}>
            {/* Route Summary */}
            <View style={styles.routeSummary}>
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
              <Text style={styles.timeText}>07:30 AM → 09:30 AM</Text>
            </View>

            {/* Currency Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💲 Currency</Text>
              <View style={styles.currencyOptions}>
                <TouchableOpacity
                  style={[
                    styles.currencyOption,
                    selectedCurrency === 'dollar' && styles.currencyOptionSelected
                  ]}
                  onPress={() => setSelectedCurrency('dollar')}
                >
                  {selectedCurrency === 'dollar' && <Check size={16} color="#3b82f6" />}
                  <Text style={styles.currencyText}>Dollar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.currencyOption,
                    selectedCurrency === 'shilling' && styles.currencyOptionSelected
                  ]}
                  onPress={() => setSelectedCurrency('shilling')}
                >
                  {selectedCurrency === 'shilling' && <Check size={16} color="#3b82f6" />}
                  <Text style={styles.currencyText}>Shilling</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Method */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💳 Payment Method</Text>
              <View style={styles.paymentOptions}>
                {paymentMethods.map(method => (
                  <TouchableOpacity
                    key={method.id}
                    style={[
                      styles.paymentOption,
                      selectedPayment === method.id && styles.paymentOptionSelected
                    ]}
                    onPress={() => setSelectedPayment(method.id)}
                  >
                    {selectedPayment === method.id && (
                      <View style={styles.paymentCheck}>
                        <Check size={16} color="#ffffff" />
                      </View>
                    )}
                    <View style={[styles.paymentIcon, { backgroundColor: method.color }]}>
                      <Text style={styles.paymentIconText}>{method.icon}</Text>
                    </View>
                    <Text style={styles.paymentText}>{method.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* User Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👤 User Information</Text>
              <Text style={styles.inputLabel}>Magacaaga</Text>
              <TextInput
                style={styles.textInput}
                value={customerName}
                onChangeText={setCustomerName}
                placeholder="Enter your name"
              />
              <Text style={styles.inputLabel}>Lambarka Taleefanka</Text>
              <TextInput
                style={styles.textInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>

            {/* Selected Seats Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👥 Selected Seats</Text>
              <View style={styles.seatsSummary}>
                <Text style={styles.seatsText}>
                  {selectedSeats.length} seat • {selectedSeats.map(s => s.id).join(', ')}
                </Text>
                <Text style={styles.totalPriceText}>
                  Total Price: SHL {totalPrice.toLocaleString()}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Confirm Button */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePayment}
            >
              <Text style={styles.payButtonText}>💳 Confirm & Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 8,
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
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#64748b',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#64748b',
  },
  content: {
    flex: 1,
  },
  busLayout: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  driverSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  driverSeat: {
    width: 50,
    height: 40,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatsContainer: {
    gap: 12,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  seat: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  seatUnavailable: {
    opacity: 0.5,
  },
  seatNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  aisle: {
    width: 20,
  },
  backRowLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 12,
    color: '#64748b',
  },
  bottomSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  selectionInfo: {
    marginBottom: 12,
  },
  selectedSeatsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b82f6',
  },
  confirmButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
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
    backgroundColor: '#3b82f6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  routeSummary: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  currencyOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  currencyOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    gap: 8,
  },
  currencyOptionSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  paymentOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    position: 'relative',
  },
  paymentOptionSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  paymentCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  paymentIconText: {
    fontSize: 20,
  },
  paymentText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1f2937',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  seatsSummary: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
  },
  seatsText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  payButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});