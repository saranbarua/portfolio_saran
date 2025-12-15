import { LucideIcon } from "lucide-react";

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

// types.ts
export type ProjectType = "app" | "web";

export interface Project {
  id: number;
  type: ProjectType; // ✅ app / web
  title: string;
  description: string;
  technologies: string[]; // ✅ technology used
  image: string; // local/remote
  color: string;

  // ✅ Only for app
  metric?: {
    label: "Downloads" | "Users";
    value: string; // "12k+"
  };

  // optional links
  liveUrl?: string;
  repoUrl?: string;
}
