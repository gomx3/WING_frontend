import { SignupForm } from '@/components/auth'

export default function page() {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-6 bg-gradient-to-b from-white to-primary-800/80">
            <h1 className="text-[2rem] font-bold text-neutral-900">회원가입</h1>
            <SignupForm />
        </div>
    )
}
