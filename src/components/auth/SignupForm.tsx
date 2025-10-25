import { Button, Input } from '../common'

export const SignupForm = () => {
    return (
        <form className="relative flex flex-col w-[28rem] space-y-4 bg-white-800 p-6 rounded-[1rem] border border-white-600">
            <Input label="이름" size="lg" variant="secondary" id="name" placeholder="김개미" />
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
            <Input
                label="비밀번호 확인"
                size="lg"
                variant="secondary"
                id="password-check"
                type="password"
                placeholder="********"
            />

            <Button label="제출하기" size="lg" className="mt-4" />
        </form>
    )
}
