"use client";

import Pot from "@/components/Pot";
import { uefaTeams } from "./teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { drawLeagueStage } from "@/draw/drawLeagueStage";
import TeamLeagueMatches from "@/components/TeamLeagueMatches";
import OneTeamLDraw from "@/components/OneTeamLDraw";
import { useRouter } from "next/navigation";
import SeasonSelect from "@/components/ui/season-select";

export default function Home() {

  const router = useRouter();
  const [season, setSeason] = useState("2024-2025");
  const [leagueStageDraw, setLeagueStageDraw] = useState<any | null>(null);

  // SETTINGS FOR POTS
  const pot1 = [uefaTeams[0], uefaTeams[1], uefaTeams[2], uefaTeams[3], uefaTeams[4], uefaTeams[5], uefaTeams[6], uefaTeams[7], uefaTeams[8]];
  const pot2 = [uefaTeams[9], uefaTeams[10], uefaTeams[11], uefaTeams[12], uefaTeams[13], uefaTeams[14], uefaTeams[15], uefaTeams[16], uefaTeams[17]];
  const pot3 = [uefaTeams[18], uefaTeams[19], uefaTeams[20], uefaTeams[21], uefaTeams[22], uefaTeams[23], uefaTeams[24], uefaTeams[25], uefaTeams[26]];
  const pot4 = [uefaTeams[27], uefaTeams[28], uefaTeams[29], uefaTeams[30], uefaTeams[31], uefaTeams[32], uefaTeams[33], uefaTeams[34], uefaTeams[35]];
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