import { useStoreFinancialManager } from '@store/GlobalStore';
export const LiquidityAfterTransactions = () => {
    const { totalAmount } = useStoreFinancialManager();
    return (
        <div>{totalAmount}</div>
    )
}
