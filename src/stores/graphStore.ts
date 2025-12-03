import { create } from 'zustand'
import { GraphData } from '@/types/graph'

interface SelectedLink {
    source: string
    target: string
}

interface GraphStoreState {
    graphData: GraphData
    setGraphData: (data: GraphData) => void

    selectedGraphId: number | null
    setSelectedGraphId: (id: number | null) => void

    selectedLink: SelectedLink | null
    setSelectedLink: (link: SelectedLink) => void
    clearSelectedLink: () => void

    isGraphLoading: boolean
    setIsGraphLoading: (v: boolean) => void

    isInvestmentMode: boolean
    toggleInvestmentMode: () => void
}

export const useGraphStore = create<GraphStoreState>((set) => ({
    graphData: { nodes: [], links: [] },
    setGraphData: (data) => set({ graphData: data }),

    selectedGraphId: null,
    setSelectedGraphId: (id) =>
        set({
            selectedGraphId: id,
            selectedLink: null,
        }),

    selectedLink: null,
    setSelectedLink: (link) => set({ selectedLink: link }),
    clearSelectedLink: () => set({ selectedLink: null }),
    isGraphLoading: false,
    setIsGraphLoading: (v) => set({ isGraphLoading: v }),

    isInvestmentMode: false,
    toggleInvestmentMode: () => set((state) => ({ isInvestmentMode: !state.isInvestmentMode })),
}))
