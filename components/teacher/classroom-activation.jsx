"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { classroomAPI } from "@/lib/classroom-api";
import { Power, PowerOff } from "lucide-react";

const ClassroomActivation = ({ classroom, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const result = classroom.isActive 
        ? await classroomAPI.deactivate(classroom.id)
        : await classroomAPI.activate(classroom.id);
      
      onUpdate(result.classroom);
    } catch (error) {
      console.error('Failed to toggle classroom:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Badge variant={classroom.isActive ? "default" : "secondary"}>
        {classroom.isActive ? "Active" : "Inactive"}
      </Badge>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={classroom.isActive}
          onCheckedChange={handleToggle}
          disabled={isLoading}
        />
        {classroom.isActive ? (
          <Power className="h-4 w-4 text-green-600" />
        ) : (
          <PowerOff className="h-4 w-4 text-gray-400" />
        )}
      </div>
      
      <Button
        variant={classroom.isActive ? "destructive" : "default"}
        size="sm"
        onClick={handleToggle}
        disabled={isLoading}
      >
        {isLoading ? "..." : classroom.isActive ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
};

export default ClassroomActivation;