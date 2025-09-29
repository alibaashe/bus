import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Linking,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Star,
  MessageSquare,
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  HelpCircle,
  Shield
} from 'lucide-react-native';

export default function FeedbackScreen() {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'service', label: 'Service Quality', icon: '🚌', color: '#10b981' },
    { id: 'booking', label: 'Booking Process', icon: '📱', color: '#3b82f6' },
    { id: 'payment', label: 'Payment Issues', icon: '💳', color: '#f59e0b' },
    { id: 'driver', label: 'Driver Behavior', icon: '👨‍✈️', color: '#8b5cf6' },
    { id: 'app', label: 'App Experience', icon: '📲', color: '#ef4444' },
    { id: 'emergency', label: 'Emergency Report', icon: '🚨', color: '#dc2626' },
    { id: 'compliment', label: 'Compliment', icon: '👍', color: '#10b981' },
    { id: 'other', label: 'Other', icon: '💬', color: '#64748b' }
  ];

  const quickActions = [
    {
      id: 'call',
      title: 'Call Support',
      subtitle: '+252 636 807 814',
      icon: Phone,
      color: '#10b981',
      action: () => {
        if (Platform.OS !== 'web') {
          Linking.openURL('tel:+252636807814');
        } else {
          Alert.alert('Call Support', 'Please call +252 636 807 814');
        }
      }
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Chat with us',
      icon: MessageCircle,
      color: '#25d366',
      action: () => {
        if (Platform.OS !== 'web') {
          Linking.openURL('whatsapp://send?phone=252636807814');
        } else {
          Alert.alert('WhatsApp', 'Please message us on WhatsApp: +252 636 807 814');
        }
      }
    },
    {
      id: 'email',
      title: 'Email Support',
      subtitle: 'support@sombeder.com',
      icon: Mail,
      color: '#3b82f6',
      action: () => {
        if (Platform.OS !== 'web') {
          Linking.openURL('mailto:support@sombeder.com');
        } else {
          Alert.alert('Email Support', 'Please email us at support@sombeder.com');
        }
      }
    }
  ];

  const faqItems = [
    {
      question: 'How do I cancel a booking?',
      answer: 'You can cancel your booking from the tracking screen before the driver arrives. Cancellation fees may apply based on timing.'
    },
    {
      question: 'How are fares calculated?',
      answer: 'Fares are calculated based on distance, time, service type, and current demand. You can see the estimated fare before booking.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept cash, EVC Plus, Zaad Service, Sahal, and international credit/debit cards.'
    },
    {
      question: 'How do I track my delivery?',
      answer: 'Use the tracking ID provided after booking to track your delivery in real-time through the app.'
    },
    {
      question: 'What if my driver is late?',
      answer: 'If your driver is more than 10 minutes late, you can cancel without penalty or contact support for assistance.'
    },
    {
      question: 'How do I report a lost item?',
      answer: 'Contact support immediately with your trip details. We will help you connect with the driver to recover your item.'
    }
  ];

  const handleSubmitFeedback = () => {
    if (selectedCategory !== 'emergency' && rating === 0) {
      Alert.alert('Error', 'Please provide a rating');
      return;
    }
    if (!feedback.trim()) {
      Alert.alert('Error', selectedCategory === 'emergency' ? 'Please describe the emergency' : 'Please write your feedback');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    const isEmergency = selectedCategory === 'emergency';
    const title = isEmergency ? 'Emergency Reported' : 'Thank You!';
    const message = isEmergency 
      ? 'Your emergency report has been submitted. Our support team will contact you immediately.'
      : 'Your feedback has been submitted successfully. We appreciate your input!';

    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            setRating(0);
            setFeedback('');
            setSelectedCategory('');
          }
        }
      ]
    );

    // For emergency reports, also show immediate contact options
    if (isEmergency) {
      setTimeout(() => {
        Alert.alert(
          'Need Immediate Help?',
          'If this is a life-threatening emergency, please call 911 immediately.',
          [
            { 
              text: 'Call 911', 
              onPress: () => {
                if (Platform.OS !== 'web') {
                  Linking.openURL('tel:911');
                } else {
                  Alert.alert('Emergency', 'Please call 911 immediately');
                }
              }
            },
            { 
              text: 'Call Support', 
              onPress: () => {
                if (Platform.OS !== 'web') {
                  Linking.openURL('tel:+252636807814');
                } else {
                  Alert.alert('Call Support', 'Please call +252 636 807 814');
                }
              }
            },
            { text: 'OK', style: 'cancel' }
          ]
        );
      }, 1000);
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Star
              size={32}
              color={star <= rating ? '#f59e0b' : '#d1d5db'}
              fill={star <= rating ? '#f59e0b' : 'transparent'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feedback & Support</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Support</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={action.action}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating Section - Hide for emergency reports */}
        {selectedCategory !== 'emergency' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Rate Your Experience</Text>
              <Text style={styles.sectionSubtitle}>How was your recent trip with Sombeder?</Text>
            </View>
            
            {renderStars()}
            
            {rating > 0 && (
              <Text style={styles.ratingText}>
                {rating === 1 && 'Poor - We can do better'}
                {rating === 2 && 'Fair - Room for improvement'}
                {rating === 3 && 'Good - Meeting expectations'}
                {rating === 4 && 'Very Good - Exceeding expectations'}
                {rating === 5 && 'Excellent - Outstanding service!'}
              </Text>
            )}
          </View>
        )}

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected,
                  category.id === 'emergency' && styles.emergencyCard
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryIcon,
                  category.id === 'emergency' && styles.emergencyIcon
                ]}>{category.icon}</Text>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelSelected,
                  category.id === 'emergency' && styles.emergencyLabel
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feedback Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Feedback</Text>
          <View style={styles.textInputContainer}>
            <MessageSquare size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder={selectedCategory === 'emergency' ? 'Describe the emergency situation in detail...' : 'Tell us about your experience...'}
              multiline
              numberOfLines={6}
              value={feedback}
              onChangeText={setFeedback}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              ((selectedCategory !== 'emergency' && !rating) || !feedback.trim() || !selectedCategory) && styles.submitButtonDisabled,
              selectedCategory === 'emergency' && styles.emergencySubmitButton
            ]}
            onPress={handleSubmitFeedback}
            disabled={(selectedCategory !== 'emergency' && !rating) || !feedback.trim() || !selectedCategory}
          >
            <Send size={20} color="#ffffff" />
            <Text style={styles.submitButtonText}>
              {selectedCategory === 'emergency' ? 'Report Emergency' : 'Submit Feedback'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqItems.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <View style={styles.faqHeader}>
                  <HelpCircle size={16} color="#3b82f6" />
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                </View>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Phone size={20} color="#3b82f6" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>24/7 Support Hotline</Text>
                <Text style={styles.contactValue}>+252 636 807 814</Text>
                <Text style={styles.contactHours}>Available 24/7 for emergencies</Text>
              </View>
            </View>
            
            <View style={styles.contactDivider} />
            
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Mail size={20} color="#10b981" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Email Support</Text>
                <Text style={styles.contactValue}>support@sombeder.com</Text>
                <Text style={styles.contactHours}>Response within 2-4 hours</Text>
              </View>
            </View>
            
            <View style={styles.contactDivider} />
            
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <MapPin size={20} color="#f59e0b" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Main Office</Text>
                <Text style={styles.contactValue}>Hargeisa Transportation Hub</Text>
                <Text style={styles.contactHours}>Daily: 5:00 AM - 10:00 PM</Text>
              </View>
            </View>
            
            <View style={styles.contactDivider} />
            
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Shield size={20} color="#8b5cf6" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Safety & Security</Text>
                <Text style={styles.contactValue}>Emergency: 911 | Safety: +252 636 807 815</Text>
                <Text style={styles.contactHours}>Immediate response for safety concerns</Text>
              </View>
            </View>
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
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  emergencyCard: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  emergencyIcon: {
    fontSize: 28,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    textAlign: 'center',
  },
  categoryLabelSelected: {
    color: '#3b82f6',
  },
  emergencyLabel: {
    color: '#dc2626',
    fontWeight: '700',
  },
  textInputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  textInput: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 120,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  emergencySubmitButton: {
    backgroundColor: '#dc2626',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  faqContainer: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  faqAnswer: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 2,
  },
  contactHours: {
    fontSize: 12,
    color: '#64748b',
  },
  contactDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  spacer: {
    height: 20,
  },
});