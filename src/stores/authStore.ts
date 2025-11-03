import { postSignin } from '@/api/auth'
import { LOCAL_STORAGE_KEY } from '@/constants/key'
import { SigninDto } from '@/types/auth'
import { create } from 'zustand'

interface AuthState {
    accessToken: string | null
    name: string | null
    login: (signinData: SigninDto) => Promise<void>
    logout: () => Promise<void>

    showSigninModal: boolean
    openSigninModal: () => void
    closeSigninModal: () => void
    toggleSigninModal: () => void
}

export const useAuthStore = create<AuthState>((set) => {
    return {
        accessToken: typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_KEY.AT) : null,
        name: null,
        login: async (signinData: SigninDto) => {
            try {
                const res = await postSignin(signinData)
                const token = res.accessToken
                if (token) {
                    localStorage.setItem(LOCAL_STORAGE_KEY.AT, token)
                    set({ accessToken: token, name: signinData.id })
                }
            } catch (error) {
                console.log('[Error] Login ...', error)
            }
        },
        logout: async () => {
            localStorage.removeItem(LOCAL_STORAGE_KEY.AT)
            set({ accessToken: null, name: null })
        },

        showSigninModal: false,
        openSigninModal: () => set({ showSigninModal: true }),
        closeSigninModal: () => set({ showSigninModal: false }),
        toggleSigninModal: () =>
            set((state) => ({
                showSigninModal: !state.showSigninModal,
            })),
    }
})
