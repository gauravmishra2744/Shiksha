import { AppSidebar } from "@/components/student/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import ViewNotesContentI18n from "@/components/student/view-notes-page-i18n";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ViewNotesContentI18n />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}