"use client";

import Pot from "@/components/Pot";
import { afcTeams, cafTeams, concacafTeams, conmebolTeams, ofcTeams, teams } from "@/app/teams";
import Container from "@/components/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SeasonSelect from "@/components/ui/season-select";
import { drawGroupStage } from "@/draw/drawGroupStage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Page() {

  const router = useRouter();
  const [season, setSeason] = useState("2025")
  const [groupStageDraw, setGroupStageDraw] = useState<any | undefined>(undefined)

  // SETTINGS FOR POTS
  const pot1 = [teams[79], teams[2], teams[0], teams[1], afcTeams[0], conmebolTeams[0], conmebolTeams[1], conmebolTeams[2]];
  const pot2 = [teams[6], teams[10], teams[12], teams[22], conmebolTeams[3], teams[5], teams[38], teams[13],];
  const pot3 = [conmebolTeams[4], teams[3], afcTeams[1], afcTeams[2], afcTeams[3], cafTeams[0], cafTeams[1], cafTeams[2]];
  const pot4 = [cafTeams[3], concacafTeams[0], concacafTeams[1], concacafTeams[2], concacafTeams[3], concacafTeams[4], ofcTeams[0], teams[78]];
  const pots = [pot1, pot2, pot3, pot4];

  const handleSeasonChange = (selSeason: string) => {
    setSeason(selSeason);
    router.push(`/fcwc/${selSeason}`);
  };

  // Função para converter índice em letras de A a H
  const getGroupLetter = (index: number) => String.fromCharCode(65 + index);

  return (
    <Container>
      <SeasonSelect selSeason={season} onSeasonChange={handleSeasonChange} seasons={["2025"]} />

      <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 md:gap-10 mx-2">
        <Pot num={1} teams={pot1} />
        <Pot num={2} teams={pot2} />
        <Pot num={3} teams={pot3} />
        <Pot num={4} teams={pot4} />
      </div>

      <Button type="button" className="mx-2" onClick={() => setGroupStageDraw(drawGroupStage(pots))}>Draw Group Stage</Button>

      <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 md:gap-10 mx-2">
        {groupStageDraw !== undefined && groupStageDraw.map((group: any, index: number) => (
          <Card key={groupStageDraw.indexOf(group)} className="w-full">
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

    </Container>
  );
}