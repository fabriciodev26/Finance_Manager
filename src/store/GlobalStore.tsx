import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

interface Transaction {
    id: string;
    type: string;
    description: string;
    amount: number;
}

interface FinanceManagerData {
    userName: string;
    totalAmount: number;
    salary: number;
    typeOfFinance: string;
    income: number;
    bills: number;
    description: string;
    transactions: Transaction[];
    isDarkMode: boolean;
    toggleDarkMode: () => Promise<void>;
    addSalary: (qty: number) => void;
    addName: (displayName: string) => void;
    addTransaction: (amount: number, typeOfFinance: string, description: string) => void;
}


const loadState = () => {
    const stateFromStorage = localStorage.getItem('financeManagerState');
    if (stateFromStorage) {
        return JSON.parse(stateFromStorage);
    }
    const transactionsString = localStorage.getItem('transactions');
    const transactions = transactionsString ? JSON.parse(transactionsString) : [];

    return {
        userName: "",
        totalAmount: 0,
        salary: 0,
        typeOfFinance: '',
        income: 0,
        bills: 0,
        description: '',
        transactions: transactions,
    }
}

export const useStoreFinancialManager = create<FinanceManagerData>((set) => {
    const initialState = loadState();
    const storedDarkMode = localStorage.getItem('dark-theme');
    const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
    document.body.classList.toggle('dark-theme', initialDarkMode);

    set((state) => ({ ...state, isDarkMode: initialDarkMode }))
    return {
        ...initialState,
        isDarkMode: initialDarkMode,
        toggleDarkMode: async () => {
            try {
                await set((state) => {
                    const newDarkMode = !state.isDarkMode;
                    localStorage.setItem('dark-theme', JSON.stringify(newDarkMode));
                    document.body.classList.toggle('dark-theme', newDarkMode);

                    return { ...state, isDarkMode: newDarkMode };
                });
            } catch (error) {
                console.error('Error al cambiar el modo oscuro: ', error);
            }
        },
        addSalary: (qty: number) => set((state) => {
            const newState = {
                ...state,
                salary: qty
            };
            localStorage.setItem('financeManagerState', JSON.stringify(newState));
            return newState;
        }),
        addName: (displayName: string) => set((state) => {
            const newState = {
                ...state,
                userName: displayName
            }
            localStorage.setItem('financeManagerState', JSON.stringify(newState));
            return newState;
        }),
        addTransaction: (amount: number, typeOfFinance: string, description: string) => {
            const newTransaction = { id: uuidv4(), type: typeOfFinance, description, amount };
            set((state) => {
                const updatedTransactions = [...state.transactions, newTransaction];
                const newState = { ...state, transactions: updatedTransactions };
                switch (typeOfFinance) {
                    case "bills":
                        newState.bills = state.bills + amount;
                        newState.totalAmount = state.salary + state.income - amount;
                        break;
                    case "income":
                        newState.income = state.income + amount;
                        newState.totalAmount = state.salary + state.income - state.bills + amount;
                        break;
                    default:
                        console.error("Invalid type of finance");
                        break;
                }
                localStorage.setItem('financeManagerState', JSON.stringify(newState));
                return newState;
            });
        },
    };
});
