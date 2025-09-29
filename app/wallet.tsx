import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  Plus,
  Send,
  Download,
  History,
  Eye,
  EyeOff,
  Smartphone,
  DollarSign,
  TrendingUp,
  Gift,
  Shield,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile' | 'bank';
  name: string;
  details: string;
  icon: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  category: 'ride' | 'topup' | 'transfer' | 'refund';
}

const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'mobile',
    name: 'EVC Plus',
    details: '**** **** 7814',
    icon: '📱',
    isDefault: true,
  },
  {
    id: '2',
    type: 'mobile',
    name: 'Zaad Service',
    details: '**** **** 9876',
    icon: '💳',
    isDefault: false,
  },
  {
    id: '3',
    type: 'card',
    name: 'Visa Card',
    details: '**** **** **** 1234',
    icon: '💳',
    isDefault: false,
  },
];

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    description: 'Taxi ride to Airport',
    amount: 12.50,
    date: '2024-01-15 14:30',
    status: 'completed',
    category: 'ride',
  },
  {
    id: '2',
    type: 'credit',
    description: 'Wallet top-up',
    amount: 50.00,
    date: '2024-01-15 10:15',
    status: 'completed',
    category: 'topup',
  },
  {
    id: '3',
    type: 'debit',
    description: 'Bus ticket to Mogadishu',
    amount: 45.00,
    date: '2024-01-14 08:00',
    status: 'completed',
    category: 'ride',
  },
  {
    id: '4',
    type: 'credit',
    description: 'Refund - Cancelled ride',
    amount: 8.75,
    date: '2024-01-13 16:20',
    status: 'completed',
    category: 'refund',
  },
];

