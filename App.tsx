import React, { useState, useCallback } from 'react';
import { Cloud, Play, Database, Linkedin, Mail, Github, ChevronsRight, Info } from 'lucide-react';
import ThreeGraph from './components/ThreeGraph';
import SkillsSection from './components/SkillsSection';
import AgentChat from './components/AgentChat';
import { fetchSalesforceSchema, fetchRealTimeStats } from './services/salesforceService';
import { GraphData, GraphNode } from './types';

const App: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [stats, setStats] = useState<{ recordsProcessed: number; matchRate: number } | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const handleConnectDataCloud = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      const [data, statistics] = await Promise.all([
          fetchSalesforceSchema(),
          fetchRealTimeStats()
      ]);
      setGraphData(data);
      setStats(statistics);
      setIsDataLoaded(true);
    } catch (e) {
      console.error("Failed to fetch data", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cloud className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NEXUS</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#graph" className="hover:text-blue-400 transition-colors">Data Model</a>
            <a href="#capabilities" className="hover:text-blue-400 transition-colors">Capabilities</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <button className="bg-slate-100 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white transition-colors">
            Book Consultation
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6 min-h-[85vh] flex flex-col lg:flex-row gap-12">
          
          {/* Left Content */}
          <div className="lg:w-1/3 flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                AVAILABLE FOR PROJECTS
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white mb-6">
                Architecting <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300">
                  Agentforce
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Specialized in transforming disjointed data into actionable intelligence using Salesforce Data Cloud. 
                Building the next generation of autonomous Service Agents.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
                {!isDataLoaded ? (
                    <button 
                        onClick={handleConnectDataCloud}
                        disabled={isLoading}
                        className="group relative overflow-hidden w-full md:w-64 bg-blue-600 hover:bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Ingesting Schema...</span>
                            </>
                        ) : (
                            <>
                                <Database className="w-5 h-5" />
                                <span>Connect Data Cloud</span>
                                <ChevronsRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </>
                        )}
                    </button>
                ) : (
                     <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                             <p className="text-xs text-slate-500 uppercase tracking-wider">Records Unified</p>
                             <p className="text-2xl font-bold text-white font-mono">{stats?.recordsProcessed.toLocaleString()}</p>
                         </div>
                         <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                             <p className="text-xs text-slate-500 uppercase tracking-wider">Match Rate</p>
                             <p className="text-2xl font-bold text-teal-400 font-mono">{stats?.matchRate}%</p>
                         </div>
                     </div>
                )}
                <p className="text-xs text-slate-600 flex items-center">
                    <Info size={12} className="mr-1" /> 
                    Click button to simulate Real-time Data Cloud Graph API call
                </p>
            </div>
            
            {/* Selected Node Info Panel */}
            {selectedNode && (
                <div className="p-5 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-blue-300">{selectedNode.name}</h3>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700 uppercase">{selectedNode.group}</span>
                    </div>
                    <p className="text-sm text-slate-400">{selectedNode.description}</p>
                </div>
            )}

          </div>

          {/* Right Content - 3D Graph */}
          <div id="graph" className="lg:w-2/3 h-[600px] lg:h-auto relative">
            <ThreeGraph data={graphData} onNodeClick={setSelectedNode} />
          </div>
        </div>
      </main>

      {/* Skills */}
      <SkillsSection />

      {/* Footer / Contact */}
      <footer id="contact" className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
             <h3 className="text-2xl font-bold text-white mb-2">Let's Build the Future</h3>
             <p className="text-slate-500">Open for high-impact contract roles.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                <Github className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* AI Agent */}
      <AgentChat />
    </div>
  );
};

export default App;