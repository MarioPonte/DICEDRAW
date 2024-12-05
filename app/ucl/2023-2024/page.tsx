"use client";

import Pot from "@/components/Pot";
import Container from "@/components/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SeasonSelect from "@/components/ui/season-select";
import { drawGroupStage } from "@/draw/drawGroupStage";
import { Button } from "@/components/ui/button";
import GroupStage from "@/components/GroupStage";
import { pots } from "./pots";

export default function Page() {

  const router = useRouter();
  const [season, setSeason] = useState("2023-2024")
  const [groupStageDraw, setGroupStageDraw] = useState<object[][] | undefined>(undefined)

  const handleSeasonChange = (selSeason: string) => {
    setSeason(selSeason);
    router.push(`/ucl/${selSeason}`);
  };

  return (
    <Container>
      <SeasonSelect selSeason={season} onSeasonChange={handleSeasonChange} seasons={["2024-2025", "2023-2024"]} />

      <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 md:gap-10 px-2">
        <Pot num={1} teams={pots[0]} />
        <Pot num={2} teams={pots[1]} />
        <Pot num={3} teams={pots[2]} />
        <Pot num={4} teams={pots[3]} />
      </div>

      <Button type="button" className="mx-2" onClick={() => setGroupStageDraw(drawGroupStage(pots))}>Draw Group Stage</Button>

      {groupStageDraw !== undefined && <GroupStage drawData={groupStageDraw} />}

    </Container>
  );
}