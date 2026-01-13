import { AppSidebar } from "@/components/student/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import PomodoroPageContentI18n from "@/components/student/pomodoro-page-i18n";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <PomodoroPageContentI18n />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}