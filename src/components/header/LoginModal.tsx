import Link from 'next/link'
import { Button, Input } from '../common'
import Modal from '../common/Modal'

interface LoginModalProps {
    onClose: () => void
    onLogin: () => void
}

const SignupLink = (
    <p className="font-medium text-neutral-600">
        아직 회원이 아니신가요?{' '}
        <Link href="/auth/signup" className="font-bold border-b border-primary-500 text-primary-500">
            가입하기
        </Link>
    </p>
)

export const LoginModal = ({ onClose, onLogin }: LoginModalProps) => {
    return (
        <Modal
            title="로그인"
            description="로그인하여 내 주식 맞춤 검색을 해보세요!"
            onClose={onClose}
            footerContent={SignupLink}
        >
            <div className="flex flex-col gap-2">
                <Input
                    label="이메일"
                    size="lg"
                    variant="secondary"
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                />
                <Input
                    label="비밀번호"
                    size="lg"
                    variant="secondary"
                    id="password"
                    type="password"
                    placeholder="********"
                />
            </div>

            <Button label="확인하기" size="lg" onClick={onLogin} />
        </Modal>
    )
}
