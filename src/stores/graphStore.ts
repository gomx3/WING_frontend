import { create } from 'zustand'
import { GraphData } from '@/types/graph'

interface SelectedLink {
    source: string
    target: string
}

interface GraphStoreState {
    graphData: GraphData
    setGraphData: (data: GraphData) => void

    // [추가] 선택된 링크 상태
    selectedLink: SelectedLink | null
    // [추가] 상태 변경 액션
    setSelectedLink: (link: SelectedLink) => void
    clearSelectedLink: () => void
}

export const useGraphStore = create<GraphStoreState>((set) => ({
    graphData: { nodes: [], links: [] },
    setGraphData: (data) => set({ graphData: data }),

    // [추가] 상태 및 액션 초기값
    selectedLink: null,
    setSelectedLink: (link) => set({ selectedLink: link }),
    clearSelectedLink: () => set({ selectedLink: null }),
}))
