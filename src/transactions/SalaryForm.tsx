import { CashStack, PersonAdd } from "@/icons/GeneralIcons";
import { useStoreFinancialManager } from "@store/GlobalStore";
import { useState } from "react";
import { Toaster, toast } from 'sonner';

interface SalaryFormProps {
    onSubmit: () => void;
}

export const SalaryForm: React.FC<SalaryFormProps> = ({ onSubmit }) => {
    const { addSalary, addName, isDarkMode } = useStoreFinancialManager();
    const [temporarySalary, setTemporarySalary] = useState<number>(0);
    const [displayName, setDisplayName] = useState<string>('');
    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTemporarySalary(parseFloat(e.target.value));
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(e.target.value);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (temporarySalary <= 0 || displayName.trim().length < 3) {
            toast.error('El salario debe ser mayor a 0 o debe de agregar un nombre', {
                position: 'top-center',
                duration: 1500,
            });
            return
        }

        addSalary(temporarySalary);
        addName(displayName);
        toast.success('Se añadio el salario', {
            position: 'top-center',
            duration: 1500,
        });
        setTimeout(() => {
            onSubmit();
        }, 1500)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='rounded-lg py-6 px-4 flex justify-center w-full'
        >
            <fieldset className={`shadow-lg border px-6 border-sky-300 py-10 flex flex-col w-1/4 rounded-lg justify-center items-center gap-8 ${isDarkMode ? 'dark-theme shadow-slate-50' : 'light-theme shadow-cyan-500/50'}`}>
                <label htmlFor="userName" className="flex flex-col gap-2">
                    <span className="flex gap-2 text-3xl items-center font-normal">
                        <PersonAdd />
                        Nombre:
                    </span>
                    <input
                        type="text"
                        id="userName"
                        value={displayName}
                        onChange={handleNameChange}
                        placeholder="Ingrese el nombre"
                        className={`text-black rounded-md px-5 py-3 text-2xl ${isDarkMode ? "" : "border border-sky-300"}`}
                    />
                </label>
                <label htmlFor="salary" className="flex flex-col gap-2">
                    <span className="flex gap-2 text-3xl items-center font-normal">
                        <CashStack />
                        Sueldo:
                    </span>
                    <input
                        type="number"
                        step='0.01'
                        id="salary"
                        value={temporarySalary.toString()}
                        onChange={handleSalaryChange}
                        placeholder="Salario"
                        className={`text-black rounded-md px-5 py-3 text-2xl ${isDarkMode ? "" : "border border-sky-300"}`}
                    />
                </label>
                <button type="submit" className="bg-sky-300 px-7 py-5 text-3xl rounded-lg font-bold shadow-md shadow-sky-300 border border-white">Añadir Salario</button>
            </fieldset>
            <Toaster richColors />
        </form >
    )
}
