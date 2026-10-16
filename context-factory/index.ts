export interface ProjectMember {
  studentNumber: string;
  name: string;
}

export interface ProjectMetadata {
  title: string;
  shortName: string;
  subjectSection: string;
  semester: string;
  schoolYear: string;
  schedule: string;
  members: ProjectMember[];
  featureModules: {
    id: number;
    title: string;
    subFeatures: string[];
  }[];
}

export const CLEMORA_PROJECT_METADATA: ProjectMetadata = {
  title: 'Clemora: An AI-Integrated Event Planning and Resource Management Platform with Automated Customer Assistance',
  shortName: 'Clemora',
  subjectSection: 'CAP101 - SBIT4P',
  semester: '1st Semester',
  schoolYear: '2026-2027',
  schedule: 'Tuesday 6:00 PM - 9:00 PM',
  members: [
    { studentNumber: '23-1757', name: 'Agustin III, Ernesto' },
    { studentNumber: '23-1781', name: 'Almase, Jester Ace' },
    { studentNumber: '23-2239', name: 'Banalan, Johaina' },
    { studentNumber: '23-2732', name: 'Dayrit, Marvin' },
    { studentNumber: '23-2321', name: 'Lubong, Jun Martin' },
    { studentNumber: '23-1780', name: 'Magundayao, Prince Enzo' },
    { studentNumber: '23-1857', name: 'Matias, Dominiq James' },
    { studentNumber: '23-1765', name: 'Mercado, Lhoreese Aaliyah' },
    { studentNumber: '23-1967', name: 'Nacion, Lorraine Heart' },
    { studentNumber: '23-1853', name: 'Pitel, John Kenneth' },
    { studentNumber: '23-1854', name: 'Ulgasan, Xeroj' },
  ],
  featureModules: [
    {
      id: 1,
      title: 'User and Access Management',
      subFeatures: [
        'User Registration and Login',
        'Role-Based Access Control',
        'User Profile Management',
        'Staff Management',
        'Staff Skills and Availability Management',
      ],
    },
    {
      id: 2,
      title: 'Customer-Facing Features',
      subFeatures: [
        'Event Package Listing',
        'Package Customization',
        'AI Customer Inquiry Chatbot',
        'Quotation Requests',
        'Event Booking and Appointment Scheduling',
        'Booking Status Tracking',
        'Customer Email Notifications',
        'Customer-to-Manager Chat Handover',
        'Past Events Showcase',
        'Customer Ratings and Feedback for Completed Bookings',
      ],
    },
    {
      id: 3,
      title: 'Package and Quotation Management',
      subFeatures: [
        'Event Package Management',
        'Menu and Service Management',
        'Pricing and Add-On Management',
        'Quotation Management and Generation',
        'Quotation Status Tracking',
      ],
    },
    {
      id: 4,
      title: 'Booking and Scheduling Management',
      subFeatures: [
        'Booking Management',
        'Event Calendar Management',
        'Event Scheduling and Rescheduling',
        'Scheduling Conflict Detection',
        'Staff Scheduling and Assignment',
        'Equipment and Resource Scheduling',
        'Preparation, Transportation, and Turnaround Time Management',
        'Booking Cancellation Management',
      ],
    },
    {
      id: 5,
      title: 'Resource and Inventory Management',
      subFeatures: [
        'Equipment and Resource Inventory',
        'Resource Availability and Allocation Tracking',
        'Equipment Dispatch and Return Tracking',
        'Consumable Inventory Management',
        'Resource Utilization Monitoring',
      ],
    },
    {
      id: 6,
      title: 'AI-Assisted Planning and Resource Allocation',
      subFeatures: [
        'AI-Powered Package Recommendations',
        'AI-Assisted Staff Recommendations',
        'AI-to-Manager Conversation Handover',
      ],
    },
    {
      id: 7,
      title: 'Event Operations Management',
      subFeatures: [
        'Event Preparation and Task Tracking',
        'Live Event Monitoring',
        'Event Timeline and Delay Tracking',
        'Incident Reporting and Resolution Tracking',
        'Automated Event Report Generation',
      ],
    },
    {
      id: 8,
      title: 'Notifications and Announcements',
      subFeatures: [
        'Staff Email Notifications',
        'Booking, Schedule, and Event Assignment Notifications',
        'Company Announcements and Updates',
        'Notification Delivery Tracking',
      ],
    },
    {
      id: 9,
      title: 'Reporting and Performance Monitoring',
      subFeatures: [
        'Administrative Dashboard',
        'Staff Performance Metrics',
        'Coordinator Performance Reports',
        'Booking and Quotation Report',
        'Event Completion and Incident Reports',
        'Resource Utilization Reports',
        'Customer Ratings and Feedback Reports',
      ],
    },
    {
      id: 10,
      title: 'Past Events Management',
      subFeatures: [
        'Past Event Management',
        'Event Photo Gallery and Description Management',
        'Event Showcase Publishing and Unpublishing',
      ],
    },
    {
      id: 11,
      title: 'System Administration',
      subFeatures: [
        'System Configuration Management',
        'AI Knowledge Base Management',
        'AI Conversation Monitoring',
        'User Activity and Audit Logs',
        'Data Access and Security Management',
      ],
    },
  ],
};
