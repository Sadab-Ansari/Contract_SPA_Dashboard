import React from 'react';
import { Card } from '@/components/ui/card';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and application settings
        </p>
      </div>

      {/* Coming Soon Card */}
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <SettingsIcon className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Settings Panel Coming Soon</h2>
          <p className="text-muted-foreground mb-6">
            Customize your ContractsDash experience with personalized settings, 
            security preferences, and notification controls.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-left">
              <User className="h-4 w-4 text-primary" />
              Profile management
            </div>
            <div className="flex items-center gap-2 text-left">
              <Bell className="h-4 w-4 text-warning" />
              Notifications
            </div>
            <div className="flex items-center gap-2 text-left">
              <Shield className="h-4 w-4 text-success" />
              Security settings
            </div>
            <div className="flex items-center gap-2 text-left">
              <Palette className="h-4 w-4 text-accent-foreground" />
              Theme preferences
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;