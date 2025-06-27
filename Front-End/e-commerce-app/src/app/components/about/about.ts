import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About {
  teamMembers = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      image: 'assets/images/team/ceo.jpg',
      description: '10+ years of e-commerce experience'
    },
    {
      name: 'Sarah Johnson',
      position: 'CTO',
      image: 'assets/images/team/cto.jpg',
      description: 'Expert in modern web technologies'
    },
    {
      name: 'Michael Brown',
      position: 'Head of Design',
      image: 'assets/images/team/designer.jpg',
      description: 'Creating beautiful user experiences'
    }
  ];

  milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize online shopping'
    },
    {
      year: '2021',
      title: 'First 1000 Customers',
      description: 'Reached our first major milestone'
    },
    {
      year: '2022',
      title: 'Mobile App Launch',
      description: 'Expanded to mobile platforms'
    },
    {
      year: '2023',
      title: 'International Expansion',
      description: 'Started serving customers worldwide'
    }
  ];
} 