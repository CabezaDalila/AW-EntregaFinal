import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { questions, Question } from './quizData';

@Component({
  selector: 'app-investment-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-quiz.component.html',
  styleUrls: ['./investment-quiz.component.scss'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class InvestmentQuizComponent implements OnInit {
  allQuestions: Question[] = questions;
  quizQuestions: Question[] = [];
  currentQuestion = 0;
  selectedAnswer: number | null = null;
  score = 0;
  quizCompleted = false;
  userAnswers: number[] = [];

  ngOnInit() {
    this.initializeQuiz();
  }

  initializeQuiz() {
    this.quizQuestions = this.getRandomQuestions(5);
    this.currentQuestion = 0;
    this.selectedAnswer = null;
    this.score = 0;
    this.quizCompleted = false;
    this.userAnswers = new Array(this.quizQuestions.length).fill(null);
  }

  getRandomQuestions(count: number): Question[] {
    const shuffled = [...this.allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  handleAnswerSelection(answerIndex: number): void {
    this.selectedAnswer = answerIndex;
    this.userAnswers[this.currentQuestion] = answerIndex;
  }

  handleNextQuestion(): void {
    if (this.selectedAnswer === this.quizQuestions[this.currentQuestion].correctAnswer) {
      this.score++;
    }

    if (this.currentQuestion + 1 < this.quizQuestions.length) {
      this.currentQuestion++;
      this.selectedAnswer = this.userAnswers[this.currentQuestion];
    } else {
      this.quizCompleted = true;
    }
  }

  resetQuiz(): void {
    this.initializeQuiz();
  }

  getProgressPercentage(): number {
    return ((this.currentQuestion + 1) / this.quizQuestions.length) * 100;
  }

  getResultMessage(): string {
    const percentage = (this.score / this.quizQuestions.length) * 100;
    if (percentage === 100) return '¡Excelente! Dominas los conceptos de inversión.';
    if (percentage >= 80) return '¡Muy bien! Tienes un gran conocimiento.';
    if (percentage >= 60) return 'Buen trabajo. Continúa aprendiendo.';
    return 'Sigue practicando con MockVest para mejorar tus conocimientos.';
  }
}