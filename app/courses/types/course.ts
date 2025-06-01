export interface Lesson {
  id: number;
  title: string;
  content?: string;
  type: 'video' | 'text' | 'code' | 'quiz';
  description?: string;
  duration: string;
  images?: string[];
  videoUrl?: string;
  quizId?: string;
  completed: boolean;
}

export interface Module { 
  id: number;
  title: string;
  lessons: Lesson[]; 
}

export interface Course {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  modules: Module[];
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  category: 'Frontend' | 'Backend' | 'Fullstack';
  color: string;
  image: string;
  apercu: string
}
