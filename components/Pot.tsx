import { Card } from "./ui/card";

interface PotProps {
    num: number;
    teams: any;
}

const Pot: React.FC<PotProps> = ({ num, teams }) => {
    return (
        <Card className="w-full">
            <p className="text-md md:text-lg font-medium border-b p-1">Pot {num}</p>
            <div className="flex flex-col gap-1 p-1">
                {teams.map((team: any) => (
                    <div key={team.id} className="flex items-center gap-2 p-1">
                        <img src={`https://flagcdn.com/${team.country}.svg`} alt={`${team.country} Flag`} className="w-4 h-3 border" />
                        <span className="text-xs md:text-sm">{team.name}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default Pot;