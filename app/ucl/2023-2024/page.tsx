"use client";

import Pot from "@/components/Pot";
import { teams } from "@/app/teams";
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
  const pot1 = [teams[0], teams[72], teams[8], teams[73], teams[1], teams[3], teams[13], teams[18]];
  const pot2 = [teams[2], teams[37], teams[5], teams[6], teams[10], teams[7], teams[38], teams[14]];
  const pot3 = [teams[16], teams[22], teams[17], teams[47], teams[20], teams[42], teams[24], teams[74]];
  const pot4 = [teams[25], teams[45], teams[55], teams[26], teams[75], teams[76], teams[77], teams[78]];
  const pots = [pot1, pot2, pot3, pot4];

  const handleSeasonChange = (selSeason: string) => {
    setSeason(selSeason);
    router.push(`/ucl/${selSeason}`);
  };

  return (
    <Container>
      <SeasonSelect selSeason={season} onSeasonChange={handleSeasonChange} seasons={["2024-2025", "2023-2024"]} />

      <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 md:gap-10 mx-2">
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