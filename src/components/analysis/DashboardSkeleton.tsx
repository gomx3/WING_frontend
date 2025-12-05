export const DashboardSkeleton = () => {
    return (
        <div className="absolute top-4 right-4 p-4 w-[280px] h-11/12 bg-white/30 backdrop-blur-md rounded-2xl z-30 flex flex-col justify-center items-center gap-4 shadow-2xl">
            <div className="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full" />
            <span className="text-sm text-neutral-600 trakcing-tight">키워드 관련 종목을 분석 중입니다...</span>
        </div>
    )
}
