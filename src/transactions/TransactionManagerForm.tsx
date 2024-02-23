import { CashStack, PersonCheck } from "@/icons/GeneralIcons";
import { useStoreFinancialManager } from "@store/GlobalStore";
import { useState } from "react";

interface TransactionManagerFormProps {
    onSubmit: () => void;
}
export const TransactionManagerForm: React.FC<TransactionManagerFormProps> = ({ onSubmit }) => {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [typeOfFinance, setTypeOfFinance] = useState<string>('income');
    const { userName, salary, addTransaction, isDarkMode } = useStoreFinancialManager();

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeOfFinance(e.target.value);
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(amount, description, typeOfFinance)
        if (isNaN(amount) || amount <= 0 || !description.trim()) {
            alert('Por favor, ingrese una descripción y un monto válido')
            return
        }
        addTransaction(amount, typeOfFinance, description);
        setDescription("");
        setAmount(0);
        onSubmit();
    }
    return (
        <form onSubmit={handleSubmit}
            className='rounded-lg py-6 px-4 flex flex-col items-center justify-center w-full sm:w-fit m-auto'>
            <fieldset className={`shadow-lg border min-w-full border-sky-300 pt-3 px-8 pb-10 flex flex-col w-min-full rounded-lg justify-center items-center gap-8 ${isDarkMode ? 'dark-theme shadow-slate-50' : 'light-theme shadow-cyan-500/50'}`}>
                <legend className="flex gap-2 text-3xl items-center font-normal p-2">{userName} <PersonCheck /></legend>
                <span className="flex gap-2 text-3xl items-center font-normal">
                    <CashStack />
                    Saldo: S/{salary}
                </span>
            </fieldset>
            <fieldset className={`shadow-lg border border-sky-300 pt-3 pb-10 min-w-full px-8 mt-12 flex flex-col w-1/4 rounded-lg justify-center items-center gap-8 ${isDarkMode ? 'dark-theme shadow-slate-50' : 'light-theme shadow-cyan-500/50'}`}>
                <legend className="flex gap-2 text-3xl items-center font-normal p-2">Transacción</legend>
                <label htmlFor="description">
                    <span className="flex gap-2 text-3xl items-center font-normal mt-8">
                        Descripción:
                    </span>
                    <input
                        type="text"
                        placeholder="Ingresa la Descripción"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className={`text-black rounded-md px-5 py-3 text-2xl mt-4 ${isDarkMode ? "" : "border border-sky-300"}`}
                    />
                </label>
                <label htmlFor="typeOfFinance">
                    <span className="flex gap-2 text-3xl items-center font-normal">
                        Tipo de Transacción
                    </span>
                    <select
                        id="typeOfFinance"
                        value={typeOfFinance}
                        onChange={handleTypeChange}
                        className={`text-black mt-4 rounded-md px-5 py-3 text-2xl ${isDarkMode ? "" : "border border-sky-300"}`}
                    >
                        <option value="income">Ingreso</option>
                        <option value="bills">Gasto</option>
                    </select>
                </label>
                <label htmlFor="amount">
                    <span className="flex gap-2 text-3xl items-center font-normal">
                        Monto:
                    </span>
                    <input
                        type="number"
                        step="0.01"
                        id="amount"
                        placeholder="Monto"
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        value={isNaN(amount) ? '' : amount}
                        className={`text-black rounded-md px-5 py-3 mt-4 text-2xl ${isDarkMode ? "" : "border border-sky-300"}`}
                    />
                </label>
                <button type="submit" className="bg-sky-300 px-7 py-5  md:px-5 text-3xl rounded-lg font-normal shadow-md shadow-sky-300 border border-white mb-8">Añadir Transacción</button>
            </fieldset>
        </form >
    )
}
