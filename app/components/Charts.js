import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, ChartDataLabels);

export default function Charts({ data = [], type }) {
    const averagePriceBySeason = {};
    data.forEach((item) => {
        if (averagePriceBySeason[item.saison]) {
            averagePriceBySeason[item.saison].total += item.prix;
            averagePriceBySeason[item.saison].count += 1;
        } else {
            averagePriceBySeason[item.saison] = { total: item.prix, count: 1 };
        }
    });

    const barAverageCostChartData = {
        labels: Object.keys(averagePriceBySeason),
        datasets: [
            {
                label: 'Prix moyen',
                data: Object.values(averagePriceBySeason).map(season => Math.round(season.total / season.count)), // Arrondi des valeurs
                backgroundColor: 'rgba(75,192,192,0.4)',
            },
        ],
    };

    const countByLevelAndPasse = {
        simple: { pro: 0, moyen: 0, novice: 0 },
        double: { pro: 0, moyen: 0, novice: 0 },
        illimité: { pro: 0, moyen: 0, novice: 0 }
    };

    data.forEach((item) => {
        if (countByLevelAndPasse[item.passe] && countByLevelAndPasse[item.passe][item.niveau] !== undefined) {
            countByLevelAndPasse[item.passe][item.niveau] += 1;
        }
    });

    const barPassesChartData = {
        labels: ['Pro', 'Moyen', 'Novice'],
        datasets: [
            {
                label: 'Passe Simple',
                data: Object.values(countByLevelAndPasse.simple),
                backgroundColor: 'rgba(75,192,192,0.4)',
            },
            {
                label: 'Passe Double',
                data: Object.values(countByLevelAndPasse.double),
                backgroundColor: 'rgba(153,102,255,0.4)',
            },
            {
                label: 'Passe Illimité',
                data: Object.values(countByLevelAndPasse.illimité),
                backgroundColor: 'rgba(255,159,64,0.4)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            datalabels: {
                color: 'rgba(0,0,0,0.7)',
                formatter: (value) => Math.round(value),
            },
        },
        scales: {
            x: { type: 'category' },
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            {type === 'seasonBar' ? (
                <div className="flex-1">
                    <Bar data={barAverageCostChartData} options={options} />
                </div>
            ) : (
                <div className="flex-1">
                    <Bar data={barPassesChartData} options={options} />
                </div>
            )}
        </div>
    );
}
