import Image from "next/image"

interface PotProps {
    num: number;
    teams: any;
}

const Pot: React.FC<PotProps> = ({ num, teams }) => {
    return (
        <div className="border-2 border-blue-950">
            <p className="text-lg font-medium border-b-2 border-blue-950 p-1">Pot {num}</p>
            <div>
                {teams.map((team: any) => (
                    <div key={team.id} className="flex items-center gap-2 p-1">
                        <Image width={100} height={100} className="h-8 w-8" alt={team.name} src={team.logo} />
                        <p>{team.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Pot;