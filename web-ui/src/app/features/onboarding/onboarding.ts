export class OnboardingOrchestrator {

  private _currentQuestion: EOnboardingQuestion;
  private _onboardingStatus: EOnboardingStatus;

  private _currentAge: number;
  private _retirementAge: number;
  private _expectedInvestmentYield: number;
  private _validators: Function[];

  get currentQuestion(): EOnboardingQuestion { return this._currentQuestion; }
  get questionCount(): number { return Object.keys(EOnboardingQuestion).length / 2; }
  get currentAge(): number { return this._currentAge; }
  get retirementAge(): number { return this._retirementAge; }
  get expectedInvestmentYield(): number { return this._expectedInvestmentYield; }
  get completedQuestionCount(): number {
    let count = 0;

    count += this.currentAgeQuestionIsCompleted() ? 1 : 0
    count += this.RetirementAgeQuestionIsCompleted() ? 1 : 0
    count += this.expectedInvestmentYieldQuestionIsCompleted() ? 1 : 0

    return count;
  }
  get percentageCompleted(): number {
    return (this._onboardingStatus >= EOnboardingStatus.Saving) ? 100 : Math.ceil(((this.currentQuestion - 1) / this.questionCount) * 100);
  }
  get answeringQuestions(): boolean {
    return this._onboardingStatus == EOnboardingStatus.AnsweringQuestions;
  }
  get saving(): boolean {
    return this._onboardingStatus == EOnboardingStatus.Saving;
  }
  get completed(): boolean {
    return this._onboardingStatus == EOnboardingStatus.Completed;
  }

  constructor() {
    this._onboardingStatus = EOnboardingStatus.AnsweringQuestions;
    this._currentQuestion = 1;

    this._currentAge = 18;
    this._retirementAge = 65;
    this._expectedInvestmentYield = 8;
  }

  setCurrentAge(age: number): void {
    this._currentAge = age;
  }

  setRetirementAge(age: number): void {
    this._retirementAge = age;
  }

  setExpectedInvestmentYield(investmentYield: number): void {
    this._expectedInvestmentYield = investmentYield;
  }

  currentAgeQuestionIsCompleted(): boolean {
    return !!this.currentAge;
  }

  RetirementAgeQuestionIsCompleted(): boolean {
    return !!this.retirementAge;
  }

  expectedInvestmentYieldQuestionIsCompleted(): boolean {
    return !!this.expectedInvestmentYield;
  }

  next(): void {
    if (!this.canGoNext || this.completed) return;

    if (this.currentQuestion < this.questionCount)
      this._currentQuestion++;
  }

  back(): void {
    if (this.currentQuestion == 1) return;
    this._currentQuestion--;
  }

  complete(): Promise<void> {
    this._onboardingStatus = EOnboardingStatus.Saving;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        this._onboardingStatus = EOnboardingStatus.Completed;
      }, 2000);
    })
  }

  get canGoNext(): boolean {
    switch (this.currentQuestion) {
      case EOnboardingQuestion.CurrentAge:
        return this.currentAgeQuestionIsCompleted();
      case EOnboardingQuestion.RetirementAge:
        return this.RetirementAgeQuestionIsCompleted();
      case EOnboardingQuestion.ExpectedInvestmentYield:
        return this.expectedInvestmentYieldQuestionIsCompleted();
      default:
        true;
    }
  }

  get canComplete(): boolean {
    return this.completedQuestionCount == this.questionCount;
  }
}

export enum EOnboardingQuestion {
  CurrentAge = 1,
  RetirementAge,
  ExpectedInvestmentYield
}

export enum EOnboardingStatus {
  AnsweringQuestions = 1,
  Saving,
  Completed
}
