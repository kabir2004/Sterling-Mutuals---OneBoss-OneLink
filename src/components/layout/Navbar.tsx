
import React from 'react';
import { Bell, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Attestations } from '@/components/Attestations';
import { InterfaceSwitcher } from '@/components/InterfaceSwitcher';
import { useInterface } from '@/context/InterfaceContext';
import { getInterfaceDisplayName } from '@/components/InterfaceSwitcher';

interface NavbarProps {
  className?: string;
  onMenuClick?: () => void;
}

export function Navbar({ className, onMenuClick }: NavbarProps) {
  const { isIntermediaryInterface, currentInterface } = useInterface();
  
  return (
    <header className={cn("bg-white z-30", className)}>
      <div className="w-full flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          {!isIntermediaryInterface && <SidebarTrigger />}
          {isIntermediaryInterface && (
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-gray-900 leading-tight">OneLink</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600 leading-tight">Welcome Back, Nelson</p>
                <span className="text-xs text-gray-400">•</span>
                <p className="text-sm text-blue-600 leading-tight font-medium">
                  {getInterfaceDisplayName(currentInterface)}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-9 w-9 text-gray-600 hover:text-gray-900"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          </Button>
          
          <InterfaceSwitcher />
          
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
