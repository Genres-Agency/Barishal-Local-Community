import LeftSidebar from "@/components/navigation/leftSide/LeftSidebar";
import RightSidebar from "@/components/navigation/rightSide/RightSidebar";
import UserFeed from "@/components/user/UserFeed";
import UserHeader from "@/components/user/UserHeader";

export default function UserPage() {
  return (
    <div className="relative z-40 mt-16 lg:mt-20">
      {/* User Header ----------------- */}
      <UserHeader />
      {/* Main Content Container */}
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Left Sidebar */}
          <aside className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)] w-full md:w-64 lg:w-72 overflow-y-auto hidden md:block">
            <LeftSidebar />
          </aside>

          {/* Main Feed Section */}
          <main className="flex-1 py-6 min-h-[calc(100vh-4.5rem)] w-full">
            <UserFeed />
          </main>

          {/* Right Sidebar */}
          <aside className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)] w-full lg:w-80 overflow-y-auto overflow-x-hidden hidden lg:block">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
