export default function PriceDisplay({ data = [] }) {
    const totalPrix = data.reduce((sum, item) => sum + (item.prix || 0), 0);
    const moyennePrix = data.length > 0 ? (totalPrix / data.length).toFixed(2) : 0;

    return (
        <div className="text-2xl">
            <h3>Prix Moyen : {moyennePrix} $</h3>
        </div>
    );
}