
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useInterface } from '@/context/InterfaceContext';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  // All interfaces use the same layout with sidebar (like advisor)
  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarNavigation />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="container max-w-full px-3 lg:px-4 pb-3 lg:pb-4 pt-6 animate-fade-in">
            {title && <h1 className="text-2xl font-bold mb-6 text-gray-900">{title}</h1>}
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
