import { Button, Input } from '../common'
import Modal from '../common/Modal'

interface LoginModalProps {
    onClose: () => void
    onLogin: () => void
}

export const LoginModal = ({ onClose, onLogin }: LoginModalProps) => {
    return (
        <Modal title="로그인" description="그래프 생성을 하려면 로그인이 필요합니다!" onClose={onClose}>
            <div className="flex flex-col gap-2">
                <Input label="이메일" id="email" type="email" placeholder="example@email.com" />
                <Input label="비밀번호" id="password" type="password" placeholder="********" />
            </div>
            <Button label="확인하기" size="lg" onClick={onLogin} />
        </Modal>
    )
}
