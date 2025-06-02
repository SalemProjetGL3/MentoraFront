export interface Answer {
    _id: string
    text: string
    isCorrect: boolean
  }
  
export interface Question {
    _id: string
    text: string
    type: 'single-choice' | 'multiple-choice' | 'true-false'
    answers: Answer[]
    tags?: string[]
}
  
export interface Quiz {
    _id: string
    title: string
    description?: string
    questionIds: Question[]
}
  
export interface QuizSubmission {
    quizId: string
    score: number
    totalQuestions: number
    detailedResults: {
      questionId: string
      selectedAnswerIds: string[]
      correctAnswerIds: string[]
      isCorrect: boolean
      message?: string
    }[]
}