import { Card } from "@repo/ui/card"

const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        startTime: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map((t,i) => <div key={i} className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t?.status} 
                    </div>
                    <div className="text-slate-600 text-xs">
                        {new Date(t?.startTime)?.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t?.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}

export default OnRampTransactions;