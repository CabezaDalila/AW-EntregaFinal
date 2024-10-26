import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-featureCards',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./featureCards.component.html',
  styles: [`
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');
  `],
  animations: [
    trigger('fadeInOut', [
      state('inactive', style({
        opacity: 0.7
      })),
      state('active', style({
        opacity: 1,
        transform: 'scale(1.05)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class FeatureCards implements OnInit {
  services: (Service & { state: string })[] = [
    {
      title: 'Aprende Invirtiendo',
      description: 'Practica con dinero virtual y aprende los fundamentos de la inversión sin riesgos.',
      icon: 'fas fa-graduation-cap',
      state: 'inactive'
    },
    {
      title: 'Simulaciones de Mercado',
      description: 'Experimenta con simulaciones realistas del mercado bursátil y toma decisiones informadas.',
      icon: 'fas fa-chart-line',
      state: 'inactive'
    },
    {
      title: 'Comunidad de Inversores',
      description: 'Conecta con otros inversores jóvenes, comparte estrategias y aprende de los expertos.',
      icon: 'fas fa-users',
      state: 'inactive'
    },
    {
      title: 'Análisis Personalizado',
      description: 'Recibe análisis detallados de tu portafolio y recomendaciones personalizadas.',
      icon: 'fas fa-analytics',
      state: 'inactive'
    },
    {
      title: 'Retos y Competencias',
      description: 'Participa en desafíos de inversión y compite con otros usuarios para ganar premios.',
      icon: 'fas fa-trophy',
      state: 'inactive'
    },
    {
      title: 'Educación Financiera',
      description: 'Accede a cursos y recursos educativos para mejorar tu conocimiento financiero.',
      icon: 'fas fa-book-open',
      state: 'inactive'
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.services.forEach((service, index) => {
        setTimeout(() => {
          service.state = 'active';
        }, index * 200);
      });
    }, 500);
  }

  onMouseEnter(index: number) {
    this.services[index].state = 'active';
  }

  onMouseLeave(index: number) {
    this.services[index].state = 'inactive';
  }
}