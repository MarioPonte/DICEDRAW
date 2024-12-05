"use client";

import Pot from "@/components/Pot";
import Container from "@/components/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SeasonSelect from "@/components/ui/season-select";
import { drawFCWCGroupStage } from "@/draw/drawFCWCGroupStage";
import { Button } from "@/components/ui/button";
import GroupStage from "@/components/GroupStage";
import { pots } from "./pots";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {

  const router = useRouter();
  const [season, setSeason] = useState("2025")
  const [groupStageDraw, setGroupStageDraw] = useState<object[][] | undefined>(undefined)

  const handleSeasonChange = (selSeason: string) => {
    setSeason(selSeason);
    router.push(`/fcwc/${selSeason}`);
  };

  return (
    <Container>
      <SeasonSelect selSeason={season} onSeasonChange={handleSeasonChange} seasons={["2025"]} />

      <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-4 md:gap-10 mx-2">
        <Pot num={1} teams={pots[0]} />
        <Pot num={2} teams={pots[1]} />
        <Pot num={3} teams={pots[2]} />
        <Pot num={4} teams={pots[3]} />
      </div>

      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Draw Group Stage</CardTitle>
          <CardDescription>
            Simulate the competition groups now! Just click the button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" className="w-full" onClick={() => setGroupStageDraw(drawFCWCGroupStage(pots))}>Draw Group Stage</Button>
        </CardContent>
      </Card>

      {groupStageDraw !== undefined && <GroupStage drawData={groupStageDraw} />}

    </Container>
  );
}