import { TrashFill } from "@/icons/GeneralIcons";
import { useStoreFinancialManager } from "@store/GlobalStore";

export const TransactionTable = () => {
    const { transactions, isDarkMode, deleteTransaction } = useStoreFinancialManager();
    return (
        <div className={`grid items-center justify-center rounded-lg w-full`}>
            <table className={`border border-cyan-300 shadow-lg min-w-full ${isDarkMode ? 'dark-theme shadow-slate-50' : 'light-theme shadow-cyan-500/50'}`}>
                <thead>
                    <tr>
                        <th className="text-2xl py-4 px-2" scope='col'>#</th>
                        <th className="text-2xl py-4 px-2" scope='col'>Tipo</th>
                        <th className="text-2xl py-4 px-2" scope='col'>Descripción de la Transactión</th>
                        <th className="text-2xl py-4 px-2" scope='col'>Monto</th>
                        <th scope='col'>Acción</th>
                    </tr>
                </thead >
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr
                            key={transaction.id}
                            className={`${transaction.type === 'income' ? 'bg-green-400' : 'bg-red-400'} text-center text-4xl text-white}`}
                        >
                            <th className="font-medium py-4 px-4" scope='row'>{index + 1}</th>
                            <td className="font-medium py-4 px-4" > {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}</td>
                            <td className="font-medium py-4 px-4">{transaction.description}</td>
                            <td className="font-medium py-4 px-4">S/ {transaction.amount}</td>
                            <td
                                className="font-medium py-4 px-4"
                                onClick={() => deleteTransaction(transaction.id)}><TrashFill /></td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </div >
    )
}
