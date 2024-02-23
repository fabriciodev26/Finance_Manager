import { useStoreFinancialManager } from "@store/GlobalStore";

export const TransactionTable = () => {
    const { transactions, isDarkMode } = useStoreFinancialManager();
    return (
        <div className='shadow-lg w-full'>
            <table className={`rounded-lg min-w-full ${isDarkMode ? 'dark-theme' : 'ligth-theme'}`}>
                <thead className="border border-sky-300 py-6 px-4">
                    <tr>
                        <th className="text-2xl py-4 px-2" scope='col'>#</th>
                        <th className="text-2xl py-4 px-2" scope='col'>Tipo</th>
                        <th className="text-2xl py-4 px-2" scope='col'>Descripción de la Transactión</th>
                        <th className="text-2xl py-4 px-2" scope='col'>Monto</th>
                        {/* <th scope='col'>Acción</th> */}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr
                            key={transaction.id}
                            className={`${transaction.type === 'income' ? 'bg-green-400' : 'bg-red-400'} text-center text-2xl text-white}`}
                        >
                            <th className="font-medium py-4" scope='row'>{index + 1}</th>
                            <td className="font-medium py-4" > {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}</td>
                            <td className="font-medium py-4">{transaction.description}</td>
                            <td className="font-medium py-4">S/ {transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
