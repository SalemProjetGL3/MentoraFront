export interface CourseProgress{
    userId: string;
    courseId: string;
    completedModules: string[];
    completedLessons: string[];
    completedAssessments: string[];
    progressRate: number; // 0-100
    startedAt: Date;
}