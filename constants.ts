import { GraphData, Skill } from './types';
import { Cloud, Database, Cpu, MessageSquare, Share2, Phone, Shield, Activity } from 'lucide-react';

// Mock Schema simulating a Data Cloud topology
export const INITIAL_GRAPH_DATA: GraphData = {
  nodes: [
    { id: 'Account', name: 'Account', group: 'standard', val: 20, description: 'Standard CRM Account Object' },
    { id: 'Contact', name: 'Contact', group: 'standard', val: 15, description: 'Standard CRM Contact Object' },
    { id: 'Case', name: 'Case', group: 'standard', val: 18, description: 'Service Cloud Case' },
    { id: 'LiveChatTranscript', name: 'Chat Transcript', group: 'standard', val: 12, description: 'Historical Chat Data' },
    { id: 'VoiceCall', name: 'Voice Call', group: 'standard', val: 14, description: 'Service Cloud Voice Object' },
    
    // Data Cloud Objects (DMOs)
    { id: 'UnifiedIndividual__dlm', name: 'Unified Individual', group: 'dmo', val: 25, description: 'Identity Resolution Output' },
    { id: 'Engagement_Web__dlm', name: 'Web Engagement', group: 'dmo', val: 15, description: 'Website Interaction Data' },
    { id: 'SalesOrder__dlm', name: 'Sales Order', group: 'dmo', val: 16, description: 'Ingested ERP Data' },
    
    // Calculated Insights
    { id: 'CI_ChurnScore', name: 'Churn Risk Score', group: 'cio', val: 10, description: 'Calculated Insight: Risk propensity' },
    { id: 'CI_LifetimeValue', name: 'LTV', group: 'cio', val: 10, description: 'Calculated Insight: Customer Value' },
  ],
  links: [
    { source: 'Contact', target: 'Account', type: 'master-detail' },
    { source: 'Case', target: 'Account', type: 'lookup' },
    { source: 'Case', target: 'Contact', type: 'lookup' },
    { source: 'VoiceCall', target: 'Case', type: 'lookup' },
    { source: 'LiveChatTranscript', target: 'Case', type: 'lookup' },
    
    // Data Cloud Mapping simulations
    { source: 'Contact', target: 'UnifiedIndividual__dlm', type: 'mapped' },
    { source: 'Engagement_Web__dlm', target: 'UnifiedIndividual__dlm', type: 'mapped' },
    { source: 'SalesOrder__dlm', target: 'UnifiedIndividual__dlm', type: 'mapped' },
    
    // CI relationships
    { source: 'CI_ChurnScore', target: 'UnifiedIndividual__dlm', type: 'mapped' },
    { source: 'CI_LifetimeValue', target: 'UnifiedIndividual__dlm', type: 'mapped' },
  ]
};

export const SKILLS: Skill[] = [
  {
    category: 'Agentforce',
    title: 'Service Agent Deployment',
    description: 'Architecting autonomous agents that resolve low-complexity cases using LLMs and grounded knowledge bases.',
    icon: 'Cpu',
    level: 95
  },
  {
    category: 'Data Cloud',
    title: 'Identity Resolution',
    description: 'Complex reconciliation rules to unify disparate data sources into a single source of truth (Golden Record).',
    icon: 'Database',
    level: 98
  },
  {
    category: 'Service Cloud',
    title: 'Service Cloud Voice',
    description: 'Implementing Amazon Connect & SCV with real-time transcription and Next Best Action integration.',
    icon: 'Phone',
    level: 90
  },
  {
    category: 'Agentforce',
    title: 'Prompt Engineering',
    description: 'Designing robust prompt templates ensuring toxic-free and brand-aligned agent responses.',
    icon: 'MessageSquare',
    level: 92
  },
  {
    category: 'Data Cloud',
    title: 'Data Actions & Activation',
    description: 'Streaming insights to Marketing Cloud and triggering flow automations based on real-time data changes.',
    icon: 'Activity',
    level: 88
  },
  {
    category: 'Architecture',
    title: 'Secure Data Modeling',
    description: 'Designing scalable data models respecting sharing rules and large data volumes (LDV).',
    icon: 'Shield',
    level: 96
  }
];