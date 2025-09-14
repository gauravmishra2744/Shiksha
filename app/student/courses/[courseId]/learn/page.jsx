import CourseLearningPage from "@/components/student/course-learning-page-i18n";

export default function Page({ params }) {
  return <CourseLearningPage courseId={params.courseId} />;
}