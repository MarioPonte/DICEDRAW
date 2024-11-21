"use client";

import { Card } from "@/components/ui/card";

interface GroupStageProps {
    drawData: any;
}

const GroupStage: React.FC<GroupStageProps> = ({ drawData }) => {
  // Função para converter índice em letras de A a H
  const getGroupLetter = (index: number) => String.fromCharCode(65 + index);

  return (
      <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 md:gap-10 mx-2">
        {drawData !== undefined && drawData.map((group: any, index: number) => (
          <Card key={drawData.indexOf(group)} className="w-full">
            <p className="text-md md:text-lg font-medium border-b p-1">Group {getGroupLetter(index)}</p>
            <div className="flex flex-col gap-1 p-1">
              {group.map((team: any) => (
                <div key={team.id} className="flex items-center gap-2 p-1">
                  <img src={`https://flagcdn.com/${team.country}.svg`} alt={`${team.country} Flag`} className="w-4 h-3 border" />
                  <span className="text-xs md:text-sm">{team.name}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
  );
}

export default GroupStage;