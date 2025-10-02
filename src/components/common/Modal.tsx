import { useEffect, useLayoutEffect, useRef, useState, type PropsWithChildren } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
    title: string
    description?: string
    onClose: () => void
    className?: string
}

/**
 * 모달 컴포넌트
 *
 * 화면 중앙에 팝업 형태의 모달을 띄우고, 배경 클릭이나 ESC 키로 닫을 수 있습니다.
 *
 * @param {string} title - 모달 제목
 * @param {string} [description] - 모달 설명 텍스트 (optional)
 * @param {() => void} onClose - 모달 닫기 이벤트 핸들러
 * @param {string} [className] - 모달 컨테이너에 추가할 Tailwind 클래스 (optional)
 * @param {React.ReactNode} [children] - 모달 내부에 삽입할 추가 컨텐츠
 */
const Modal = ({ title, description, onClose, className = '', children }: PropsWithChildren<ModalProps>) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const [marginTop, setMarginTop] = useState<number | null>(null)

    // ESC 키로 모달 창 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    useLayoutEffect(() => {
        const handleResize = () => {
            if (modalRef.current) {
                const modalHeight = modalRef.current.getBoundingClientRect().height
                const windowHeight = window.innerHeight
                const calculatedMarginTop = Math.max((windowHeight - modalHeight) / 2, 24)
                setMarginTop(calculatedMarginTop)
            }
        }
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div
            onClick={onClose} // 배경 클릭으로 모달 창 닫기
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="fixed inset-0 z-50 flex items-start justify-center min-w-[288px]"
        >
            <div className="absolute inset-0 bg-neutral-black-opacity50" />

            {/* 모달 창 */}
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative flex flex-col min-w-[288px] tablet:min-w-[384px] desktop:min-w-[486px]
                    space-y-4 tablet:space-y-6 bg-surface-elevate-l2 p-6 rounded-3xl
                    modal-animation ${className}
                `}
                style={marginTop !== null ? { marginTop } : undefined}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="cursor-pointer absolute top-4 right-4 tablet:top-6 tablet:right-6"
                >
                    <X />
                </button>

                <div className="text-center whitespace-pre-line space-y-2">
                    <h1
                        id="modal-title"
                        className="
                            font-title-20b
                            whitespace-pre-line tablet:whitespace-nowrap    
                        "
                    >
                        {title}
                    </h1>
                    {description && (
                        <p id="modal-description" className="font-body-16r text-gray-600">
                            {description}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
