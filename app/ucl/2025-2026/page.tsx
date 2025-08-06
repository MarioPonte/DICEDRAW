"use client";

import Pot from "@/components/Pot";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { drawLeagueStage } from "@/draw/drawLeagueStage";
import TeamLeagueMatches from "@/components/TeamLeagueMatches";
import SeasonSelect from "@/components/ui/season-select";
import OneTeamLDraw from "@/components/OneTeamLDraw";
import { pots } from "./pots";

export default function Page() {

  const router = useRouter();
  const [season, setSeason] = useState("2025-2026");
  const [leagueStageDraw, setLeagueStageDraw] = useState<object[] | null>(null);

  const handleSeasonChange = (selSeason: string) => {
    setSeason(selSeason);
    router.push(`/ucl/${selSeason}`);
  };

  return (
    <Container>
      <SeasonSelect selSeason={season} onSeasonChange={handleSeasonChange} seasons={["2025-2026", "2024-2025", "2023-2024"]} />

      <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 md:gap-10 mx-2">
        <Pot num={1} teams={pots[0]} />
        <Pot num={2} teams={pots[1]} />
        <Pot num={3} teams={pots[2]} />
        <Pot num={4} teams={pots[3]} />
      </div>

      <OneTeamLDraw pots={pots} />

      <Button type="button" className="mx-2" onClick={() => setLeagueStageDraw(drawLeagueStage(pots))}>Draw League Stage</Button>
      {leagueStageDraw !== null && <TeamLeagueMatches drawData={leagueStageDraw} />}

    </Container>
  );
}