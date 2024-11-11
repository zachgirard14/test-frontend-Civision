"use client";

import { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import PriceDisplay from './components/PriceDisplay';
import ChartComponent from './components/Charts';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/database.json');
            const data = await res.json();
            setData(data);
            setFilteredData(data);
        };
        fetchData();
    }, []);

    const handleFilterChange = (newFilters) => {
        const filtered = data.filter(item => {
            return (
                (!newFilters.saison || item.saison === newFilters.saison) &&
                (!newFilters.niveau || item.niveau === newFilters.niveau)
            );
        });
        setFilteredData(filtered);
    };

    return (
        <div className="flex flex-col gap-2 p-8">
            <h1 className="text-center text-3xl mb-4">Mon tableau de bord</h1>
            <div className="mb-4">
                <PriceDisplay data={filteredData} />
            </div>
            <div className="mb-4">
                <FilterBar onFilterChange={handleFilterChange} />
            </div>
            <div className="flex flex-col gap-4 md:flex-row w-full">
                <div className="flex-1">
                    <ChartComponent data={filteredData} type="seasonBar" />
                </div>
                <div className="flex-1">
                    <ChartComponent data={filteredData} type="levelBar" />
                </div>
            </div>
        </div>
    );
}