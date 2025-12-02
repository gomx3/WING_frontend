export const LoadingSpinner = () => {
    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-md">
            <div className="animate-spin h-14 w-14 mb-6 rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
    )
}
