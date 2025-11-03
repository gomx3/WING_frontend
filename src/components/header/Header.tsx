'use client'

import { useState } from 'react'
import { HeaderDesktop } from './HeaderDesktop'
import { LoginModal } from '../auth'
import { useAuthStore } from '@/stores/authStore'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
    id: z
        .string()
        .min(4, { message: '아이디는 4자 이상이어야 합니다.' })
        .max(16, { message: '아이디는 16자 이하여야 합니다.' })
        .regex(/^[a-zA-Z0-9]+$/, { message: '아이디는 영문/숫자만 입력 가능합니다.' }),

    password: z
        .string()
        .min(4, { message: '비밀번호는 4자 이상이어야 합니다.' })
        .max(20, { message: '비밀번호는 20자 이하여야 합니다.' })
        .regex(/^[A-Za-z0-9!@#$%^&*()_+=-]+$/, { message: '비밀번호는 영문/숫자/특수문자만 허용됩니다.' }),
})

type FormFields = z.infer<typeof loginSchema>

export interface HeaderProps {
    onLogin?: () => void
    onLogout?: () => void
}

export const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false)

    const handleLoginClick = () => {
        setShowLoginModal(true)
    }

    const handleLoginClose = () => setShowLoginModal(false)

    const login = useAuthStore((state) => state.login)
    const logout = useAuthStore((state) => state.logout)
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormFields>({
        defaultValues: { id: '', password: '' },
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    })

    const onLogin = handleSubmit(async (data) => {
        await login(data)
        handleLoginClose()
    })

    return (
        <>
            <header>
                <HeaderDesktop onLogin={handleLoginClick} onLogout={logout} />
            </header>

            {showLoginModal && (
                <LoginModal
                    register={register}
                    errors={errors}
                    isValid={isValid}
                    onClose={handleLoginClose}
                    onLogin={onLogin}
                />
            )}
        </>
    )
}
