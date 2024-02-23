import { useStoreFinancialManager } from "@store/GlobalStore";
import { VictoryLabel, VictoryPie } from "victory";

export const TransactionCharts = () => {
    const { bills, income, salary, isDarkMode } = useStoreFinancialManager();

    const percentageOfTotalExpenditure: number = (bills / (salary + income) * 100);
    const percentageOfTotalInccome: number = 100 - percentageOfTotalExpenditure;

    /** Se añade **/
    const labelStyle = {
        fill: isDarkMode ? 'white' : 'black',
        fontSize: 12,
        fontWeight: 'bold',
    };

    return (
        <div className={`flex justify-center items-center flex-col shadow-lg my-20 p-6 rounded-lg ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
            <h2 className="text-3xl font-semibold mt-10">Distribución de Ingresos y Gastos</h2>
            <div className="w-1/4">
                <VictoryPie
                    padAngle={() => 4}
                    innerRadius={100}
                    colorScale={["#5CB85C", "#D9534F"]}
                    data={[
                        { x: 'Ingresos', y: percentageOfTotalInccome },
                        { x: 'Gastos', y: percentageOfTotalExpenditure },
                    ]}
                    animate={{
                        duration: 3000,
                    }}
                    labels={({ datum }) => (`${datum.x}\n${datum.y.toFixed(2)}%`)}
                    labelComponent={<VictoryLabel style={labelStyle} dy={20} />}
                    style={{
                        labels: { fontSize: 12, fontWeight: 'bold' },
                        data: { strokeWidth: 2, fillOpacity: 0.8 },
                    }}
                />
            </div>

        </div>
    )
}
