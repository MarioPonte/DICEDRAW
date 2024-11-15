"use client";

import Pot from "@/components/Pot";
import { teams } from "@/app/teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { drawLeagueStage } from "@/draw/drawLeagueStage";
import TeamLeagueMatches from "@/components/TeamLeagueMatches";
import SeasonSelect from "@/components/ui/season-select";
import OneTeamLDraw from "@/components/OneTeamLDraw";

export default function Page() {

  const router = useRouter();
  const [season, setSeason] = useState("2024-2025");
  const [leagueStageDraw, setLeagueStageDraw] = useState<any | null>(null);

  // SETTINGS FOR POTS
  const pot1 = [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7], teams[8]];
  const pot2 = [teams[9], teams[10], teams[11], teams[12], teams[13], teams[14], teams[15], teams[16], teams[17]];
  const pot3 = [teams[18], teams[19], teams[20], teams[21], teams[22], teams[23], teams[24], teams[25], teams[26]];
  const pot4 = [teams[27], teams[28], teams[29], teams[30], teams[31], teams[32], teams[33], teams[34], teams[35]];
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

      <OneTeamLDraw pots={pots} />

      <Button type="button" className="mx-2" onClick={() => setLeagueStageDraw(drawLeagueStage(pots))}>Draw League Stage</Button>
      {leagueStageDraw !== null && <TeamLeagueMatches drawData={leagueStageDraw} />}

    </Container>
  );
}