import { AppSidebar } from "@/components/student/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
<<<<<<< HEAD
import CourseDetailPage from "@/components/student/course-detail-page-i18n";
=======
import CourseDetailPage from "@/components/student/i18n/course-detail-page-i18n";
>>>>>>> b2b3c29f42ddef3681cb230851fbc71ad5fd5e1f
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page({ params }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <CourseDetailPage courseId={params.courseId} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}