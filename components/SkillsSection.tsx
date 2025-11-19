import React from 'react';
import { SKILLS } from '../constants';
import { Database, Cpu, Phone, MessageSquare, Activity, Shield } from 'lucide-react';

const iconMap: Record<string, any> = {
  Database, Cpu, Phone, MessageSquare, Activity, Shield
};

const SkillsSection: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4">
            Agentforce Architecture Capabilities
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Bridging the gap between legacy data silos and autonomous AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, index) => {
            const Icon = iconMap[skill.icon] || Database;
            return (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-800/60 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20 transition-colors">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded bg-slate-950">
                    {skill.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-200 mb-2 group-hover:text-white">
                  {skill.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {skill.description}
                </p>
                
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;