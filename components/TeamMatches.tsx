import { Card } from "./ui/card";

interface TeamMatchesProps {
    draw: any;
}

const TeamMatches: React.FC<TeamMatchesProps> = ({ draw }) => {
    return (
        <Card>
            <p className="text-lg font-medium border-b p-1">{draw.team}</p>
            <div className="grid grid-cols-2 gap-1 p-1">
                {draw.opponents.map((opponent: any) => (
                    <div key={opponent.id} className="flex items-center gap-2 p-1">
                        <img src={`https://flagcdn.com/${opponent.country}.svg`} alt={`${opponent.country} Flag`} className="w-4 h-3 border" />
                        <p>{opponent.name}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default TeamMatches;