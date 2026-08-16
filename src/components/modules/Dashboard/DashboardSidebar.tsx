import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { getNavItemsByRole } from '@/lib/navItems.config';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { NavSection } from '@/types/dashboard.interface';
import { UserInfo } from '@/types/user.interface';
import DashboardSidebarContent from './DashboardSidebarContent';

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItem: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent userInfo={userInfo} navItems={navItem} dashboardHome={dashboardHome} />
  );
};

export default DashboardSidebar;
