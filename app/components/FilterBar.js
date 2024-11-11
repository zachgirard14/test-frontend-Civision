"use client";

import { useState } from 'react';

export default function FilterBar({ onFilterChange }) {
    const [filters, setFilters] = useState({ saison: '', niveau: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        if (onFilterChange) {
            onFilterChange(newFilters);
        }
    };

    return (
        <div className="flex gap-8">
            <label>
                {"Saison: "}
                <select className="" name="saison" onChange={handleInputChange} value={filters.saison}>
                    <option value="">Toutes</option>
                    <option value="été">Été</option>
                    <option value="printemps">Printemps</option>
                    <option value="automne">Automne</option>
                    <option value="hiver">Hiver</option>
                </select>
            </label>
            <label>
                {"Niveau: "}
                <select className="" name="niveau" onChange={handleInputChange} value={filters.niveau}>
                    <option value="">Tous</option>
                    <option value="pro">Pro</option>
                    <option value="moyen">Moyen</option>
                    <option value="novice">Novice</option>
                </select>
            </label>
        </div>
    );
}