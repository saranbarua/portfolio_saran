import { LucideIcon } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  downloads: string;
  rating: number;
  image: string;
  color: string;
  tags: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface NavItem {
  label: string;
  id: string;
  icon: LucideIcon;
}