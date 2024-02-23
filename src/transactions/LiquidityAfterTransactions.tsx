import { ArrowDown, ArrowUp } from '@/icons/GeneralIcons';
import { useStoreFinancialManager } from '@store/GlobalStore';
export const LiquidityAfterTransactions = () => {
    const { totalAmount, salary, isDarkMode } = useStoreFinancialManager();
    const isSalaryGreaterThanTotal = salary > totalAmount;
    const isSalaryGreaterThanTotalClass = isSalaryGreaterThanTotal ? 'border-red-400' : 'border-green-400';
    return (
        <section className={`my-12 shadow-lg border w-max px-8 py-4 flex rounded-lg justify-items-center gap-4 items-center ${isDarkMode ? 'dark-theme' : ' light-theme'} ${isSalaryGreaterThanTotalClass}`}>
            <strong className='text-center text-4xl'>
                Saldo Actual: <span className={`${isSalaryGreaterThanTotal ? 'text-red-400' : 'text-green-400'} flex justify-center items-center gap-1 text-5xl px-6 py-3`}>
                    {isSalaryGreaterThanTotal ? <ArrowDown /> : <ArrowUp />}
                    S /{totalAmount}
                </span>
            </strong>
        </section >
    )
}
