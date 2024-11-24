import { create } from 'zustand';

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  influence: 'Decision Maker' | 'Technical Evaluator' | 'End User' | 'Financial Approver';
  email: string;
  phone?: string;
  notes?: string;
}

export interface CustomerProfile {
  id: string;
  company: string;
  industry: string;
  size: string;
  budget: string;
  website: string;
  status: 'Active' | 'Prospect' | 'Closed Won' | 'Closed Lost';
  painPoints: string[];
  requirements: string[];
  stakeholders: Stakeholder[];
  currentSolution?: string;
  timeline: string;
  notes: string;
  lastContact: Date;
}

interface CustomerStore {
  customers: CustomerProfile[];
  selectedCustomer: CustomerProfile | null;
  setSelectedCustomer: (customer: CustomerProfile | null) => void;
  addCustomer: (customer: Omit<CustomerProfile, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<CustomerProfile>) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [
    {
      id: '1',
      company: 'TechCorp Industries',
      industry: 'Manufacturing',
      size: '1000-5000',
      budget: '$100k-500k',
      website: 'techcorp.com',
      status: 'Active',
      painPoints: [
        'Legacy system integration issues',
        'Scalability challenges',
        'Data security concerns'
      ],
      requirements: [
        'Cloud deployment',
        'Real-time analytics',
        'Mobile access',
        'Enterprise-grade security'
      ],
      stakeholders: [
        {
          id: 's1',
          name: 'John Smith',
          role: 'CTO',
          influence: 'Decision Maker',
          email: 'john.smith@techcorp.com',
          phone: '(555) 123-4567',
          notes: 'Primary technical contact'
        },
        {
          id: 's2',
          name: 'Sarah Johnson',
          role: 'IT Director',
          influence: 'Technical Evaluator',
          email: 'sarah.j@techcorp.com',
          notes: 'Focused on security requirements'
        }
      ],
      currentSolution: 'Legacy on-premise system',
      timeline: 'Q2 2024',
      notes: 'High-priority prospect with immediate needs',
      lastContact: new Date('2024-03-15')
    },
    {
      id: '2',
      company: 'Global Solutions Ltd',
      industry: 'Technology',
      size: '500-1000',
      budget: '$50k-100k',
      website: 'globalsolutions.io',
      status: 'Prospect',
      painPoints: [
        'High operational costs',
        'Manual process inefficiencies',
        'Limited visibility into metrics'
      ],
      requirements: [
        'Cost optimization tools',
        'Process automation',
        'Advanced reporting',
        'Integration capabilities'
      ],
      stakeholders: [
        {
          id: 's3',
          name: 'Michael Chang',
          role: 'COO',
          influence: 'Decision Maker',
          email: 'm.chang@globalsolutions.io',
          phone: '(555) 987-6543',
          notes: 'Interested in operational efficiency gains'
        },
        {
          id: 's4',
          name: 'Emma Wilson',
          role: 'Finance Director',
          influence: 'Financial Approver',
          email: 'e.wilson@globalsolutions.io',
          notes: 'Focused on ROI and cost savings'
        }
      ],
      currentSolution: 'Multiple disconnected tools',
      timeline: 'Q3 2024',
      notes: 'Looking for comprehensive solution to replace current tech stack',
      lastContact: new Date('2024-03-10')
    },
    {
      id: '3',
      company: 'Innovate Healthcare',
      industry: 'Healthcare',
      size: '5000+',
      budget: '$500k+',
      website: 'innovatehealth.org',
      status: 'Active',
      painPoints: [
        'Patient data management',
        'Compliance requirements',
        'System interoperability'
      ],
      requirements: [
        'HIPAA compliance',
        'Electronic health records integration',
        'Secure data exchange',
        'Audit trails'
      ],
      stakeholders: [
        {
          id: 's5',
          name: 'Dr. Patricia Lee',
          role: 'Chief Medical Officer',
          influence: 'Decision Maker',
          email: 'p.lee@innovatehealth.org',
          phone: '(555) 234-5678',
          notes: 'Champion for digital transformation'
        },
        {
          id: 's6',
          name: 'Robert Martinez',
          role: 'IT Security Manager',
          influence: 'Technical Evaluator',
          email: 'r.martinez@innovatehealth.org',
          notes: 'Primary security contact'
        }
      ],
      currentSolution: 'Outdated healthcare management system',
      timeline: 'Q4 2024',
      notes: 'Requires extensive security validation',
      lastContact: new Date('2024-03-12')
    },
    {
      id: '4',
      company: 'EcoRetail Group',
      industry: 'Retail',
      size: '1000-5000',
      budget: '$100k-500k',
      website: 'ecoretail.com',
      status: 'Prospect',
      painPoints: [
        'Inventory management',
        'Supply chain visibility',
        'Customer experience'
      ],
      requirements: [
        'Real-time inventory tracking',
        'Predictive analytics',
        'Mobile POS integration',
        'Customer insights'
      ],
      stakeholders: [
        {
          id: 's7',
          name: 'Alice Thompson',
          role: 'Retail Operations Director',
          influence: 'Decision Maker',
          email: 'a.thompson@ecoretail.com',
          phone: '(555) 345-6789',
          notes: 'Interested in store optimization'
        },
        {
          id: 's8',
          name: 'David Chen',
          role: 'Supply Chain Manager',
          influence: 'End User',
          email: 'd.chen@ecoretail.com',
          notes: 'Focus on inventory management'
        }
      ],
      currentSolution: 'Basic retail management system',
      timeline: 'Q3 2024',
      notes: 'Looking to modernize retail operations',
      lastContact: new Date('2024-03-14')
    }
  ],
  selectedCustomer: null,
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  addCustomer: (customer) => set((state) => ({
    customers: [...state.customers, { ...customer, id: Math.random().toString(36).substr(2, 9) }]
  })),
  updateCustomer: (id, updates) => set((state) => ({
    customers: state.customers.map(customer =>
      customer.id === id ? { ...customer, ...updates } : customer
    )
  }))
}));