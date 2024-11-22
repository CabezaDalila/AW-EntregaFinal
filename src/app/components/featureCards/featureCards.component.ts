import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featureCards.component.html',
  styleUrls: ['./featureCards.component.scss'],
  animations: [
    trigger('cardAnimation', [
      state('initial', style({
        transform: 'translateX(0) rotateY(0)',
        zIndex: 1,
        filter: 'brightness(0.9)'
      })),
      state('hovered', style({
        transform: 'translateY(-20px) translateX(75px) rotateY(-15deg)',
        zIndex: 10,
        filter: 'brightness(1)'
      })),
      transition('initial <=> hovered', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class FeatureCards implements OnInit {
  services: (Service & { state: string })[] = [
    {
      title: 'Aprende Invirtiendo',
      description: 'Practica con dinero virtual y aprende los fundamentos de la inversión sin riesgos.',
      icon: 'fas fa-graduation-cap',
      state: 'initial'
    },
    {
      title: 'Simulaciones de Mercado',
      description: 'Experimenta con simulaciones realistas del mercado bursátil y toma decisiones informadas.',
      icon: 'fas fa-chart-line',
      state: 'initial'
    },
    {
      title: 'Comunidad de Inversores',
      description: 'Conecta con otros inversores jóvenes, comparte estrategias y aprende de los expertos.',
      icon: 'fas fa-users',
      state: 'initial'
    },
    {
      title: 'Análisis Personalizado',
      description: 'Recibe análisis detallados de tu portafolio y recomendaciones personalizadas.',
      icon: 'fas fa-chart-bar',
      state: 'initial'
    },
    {
      title: 'Retos y Competencias',
      description: 'Participa en desafíos de inversión y compite con otros usuarios para ganar premios.',
      icon: 'fas fa-trophy',
      state: 'initial'
    },
    {
      title: 'Educación Financiera',
      description: 'Accede a cursos y recursos educativos para mejorar tu conocimiento financiero.',
      icon: 'fas fa-book-open',
      state: 'initial'
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.services.forEach((service, index) => {
        setTimeout(() => {
          service.state = 'initial';
        }, index * 200);
      });
    }, 500);
  }

  onMouseEnter(index: number) {
    this.services[index].state = 'hovered';
  }

  onMouseLeave(index: number) {
    this.services[index].state = 'initial';
  }
}