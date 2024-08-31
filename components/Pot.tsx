import Image from "next/image"

interface PotProps {
    num: number;
    teams: any;
}

const Pot: React.FC<PotProps> = ({ num, teams }) => {
    return (
        <div className="border border-white/50 rounded-md bg-[#0a0a61] w-full">
            <p className="text-lg font-medium border-b-2 border-white/50 p-1">Pot {num}</p>
            <div className="flex flex-col gap-1 p-1">
                {teams.map((team: any) => (
                    <div key={team.id} className="flex items-center gap-2 p-1">
                        <Image width={100} height={100} className="h-8 w-8" alt={team.name} src={team.logo} />
                        <p>{team.name}</p>
                        <span className="text-white/25 text-xs">{team.country}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Pot;