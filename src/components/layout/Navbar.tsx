
import React from 'react';
import { Bell, User, Mail, ShoppingCart as ShoppingCartIcon, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Attestations } from '@/components/Attestations';
import { InterfaceSwitcher } from '@/components/InterfaceSwitcher';
import { ShoppingCart } from '@/components/ShoppingCart';
import { useMenuVisibility } from '@/context/MenuVisibilityContext';

interface NavbarProps {
  className?: string;
  onMenuClick?: () => void;
}

export function Navbar({ className, onMenuClick }: NavbarProps) {
  const { isMenuHidden, toggleMenuVisibility } = useMenuVisibility();
  
  return (
    <header className={cn("bg-white z-30", className)}>
      <div className="w-full flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <InterfaceSwitcher />
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-gray-600 hover:text-gray-900"
            onClick={toggleMenuVisibility}
            title={isMenuHidden ? "Show all menu items" : "Hide menu items (except Dashboard, Clients, Trust Deposits)"}
          >
            {isMenuHidden ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
          
          <ShoppingCart>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-9 w-9 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </Button>
          </ShoppingCart>
          
          <Attestations>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-9 w-9 text-gray-600 hover:text-gray-900"
            >
              <Mail className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            </Button>
          </Attestations>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-9 w-9 text-gray-600 hover:text-gray-900"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          </Button>
          
          <Avatar className="h-9 w-9 transition-transform duration-200 hover:scale-105">
            <AvatarFallback className="bg-gray-100 text-gray-900">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
