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
                        <p>{opponent.name}</p>
                        <span className="text-white/25 text-xs">{opponent.country}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default TeamMatches;