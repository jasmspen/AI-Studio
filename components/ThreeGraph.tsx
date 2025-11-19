import React, { useEffect, useRef, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { GraphData, GraphNode } from '../types';
import { Maximize2 } from 'lucide-react';

interface ThreeGraphProps {
  data: GraphData;
  onNodeClick: (node: GraphNode) => void;
}

const ThreeGraph: React.FC<ThreeGraphProps> = ({ data, onNodeClick }) => {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Add initial rotation/zoom effect
  useEffect(() => {
     if (graphRef.current) {
         graphRef.current.d3Force('charge').strength(-120);
     }
  }, [graphRef]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 shadow-2xl">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center space-x-2 bg-slate-950/80 px-3 py-1 rounded-full border border-blue-500/30">
           <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
           <span className="text-xs font-mono text-blue-200">DATA CLOUD LIVE TOPOLOGY</span>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 z-10 text-xs text-slate-500 font-mono pointer-events-none">
        Left Click: Rotate | Right Click: Pan | Scroll: Zoom
      </div>

      {data.nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-500 font-mono animate-pulse">
              Waiting for Data Ingestion...
          </div>
      ) : (
          <ForceGraph3D
            ref={graphRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={data}
            nodeLabel="name"
            nodeColor={(node: any) => {
                if (node.group === 'dmo') return '#0ea5e9'; // Sky Blue
                if (node.group === 'cio') return '#f43f5e'; // Rose
                return '#64748b'; // Slate
            }}
            nodeResolution={16}
            linkWidth={2}
            linkColor={() => 'rgba(255, 255, 255, 0.2)'}
            backgroundColor="rgba(0,0,0,0)"
            onNodeClick={(node: any) => onNodeClick(node)}
            enableNodeDrag={true}
            showNavInfo={false}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={0.005}
          />
      )}
    </div>
  );
};

export default ThreeGraph;