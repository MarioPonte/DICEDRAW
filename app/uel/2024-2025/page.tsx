"use client";

import Pot from "@/components/Pot";
import { teams } from "../../teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { drawLeagueStage } from "@/draw/drawLeagueStage";
import TeamLeagueMatches from "@/components/TeamLeagueMatches";
import OneTeamLDraw from "@/components/OneTeamLDraw";

export default function Page() {

    const [leagueStageDraw, setLeagueStageDraw] = useState<any | null>(null);

    // SETTINGS FOR POTS
    const pot1 = [teams[36], teams[37], teams[38], teams[39], teams[40], teams[41], teams[42], teams[43], teams[44]];
    const pot2 = [teams[45], teams[46], teams[47], teams[48], teams[49], teams[50], teams[51], teams[52], teams[53]];
    const pot3 = [teams[54], teams[55], teams[56], teams[57], teams[58], teams[59], teams[60], teams[61], teams[62]];
    const pot4 = [teams[63], teams[64], teams[65], teams[66], teams[67], teams[68], teams[69], teams[70], teams[71]];
    const pots = [pot1, pot2, pot3, pot4];

    return (
        <Container>
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