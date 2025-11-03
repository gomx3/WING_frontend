import Link from 'next/link'
import { Button, Input } from '../common'
import Modal from '../common/Modal'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface LoginModalProps {
    register: UseFormRegister<{
        id: string
        password: string
    }>
    errors: FieldErrors<{
        id: string
        password: string
    }>
    isValid: boolean
    onClose: () => void
    onLogin: () => void
}

const SignupLink = ({ onClose }: { onClose: () => void }) => (
    <p className="font-medium text-neutral-600">
        아직 회원이 아니신가요?{' '}
        <Link href="/auth/signup" onClick={onClose} className="font-bold border-b border-primary-500 text-primary-500">
            가입하기
        </Link>
    </p>
)

export const LoginModal = ({ register, errors, isValid, onClose, onLogin }: LoginModalProps) => {
    return (
        <Modal
            title="로그인"
            description="로그인하여 내 주식 맞춤 검색을 해보세요!"
            onClose={onClose}
            footerContent={<SignupLink onClose={onClose} />}
        >
            <form onSubmit={onLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
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
                </div>

                <Button type="submit" disabled={!isValid} label="확인하기" size="lg" />
            </form>
        </Modal>
    )
}
