import { Component } from '@angular/core';

interface Question {
  description: string;
  answer: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {


  everythingLoaded = false;

  questions: Question[];

  correctAnswers = 0;
  questionsAsked = 1;

  currentQuestion: Question;

  quizFinished = false;


  constructor() {
    this.loadData();
  }

  private loadData() {
    const rawJson = '[{"description":"What is the capital of England: London: 1 / Paris: 2 / Berlin: 3","answer":1},{"description":"Who is the current President of the United States: Clinton: 1 / Trump: 2 / Bush: 3","answer":2},{"description":"How many french hens in the twelve days of christmas: 1: 2: 3:","answer":3}]';
    this.questions = JSON.parse(rawJson);
    this.currentQuestion = this.questions.splice(0, 1)[0];

  }


  // ngOnInit() {
  //   console.log('Home page');
  // }


  next(answer: number) {
    if (answer === this.currentQuestion.answer) {
      this.correctAnswers++;
    }

    if (this.questions.length === 0) {
      this.quizFinished = true;
    } else {
      this.currentQuestion = this.questions.splice(0, 1)[0];
      this.questionsAsked++;
    }
  }

  reset() {
    this.loadData();
  }
}
