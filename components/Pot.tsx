import { Card } from "./ui/card";

interface PotProps {
    num: number;
    teams: any;
}

const Pot: React.FC<PotProps> = ({ num, teams }) => {
    return (
        <Card>
            <p className="text-lg font-medium border-b p-1">Pot {num}</p>
            <div className="flex flex-col gap-1 p-1">
                {teams.map((team: any) => (
                    <div key={team.id} className="flex items-center gap-2 p-1">
                        <p>{team.name}</p>
                        <span className="text-neutral-300 text-xs">{team.country}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default Pot;