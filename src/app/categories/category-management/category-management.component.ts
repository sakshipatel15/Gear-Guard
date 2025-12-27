import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
  id: string;
  name: string;
  subtext: string;
  icon: string;
  iconBg: string; // hex
  iconColor: string; // hex
  responsible: {
    name: string;
    role: string;
    avatar: string; // url or simplified placeholder logic
  };
  company: string;
  status: 'Active' | 'Review' | 'Inactive';
}

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss'
})
export class CategoryManagementComponent {

  categories: Category[] = [
    {
      id: 'cat-1',
      name: 'Electrical Systems',
      subtext: 'High voltage & wiring',
      icon: 'bolt',
      iconBg: '#ffedd5', // Light Orange
      iconColor: '#f97316', // Orange
      responsible: {
        name: 'John Doe',
        role: 'Lead Engineer',
        avatar: 'assets/avatars/john.jpg' // Placeholder, will mock via CSS/Initials if needed or use generic image
      },
      company: 'Spark Industries',
      status: 'Active'
    },
    {
      id: 'cat-2',
      name: 'Hydraulics',
      subtext: 'Pumps & Valves',
      icon: 'water_drop',
      iconBg: '#dbeafe', // Light Blue
      iconColor: '#3b82f6', // Blue
      responsible: {
        name: 'Sarah Smith',
        role: 'Operations Mgr',
        avatar: 'assets/avatars/sarah.jpg'
      },
      company: 'Fluid Dynamics Inc.',
      status: 'Active'
    },
    {
      id: 'cat-3',
      name: 'Safety Equipment',
      subtext: 'PPE & First Aid',
      icon: 'shield', // or local_hospital
      iconBg: '#fee2e2', // Light Red
      iconColor: '#ef4444', // Red
      responsible: {
        name: 'Mike Ross',
        role: 'Safety Officer',
        avatar: 'assets/avatars/mike.jpg'
      },
      company: 'SecureGear',
      status: 'Review'
    },
    {
      id: 'cat-4',
      name: 'Mechanical Parts',
      subtext: 'Gears & Motors',
      icon: 'precision_manufacturing',
      iconBg: '#f3f4f6', // Light Gray
      iconColor: '#4b5563', // Gray
      responsible: {
        name: 'David Chen',
        role: 'Maintenance Lead',
        avatar: 'assets/avatars/david.jpg'
      },
      company: 'MechWorks',
      status: 'Active'
    },
    {
      id: 'cat-5',
      name: 'HVAC',
      subtext: 'Climate Control',
      icon: 'ac_unit', // or air
      iconBg: '#f3e8ff', // Light Purple
      iconColor: '#a855f7', // Purple
      responsible: {
        name: 'Emily White',
        role: 'Facility Mgr',
        avatar: 'assets/avatars/emily.jpg'
      },
      company: 'AirFlow Systems',
      status: 'Inactive'
    }
  ];

  constructor() { }
}
