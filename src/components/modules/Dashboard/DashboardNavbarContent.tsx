'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';
import UserDropdown from './UserDropdown';

const DashboardNavbarContent = () => {
  return (
    <header className="">
      <div className="flex space-x-4 border-b px-4 py-3">
        {/* Search */}
        <div className="h-10 flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex gap-2">
          <Button variant="outline" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
          </Button>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
