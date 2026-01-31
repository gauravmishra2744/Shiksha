import { AppSidebar } from "@/components/student/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import SingleSubjectDataPage from "@/components/student/single-subject-page";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function Page({ params }) {
  const { subject } = await params;
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <SingleSubjectDataPage subjectParam={subject} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}