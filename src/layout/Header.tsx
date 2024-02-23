import { ToggleOff, ToggleOn } from "@/icons/GeneralIcons";
import { useStoreFinancialManager } from "@/store/GlobalStore";

export const Header = () => {
    const { isDarkMode, toggleDarkMode } = useStoreFinancialManager();

    return (
        <header className="grid grid-cols-3 gap-4 items-center justify-items-center	py-4">
            <nav className="col-start-2">
                <h1 className="text-7xl font-medium"><a href="/">Finance Manager</a></h1>
            </nav>
            <div onClick={toggleDarkMode} style={{ cursor: 'pointer' }} className="col-start-3">
                {isDarkMode ? <ToggleOn /> : <ToggleOff />}
            </div>
        </header>
    )
}
