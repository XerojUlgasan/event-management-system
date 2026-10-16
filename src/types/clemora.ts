export type UserRole = 'administrator' | 'coordinator' | 'staff' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  company?: string;
  password?: string;
  avatar?: string;
  assignedStaffId?: string;
  createdAt: string;
}

export type EventCategory = 'wedding' | 'corporate' | 'private' | 'celebration' | 'gala';

export interface MenuItem {
  id: string;
  name: string;
  course: 'canapes' | 'starter' | 'main' | 'dessert' | 'beverage';
  description: string;
  dietary: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Halal' | 'Nut-Free')[];
  premiumSurcharge?: number;
}

export interface EventPackage {
  id: string;
  name: string;
  tagline: string;
  category: EventCategory;
  pricePerGuest: number;
  minimumGuests: number;
  description: string;
  inclusions: string[];
  courseHighlights: string[];
  imageUrl: string;
  prepDurationHours: number;
  isPublished: boolean;
  featured?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  category: 'bar' | 'decor' | 'entertainment' | 'equipment' | 'service';
  price: number;
  pricingType: 'flat' | 'per_guest';
  description: string;
  requiresSpecialStaff?: boolean;
  requiredStaffRole?: string;
}

export type QuotationStatus = 'draft' | 'pending' | 'sent' | 'accepted' | 'rejected' | 'expired';

export interface QuotationItem {
  id: string;
  description: string;
  unitPrice: number;
  quantity: number;
  total: number;
  category: 'package' | 'addon' | 'service' | 'custom';
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  venueName: string;
  venueAddress: string;
  packageId: string;
  packageName: string;
  items: QuotationItem[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  serviceCharge: number;
  taxAmount: number;
  totalAmount: number;
  depositRequired: number;
  status: QuotationStatus;
  notes?: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
}

export type BookingStatus =
  | 'inquiry'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'in_progress'
  | 'delayed'
  | 'completed'
  | 'cancelled';

export interface TurnaroundTimeline {
  warehouseDispatchMinutes: number; // 60-90
  transitToVenueMinutes: number;    // 30-60
  onSiteSetupMinutes: number;       // 120-180
  eventExecutionMinutes: number;    // 240-360
  teardownMinutes: number;          // 60-90
  returnTransitMinutes: number;     // 30-60
  warewashSanitizeMinutes: number;  // 120-180 (Protected Buffer)
}

export interface Booking {
  id: string;
  bookingRef: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventTitle: string;
  eventType: EventCategory;
  eventDate: string;        // YYYY-MM-DD
  eventStartTime: string;   // HH:mm
  eventEndTime: string;     // HH:mm
  venueName: string;
  venueAddress: string;
  guestCount: number;
  packageId: string;
  packageName: string;
  selectedAddOns: string[];
  totalAmount: number;
  depositPaid: number;
  status: BookingStatus;
  turnaround: TurnaroundTimeline;
  assignedStaffIds: string[];
  allocatedEquipmentIds: string[];
  cancellationReason?: string;
  notes?: string;
  createdAt: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Executive Chef' | 'Lead Maitre d\'' | 'Sommelier' | 'Mixologist' | 'Event Coordinator' | 'Logistics Lead' | 'Service Captain';
  skills: string[];
  availableDays: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  rating: number;
  activeEventsCount: number;
  status: 'active' | 'on_leave' | 'standby';
}

export interface EquipmentItem {
  id: string;
  code: string;
  name: string;
  category: 'chafers' | 'furniture' | 'glassware' | 'linens' | 'sound_lighting' | 'bar_station';
  totalQuantity: number;
  allocatedQuantity: number;
  inRepairQuantity: number;
  unit: string;
  condition: 'Pristine' | 'Good' | 'Fair';
  location: string;
}

export interface ConsumableItem {
  id: string;
  name: string;
  category: 'beverages' | 'pantry' | 'garnishes' | 'disposables' | 'cleaning';
  currentStock: number;
  minimumThreshold: number;
  unit: string;
  costPerUnit: number;
  lastRestocked: string;
}

export interface DispatchLog {
  id: string;
  bookingId: string;
  eventTitle: string;
  itemId: string;
  itemName: string;
  quantity: number;
  dispatchedAt: string;
  dispatchedBy: string;
  returnedAt?: string;
  returnedBy?: string;
  conditionOnReturn?: 'Pristine' | 'Good' | 'Damaged' | 'Missing';
}

export interface EventTask {
  id: string;
  bookingId: string;
  title: string;
  category: 'warehouse' | 'culinary' | 'setup' | 'hospitality' | 'teardown';
  assignedToStaffId?: string;
  assignedToName?: string;
  dueDate: string;
  dueTime: string;
  completed: boolean;
  completedAt?: string;
}

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface EventIncident {
  id: string;
  bookingId: string;
  eventTitle: string;
  reportedBy: string;
  severity: IncidentSeverity;
  title: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface SystemNotification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  category: 'shift' | 'booking' | 'quote' | 'inventory' | 'incident' | 'announcement';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'normal' | 'important' | 'urgent';
  author: string;
  date: string;
}

export interface CustomerReview {
  id: string;
  bookingId: string;
  customerName: string;
  eventName: string;
  eventDate: string;
  rating: number; // 1-5
  comment: string;
  foodRating: number;
  serviceRating: number;
  coordinationRating: number;
  createdAt: string;
  isPublished: boolean;
}

export interface PastEventShowcase {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  venue: string;
  guestCount: number;
  description: string;
  menuHighlights: string[];
  imageUrl: string;
  isPublished: boolean;
  clientConsentApproved: boolean;
}

export interface KnowledgeBaseArticle {
  id: string;
  category: 'packages' | 'menus' | 'pricing' | 'policies' | 'turnaround_buffer' | 'faq';
  question: string;
  answer: string;
  tags: string[];
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'coordinator';
  text: string;
  timestamp: string;
  recommendedPackageId?: string;
  isHandoverTrigger?: boolean;
}

export interface HandoverRecord {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  summary: string;
  status: 'pending' | 'in_progress' | 'completed';
  conversationSnippet: { sender: string; text: string; timestamp: string }[];
  requestedAt: string;
  assignedCoordinator?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  role: string;
  action: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'failed';
}

export interface SystemSettings {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  defaultTaxRate: number;      // e.g. 12%
  defaultServiceCharge: number;// e.g. 10%
  requiredDepositPercent: number; // e.g. 30%
  autoDetectConflicts: boolean;
  bufferMultiplier: number;    // 1.0 = standard buffer
  allowOvertimeBuffer: boolean;
}
