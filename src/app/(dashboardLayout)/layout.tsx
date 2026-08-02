import React from 'react';

import DashboardNavbar from '@/components/modules/Dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/modules/Dashboard/DashboardSidebar';

const CommonDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardNavbar />
        <main>
          <div>Dashboard Content</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
