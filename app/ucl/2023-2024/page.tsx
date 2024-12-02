"use client";

import Pot from "@/components/Pot";
import { uefaTeams } from "@/app/teams";
import Container from "@/components/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SeasonSelect from "@/components/ui/season-select";
import { drawGroupStage } from "@/draw/drawGroupStage";
import { Button } from "@/components/ui/button";
import GroupStage from "@/components/GroupStage";

export default function Page() {

  const router = useRouter();
  const [season, setSeason] = useState("2023-2024")
  const [groupStageDraw, setGroupStageDraw] = useState<any | undefined>(undefined)

  // SETTINGS FOR POTS
  const pot1 = [uefaTeams[0], uefaTeams[72], uefaTeams[8], uefaTeams[73], uefaTeams[1], uefaTeams[3], uefaTeams[13], uefaTeams[18]];
  const pot2 = [uefaTeams[2], uefaTeams[37], uefaTeams[5], uefaTeams[6], uefaTeams[10], uefaTeams[7], uefaTeams[38], uefaTeams[14]];
  const pot3 = [uefaTeams[16], uefaTeams[22], uefaTeams[17], uefaTeams[47], uefaTeams[20], uefaTeams[42], uefaTeams[24], uefaTeams[74]];
  const pot4 = [uefaTeams[25], uefaTeams[45], uefaTeams[55], uefaTeams[26], uefaTeams[75], uefaTeams[76], uefaTeams[77], uefaTeams[78]];
  const pots = [pot1, pot2, pot3, pot4];

  const handleSeasonChange = (selSeason: string) => {
    setSeason(selSeason);
    router.push(`/ucl/${selSeason}`);
  };

  return (
    <Container>
      <SeasonSelect selSeason={season} onSeasonChange={handleSeasonChange} seasons={["2024-2025", "2023-2024"]} />

      <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 md:gap-10 px-2">
        <Pot num={1} teams={pot1} />
        <Pot num={2} teams={pot2} />
        <Pot num={3} teams={pot3} />
        <Pot num={4} teams={pot4} />
      </div>

      <Button type="button" className="mx-2" onClick={() => setGroupStageDraw(drawGroupStage(pots))}>Draw Group Stage</Button>

      {groupStageDraw !== undefined && <GroupStage drawData={groupStageDraw} />}

    </Container>
  );
}