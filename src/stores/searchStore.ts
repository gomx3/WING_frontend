import { create } from 'zustand'

interface SearchState {
    isSearchOpen: boolean
    toggleSearch: () => void
    keywords: string[]
    setKeywords: (newKeywords: string[]) => void
}

export const useSearchStore = create<SearchState>((set) => ({
    isSearchOpen: false,
    toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
    keywords: [],
    setKeywords: (newKeywords) => set({ keywords: newKeywords }),
}))
