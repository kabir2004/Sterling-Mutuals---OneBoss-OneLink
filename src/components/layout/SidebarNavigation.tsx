import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  BriefcaseBusiness,
  ShieldCheck,
  History,
  Settings,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CLIENTS } from '@/pages/Clients';
import { getInterfaceDisplayName } from '@/components/InterfaceSwitcher';
import { useInterface } from '@/context/InterfaceContext';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    title: 'Clients',
    icon: Users,
    path: '/clients',
  },
  {
    title: 'Plans',
    icon: FileText,
    path: '/plans',
  },
  {
    title: 'Accounts & Trades',
    icon: BriefcaseBusiness,
    path: '/accounts-trades',
  },
  {
    title: 'Compliance',
    icon: ShieldCheck,
    path: '/compliance',
  },
  {
    title: 'Audit Log',
    icon: History,
    path: '/audit-log',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];

export function SidebarNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClientsExpanded, setIsClientsExpanded] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const { currentInterface } = useInterface();

  // Helper function to parse name into first and last name
  const parseName = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: '' };
    }
    const lastName = parts[parts.length - 1];
    const firstName = parts.slice(0, -1).join(' ');
    return { firstName, lastName };
  };

  const handleClientClick = (clientId: string) => {
    setSelectedClientId(clientId);
    navigate('/clients', { state: { selectedClientId: clientId } });
  };

  return (
    <Sidebar collapsible="icon" variant="inset" className="bg-white [&>div>div]:!border-0 [&>div>div>div]:!border-0">
      <SidebarHeader className="bg-white !border-0 pb-0">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <h2 className="text-base font-semibold text-gray-900 leading-tight">OneBoss</h2>
            <p className="text-xs text-gray-600 leading-tight">Welcome Back, Nelson</p>
            <p className="text-xs text-blue-600 leading-tight mt-1 font-medium">
              {getInterfaceDisplayName(currentInterface)}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                const isClients = item.path === '/clients';
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <div>
                      <SidebarMenuButton
                        onClick={() => {
                          if (isClients) {
                            setIsClientsExpanded(!isClientsExpanded);
                            navigate(item.path);
                          } else {
                            navigate(item.path);
                          }
                        }}
                        isActive={isActive}
                        tooltip={{
                          children: item.title,
                          side: "right",
                          align: "center",
                        }}
                        className="mx-2 data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900 hover:bg-gray-50 text-gray-700 border-0"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{item.title}</span>
                        {isClients && (
                          <span className="ml-auto group-data-[collapsible=icon]:hidden">
                            {isClientsExpanded ? (
                              <ChevronUp className="h-3 w-3" />
                            ) : (
                              <ChevronDown className="h-3 w-3" />
                            )}
                          </span>
                        )}
                      </SidebarMenuButton>
                      
                      {isClients && isClientsExpanded && (
                        <div className="mx-2 mt-1 space-y-1 group-data-[collapsible=icon]:hidden">
                          <div className="space-y-1.5 px-1">
                            <Button
                              size="sm"
                              onClick={() => navigate('/clients')}
                              className="w-full h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Plus className="h-3 w-3 mr-1.5" />
                              Add Clients
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full h-7 text-xs"
                            >
                              <Search className="h-3 w-3 mr-1.5" />
                              Advanced Search
                            </Button>
                          </div>
                          <ScrollArea className="h-[200px] mt-1.5">
                            <div className="space-y-0.5 px-1">
                              {CLIENTS.slice(0, 10).map((client) => {
                                const { firstName, lastName } = parseName(client.name);
                                const isSelected = selectedClientId === client.id;
                                return (
                                  <div
                                    key={client.id}
                                    onClick={() => handleClientClick(client.id)}
                                    className={`flex items-center justify-between p-1.5 rounded text-xs cursor-pointer transition-colors ${
                                      isSelected
                                        ? 'bg-gray-100'
                                        : 'hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className="flex-1 min-w-0 truncate text-gray-900">
                                      {lastName}, {firstName}
                                    </div>
                                    <div className="ml-1.5 flex-shrink-0">
                                      <div className={`h-1.5 w-1.5 rounded-full ${
                                        client.status === 'Active' ? 'bg-green-500' :
                                        client.status === 'Inactive' ? 'bg-gray-400' :
                                        'bg-yellow-500'
                                      }`} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

