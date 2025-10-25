'use client'

import React, { ReactNode, useEffect, useRef, type PropsWithChildren } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
    title?: string
    description?: string
    onClose: () => void
    className?: string
    footerContent?: ReactNode
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
 * @param {React.ReactNode} [footerContent] - 모달 외부 하단에 삽입할 추가 컨텐츠
 */
const Modal = ({
    title,
    description,
    onClose,
    className = '',
    children,
    footerContent,
}: PropsWithChildren<ModalProps>) => {
    const modalRef = useRef<HTMLDivElement>(null)

    // ESC 키로 모달 창 닫기
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return (
        <div
            onClick={onClose} // 배경 클릭으로 모달 창 닫기
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center min-w-[288px]"
        >
            <div className="absolute inset-0 bg-neutral-white-opacity25 backdrop-blur-sm" />

            {/* 모달 창 */}
            <div
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative flex flex-col min-w-[18rem] tablet:min-w-[24rem] desktop:min-w-[30rem]
                    space-y-4 tablet:space-y-6 bg-white-800 p-6 rounded-[1rem] border border-white-600
                    modal-animation ${className}
                `}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="모달 창 닫기"
                    className="cursor-pointer absolute top-4 right-4 tablet:top-6 tablet:right-6"
                >
                    <X />
                </button>

                <div className="text-center whitespace-pre-line space-y-2">
                    {title && (
                        <h1
                            id="modal-title"
                            className="
                            text-[1.5rem] leading-[140%] tracking-[-0.4px] font-bold text-neutral-900
                            whitespace-pre-line tablet:whitespace-nowrap    
                        "
                        >
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p
                            id="modal-description"
                            className="text-[0.925rem] tablet:text-[1rem] leading-[140%] tracking-[-0.35px] text-neutral-500 font-medium"
                        >
                            {description}
                        </p>
                    )}
                </div>
                {children}
            </div>

            {footerContent && <div className="z-10 mt-4">{footerContent}</div>}
        </div>
    )
}

export default Modal
