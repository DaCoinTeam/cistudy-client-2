export const Statistics = () => {
    const stats = [
        { id: 0, name: "Total Earning", value: "123" },
        { id: 1, name: "Total Rewardable Posts", value: "3" },
        { id: 2, name: "Total Rewardable Likes", value: "40" },
        { id: 3, name: "Total Rewardable Comments", value: "20" },
    ]

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="text-3xl font-bold">
                Forum Statistics
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <div className="text-base leading-7 text-content4-foreground">{stat.name}</div>
                            <div className="order-first text-xl font-semibold tracking-tight text-content4-foreground sm:text-2xl">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}