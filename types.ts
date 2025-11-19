export interface GraphNode {
  id: string;
  name: string;
  group: 'standard' | 'custom' | 'dmo' | 'cio'; // Standard, Custom, Data Model Object, Calculated Insight
  val: number; // Size of the sphere
  description?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'lookup' | 'master-detail' | 'mapped';
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface Skill {
  category: string;
  title: string;
  description: string;
  icon: string;
  level: number; // 1-100
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}