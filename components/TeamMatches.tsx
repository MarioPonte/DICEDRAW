import Image from "next/image"

interface TeamMatchesProps {
    draw: any;
}

const TeamMatches: React.FC<TeamMatchesProps> = ({ draw }) => {
    return (
        <div className="border border-white/50 rounded-md bg-[#0a0a61] w-full">
            <p className="text-lg font-medium border-b-2 border-white/50 p-1">{draw.team}</p>
            <div className="flex flex-col gap-1 p-1">
                {draw.opponents.map((opponent: any) => (
                    <div key={opponent.id} className="flex items-center gap-2 p-1">
                        <Image width={100} height={100} className="h-8 w-8" alt={opponent.name} src={opponent.logo} />
                        <p>{opponent.name}</p>
                        <span className="text-white/25 text-xs">{opponent.country}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamMatches;