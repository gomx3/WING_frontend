import Image from 'next/image'
import { Button } from './common'
import { SERVICE_FEATURES } from '@/constants/landing'
import { useRouter } from 'next/navigation'

export const Landing = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col justify-center items-center h-full gap-20 bg-gradient-to-b from-white to-primary-800/80">
            <section className="flex flex-col items-center justify-center text-center gap-10">
                <Image src="/assets/landing.svg" alt="랜딩 타이틀" width={962} height={368} />
                <Button label="회원가입 후 시작하기" size="lg" onClick={() => router.push('/auth/signup')} />
            </section>

            <section className="flex flex-wrap justify-center gap-8">
                {SERVICE_FEATURES.map(({ title, desc }) => (
                    <div
                        key={title}
                        className="flex flex-col items-center p-4 bg-neutral-50 border border-neutral-200 rounded-2xl w-60"
                    >
                        <h3 className="text-lg font-bold mb-2">{title}</h3>
                        <p className="text-center text-neutral-600 text-sm">{desc}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}
