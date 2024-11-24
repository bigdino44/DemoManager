import { create } from 'zustand';
import { format } from 'date-fns';
import { useCustomerStore } from './customerStore';

export type DemoLocationType = 'Virtual' | 'Nexus' | 'On-site' | 'On-location';

export interface Demo {
  id: string;
  time: string;
  company: string;
  type: string;
  location: DemoLocationType;
  locationDetails?: string;
  attendees: number;
  date: Date;
  customerId: string;
}

interface DemoStore {
  demos: Demo[];
  selectedDate: Date;
  selectedDemoId: string | null;
  addDemo: (demo: Omit<Demo, 'id'>) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedDemoId: (id: string | null) => void;
  getDemosForDate: (date: Date) => Demo[];
}

export const useDemoStore = create<DemoStore>((set, get) => ({
  demos: [
    {
      id: '1',
      time: "10:00 AM",
      company: "TechCorp Industries",
      type: "Product Demo",
      location: "Virtual",
      attendees: 4,
      date: new Date(),
      customerId: '1'
    },
    {
      id: '2',
      time: "2:00 PM",
      company: "Global Solutions Ltd",
      type: "Technical Deep Dive",
      location: "Nexus",
      locationDetails: "Atlanta Innovation Hub",
      attendees: 6,
      date: new Date(),
      customerId: '2'
    }
  ],
  selectedDate: new Date(),
  selectedDemoId: null,
  
  addDemo: (demo) => set((state) => ({
    demos: [...state.demos, { ...demo, id: Math.random().toString(36).substr(2, 9) }]
  })),
  
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  setSelectedDemoId: (id) => {
    set({ selectedDemoId: id });
    
    if (!id) {
      useCustomerStore.getState().setSelectedCustomer(null);
      return;
    }
    
    const demo = get().demos.find(d => d.id === id);
    if (demo) {
      const customer = useCustomerStore.getState().customers.find(c => c.id === demo.customerId);
      useCustomerStore.getState().setSelectedCustomer(customer || null);
    }
  },
  
  getDemosForDate: (date) => {
    const { demos } = get();
    return demos.filter(demo => 
      format(demo.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  }
}));