import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Link } from "wouter";   // ⬅️ Import Link from wouter
import { 
  BarChart3, 
  Package, 
  Settings, 
  LogOut, 
  Store, 
  User, 
  Shield,
  Receipt,
  History,
  Bell,
  Users,
  BarChart
} from 'lucide-react';

export default function Sidebar({ role, userInfo }) {
  const { logout } = useAuth();

  const roleConfig = {
    shop: {
      icon: Store,
      title: 'Shop Dashboard',
      subtitle: userInfo?.shop?.name || 'Shop Manager',
      navItems: [
        { icon: BarChart3, label: 'Dashboard', path: '/shop' },
        { icon: Package, label: 'Inventory', path: '/shop/inventory' }, // ✅ link to your route
        { icon: BarChart, label: 'Reports', path: '/shop/reports' },
        { icon: Settings, label: 'Settings', path: '/shop/settings' }
      ]
    },
    beneficiary: {
      icon: User,
      title: 'Beneficiary Portal',
      subtitle: userInfo?.name || 'User',
      navItems: [
        { icon: BarChart3, label: 'Dashboard', path: '/beneficiary' },
        { icon: Receipt, label: 'My Allocations', path: '/beneficiary/allocations' },
        { icon: History, label: 'Purchase History', path: '/beneficiary/history' },
        { icon: Bell, label: 'Notifications', path: '/beneficiary/notifications' }
      ]
    },
    admin: {
      icon: Shield,
      title: 'Admin Panel',
      subtitle: 'District Office',
      navItems: [
        { icon: BarChart3, label: 'Dashboard', path: '/admin' },
        { icon: Store, label: 'Manage Shops', path: '/admin/shops' },
        { icon: Users, label: 'Beneficiaries', path: '/admin/beneficiaries' },
        { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' }
      ]
    }
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div className="w-64 bg-card shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{config.title}</h2>
            <p className="text-sm text-muted-foreground">{config.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {config.navItems.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <li key={index}>
                <Link href={item.path}>
                  <a
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      item.active
                        ? 'text-primary bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <ItemIcon className="mr-3 h-4 w-4" />
                    {item.label}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logout}
          data-testid="button-logout"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
