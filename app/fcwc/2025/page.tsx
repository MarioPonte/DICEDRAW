"use client";

import Pot from "@/components/Pot";
import { afcTeams, cafTeams, concacafTeams, conmebolTeams, ofcTeams, uefaTeams } from "@/app/teams";
import Container from "@/components/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SeasonSelect from "@/components/ui/season-select";
import { drawGroupStage } from "@/draw/drawGroupStage";
import { Button } from "@/components/ui/button";
import GroupStage from "@/components/GroupStage";

export default function Page() {

  const router = useRouter();
  const [season, setSeason] = useState("2025")
  const [groupStageDraw, setGroupStageDraw] = useState<any | undefined>(undefined)

  // SETTINGS FOR POTS
  const pot1 = [uefaTeams[79], uefaTeams[2], uefaTeams[0], uefaTeams[1], afcTeams[0], conmebolTeams[0], conmebolTeams[1], conmebolTeams[2]];
  const pot2 = [uefaTeams[6], uefaTeams[10], uefaTeams[12], uefaTeams[22], conmebolTeams[3], uefaTeams[5], uefaTeams[38], uefaTeams[13],];
  const pot3 = [conmebolTeams[4], uefaTeams[3], afcTeams[1], afcTeams[2], afcTeams[3], cafTeams[0], cafTeams[1], cafTeams[2]];
  const pot4 = [cafTeams[3], concacafTeams[0], concacafTeams[1], concacafTeams[2], concacafTeams[3], concacafTeams[4], ofcTeams[0], conmebolTeams[5]];
  const pots = [pot1, pot2, pot3, pot4];

  const handleSeasonChange = (selSeason: string) => {
    setSeason(selSeason);
    router.push(`/fcwc/${selSeason}`);
  };

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

      {groupStageDraw !== undefined && <GroupStage drawData={groupStageDraw} />}

    </Container>
  );
}