export default function WalletScreen() {
  const [balance, setBalance] = useState(127.85);
  const [showBalance, setShowBalance] = useState(true);
  const [topupAmount, setTopupAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'topup' | 'send' | 'history'>('overview');

  const handleTopup = () => {
    const amount = parseFloat(topupAmount);
    if (!amount || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    if (amount < 5) {
      Alert.alert('Error', 'Minimum top-up amount is $5');
      return;
    }
    if (amount > 500) {
      Alert.alert('Error', 'Maximum top-up amount is $500');
      return;
    }

    Alert.alert(
      'Confirm Top-up',
      `Add $${amount.toFixed(2)} to your wallet using ${selectedPaymentMethod.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setBalance(prev => prev + amount);
            setTopupAmount('');
            Alert.alert('Success', `$${amount.toFixed(2)} has been added to your wallet`);
          },
        },
      ]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ride':
        return '🚗';
      case 'topup':
        return '💰';
      case 'transfer':
        return '📤';
      case 'refund':
        return '↩️';
      default:
        return '💳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const renderOverview = () => (
    <>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <LinearGradient
          colors={['#2563eb', '#3b82f6']}
          style={styles.balanceGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.balanceHeader}>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceAmount}>
                  {showBalance ? `$${balance.toFixed(2)}` : '****'}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowBalance(!showBalance)}
                  style={styles.eyeButton}
                >
                  {showBalance ? (
                    <Eye size={20} color="rgba(255, 255, 255, 0.8)" />
                  ) : (
                    <EyeOff size={20} color="rgba(255, 255, 255, 0.8)" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.walletIcon}>
              <Wallet size={32} color="rgba(255, 255, 255, 0.9)" />
            </View>
          </View>
          
          <View style={styles.balanceActions}>
            <TouchableOpacity
              style={styles.balanceActionButton}
              onPress={() => setActiveTab('topup')}
            >
              <Plus size={16} color="#2563eb" />
              <Text style={styles.balanceActionText}>Top Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.balanceActionButton}
              onPress={() => setActiveTab('send')}
            >
              <Send size={16} color="#2563eb" />
              <Text style={styles.balanceActionText}>Send</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.balanceActionButton}
              onPress={() => setActiveTab('history')}
            >
              <History size={16} color="#2563eb" />
              <Text style={styles.balanceActionText}>History</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <TrendingUp size={20} color="#10b981" />
          </View>
          <Text style={styles.statValue}>$245.30</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Gift size={20} color="#f59e0b" />
          </View>
          <Text style={styles.statValue}>$12.50</Text>
          <Text style={styles.statLabel}>Rewards</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Shield size={20} color="#8b5cf6" />
          </View>
          <Text style={styles.statValue}>$500</Text>
          <Text style={styles.statLabel}>Insured</Text>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <View style={styles.paymentMethodsContainer}>
          {paymentMethods.map((method) => (
            <TouchableOpacity key={method.id} style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                  <Text style={styles.paymentMethodNumber}>{method.details}</Text>
                </View>
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.addPaymentMethod}>
            <Plus size={20} color="#2563eb" />
            <Text style={styles.addPaymentMethodText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => setActiveTab('history')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionsContainer}>
          {transactions.slice(0, 3).map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionIcon}>
                <Text style={styles.transactionEmoji}>
                  {getCategoryIcon(transaction.category)}
                </Text>
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>
                  {transaction.description}
                </Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text
                  style={[
                    styles.transactionAmountText,
                    {
                      color: transaction.type === 'credit' ? '#10b981' : '#ef4444',
                    },
                  ]}
                >
                  {transaction.type === 'credit' ? '+' : '-'}$
                  {transaction.amount.toFixed(2)}
                </Text>
                <View
                  style={[
                    styles.transactionStatus,
                    { backgroundColor: getStatusColor(transaction.status) },
                  ]}
                >
                  <Text style={styles.transactionStatusText}>
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );

  const renderTopup = () => (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Up Wallet</Text>
        
        <View style={styles.amountInputContainer}>
          <Text style={styles.inputLabel}>Amount</Text>
          <View style={styles.amountInput}>
            <DollarSign size={20} color="#64748b" />
            <TextInput
              style={styles.amountInputText}
              placeholder="0.00"
              value={topupAmount}
              onChangeText={setTopupAmount}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.quickAmounts}>
          <Text style={styles.inputLabel}>Quick Amounts</Text>
          <View style={styles.quickAmountsContainer}>
            {[10, 25, 50, 100].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={styles.quickAmountButton}
                onPress={() => setTopupAmount(amount.toString())}
              >
                <Text style={styles.quickAmountText}>${amount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.paymentMethodSelection}>
          <Text style={styles.inputLabel}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodOption,
                selectedPaymentMethod.id === method.id && styles.selectedPaymentMethod,
              ]}
              onPress={() => setSelectedPaymentMethod(method)}
            >
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodIcon}>{method.icon}</Text>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                  <Text style={styles.paymentMethodNumber}>{method.details}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedPaymentMethod.id === method.id && styles.radioButtonSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.topupButton} onPress={handleTopup}>
          <Plus size={20} color="#ffffff" />
          <Text style={styles.topupButtonText}>Top Up Wallet</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Transaction History</Text>
      <View style={styles.transactionsContainer}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionIcon}>
              <Text style={styles.transactionEmoji}>
                {getCategoryIcon(transaction.category)}
              </Text>
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>
                {transaction.description}
              </Text>
              <Text style={styles.transactionDate}>
                {new Date(transaction.date).toLocaleString()}
              </Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text
                style={[
                  styles.transactionAmountText,
                  {
                    color: transaction.type === 'credit' ? '#10b981' : '#ef4444',
                  },
                ]}
              >
                {transaction.type === 'credit' ? '+' : '-'}$
                {transaction.amount.toFixed(2)}
              </Text>
              <View
                style={[
                  styles.transactionStatus,
                  { backgroundColor: getStatusColor(transaction.status) },
                ]}
              >
                <Text style={styles.transactionStatusText}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'topup':
        return renderTopup();
      case 'history':
        return renderHistory();
      case 'send':
        return (
          <View style={styles.comingSoon}>
            <Send size={48} color="#64748b" />
            <Text style={styles.comingSoonText}>Send Money</Text>
            <Text style={styles.comingSoonSubtext}>Coming Soon</Text>
          </View>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {[
          { id: 'overview', label: 'Overview', icon: Wallet },
          { id: 'topup', label: 'Top Up', icon: Plus },
          { id: 'send', label: 'Send', icon: Send },
          { id: 'history', label: 'History', icon: History },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <tab.icon
              size={16}
              color={activeTab === tab.id ? '#2563eb' : '#64748b'}
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab.id && styles.activeTabButtonText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  placeholder: {
    width: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  activeTabButton: {
    backgroundColor: '#eff6ff',
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabButtonText: {
    color: '#2563eb',
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  balanceGradient: {
    padding: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  eyeButton: {
    padding: 4,
  },
  walletIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  balanceActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  paymentMethodsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  paymentMethodNumber: {
    fontSize: 14,
    color: '#64748b',
  },
  defaultBadge: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  addPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    gap: 8,
  },
  addPaymentMethodText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2563eb',
  },
  transactionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 18,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748b',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionStatus: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  transactionStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  amountInputContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  amountInputText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  quickAmounts: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickAmountsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  paymentMethodSelection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  paymentMethodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  radioButtonSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#2563eb',
  },
  topupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    gap: 8,
  },
  topupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  comingSoonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  comingSoonSubtext: {
    fontSize: 16,
    color: '#64748b',
  },
  spacer: {
    height: 20,
  },
});