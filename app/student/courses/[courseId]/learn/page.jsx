<<<<<<< HEAD
import CourseLearningPage from "@/components/student/course-learning-page-i18n";
=======
import CourseLearningPage from "@/components/student/i18n/course-learning-page-i18n";
>>>>>>> b2b3c29f42ddef3681cb230851fbc71ad5fd5e1f

export default function Page({ params }) {
  return <CourseLearningPage courseId={params.courseId} />;
}