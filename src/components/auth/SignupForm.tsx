'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input } from '../common'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

const signupSchema = z
    .object({
        id: z.string({ message: '올바른 ID 형식이 아닙니다.' }),
        password: z
            .string()
            .min(4, { message: '비밀번호는 4자 이상이어야 합니다.' })
            .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
        confirmPassword: z
            .string()
            .min(4, { message: '비밀번호는 4자 이상이어야 합니다.' })
            .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
    })

type FormFields = z.infer<typeof signupSchema>

export const SignupForm = () => {
    const signup = useAuthStore((state) => state.signup)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormFields>({
        defaultValues: {
            id: '',
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...rest } = data
        const id = await signup(rest)
        if (id) router.push('/')
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex flex-col w-[28rem] space-y-4 bg-neutral-50 p-6 rounded-[1rem] border border-neutral-200"
        >
            <Input
                {...register('id')}
                label="아이디"
                size="lg"
                variant="secondary"
                id="id"
                type="text"
                placeholder="example"
            />
            {errors.id && <span>{errors.id.message}</span>}

            <Input
                {...register('password')}
                label="비밀번호"
                size="lg"
                variant="secondary"
                id="password"
                type="password"
                placeholder="****"
            />
            {errors.password && <span>{errors.password.message}</span>}

            <Input
                {...register('confirmPassword')}
                label="비밀번호 확인"
                size="lg"
                variant="secondary"
                id="password-check"
                type="password"
                placeholder="****"
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

            <Button disabled={!isValid} type="submit" label="제출하기" size="lg" className="mt-4" />
        </form>
    )
}
