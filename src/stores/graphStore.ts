import { GraphData } from '@/types/graph'
import { create } from 'zustand'

interface GraphState {
    graphData: GraphData
    setGraphData: (data: GraphData) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

export const useGraphStore = create<GraphState>((set) => ({
    graphData: { nodes: [], links: [] },
    isLoading: false,
    setGraphData: (data) => set({ graphData: data }),
    setIsLoading: (loading) => set({ isLoading: loading }),
}))
