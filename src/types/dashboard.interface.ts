import { UserRole } from '@/lib/auth-utils';

export interface NavItem {
  title: string;
  href: string;
  icon: string; // changed from lucid icon to string
  badge?: string | number;
  description?: string;
  roles: UserRole[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
