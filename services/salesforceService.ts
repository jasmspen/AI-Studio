import { INITIAL_GRAPH_DATA } from '../constants';
import { GraphData } from '../types';

// In a real app, this would use a JWT Bearer Token flow to auth with Salesforce 
// and hit the Data Cloud Metadata API.
// Here, we simulate the network delay and "discovery" of the schema.

export const fetchSalesforceSchema = async (): Promise<GraphData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // We return the "discovered" schema. 
      // In a real scenario, we would parse the /api/v1/metadata response.
      resolve(INITIAL_GRAPH_DATA);
    }, 2500); // 2.5s simulated delay for dramatic effect
  });
};

export const fetchRealTimeStats = async (): Promise<{ recordsProcessed: number; matchRate: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                recordsProcessed: Math.floor(Math.random() * 500000) + 1000000,
                matchRate: 84.5
            })
        }, 1000);
    })
}