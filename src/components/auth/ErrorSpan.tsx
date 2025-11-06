interface ErrorSpanProps {
    message: string
}

export const ErrorSpan = ({ message }: ErrorSpanProps) => {
    return <span className="mx-2 text-primary-500 text-[0.875rem]">{message}</span>
}
