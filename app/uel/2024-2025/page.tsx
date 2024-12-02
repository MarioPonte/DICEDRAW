"use client";

import Pot from "@/components/Pot";
import { uefaTeams } from "../../teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { drawLeagueStage } from "@/draw/drawLeagueStage";
import TeamLeagueMatches from "@/components/TeamLeagueMatches";
import OneTeamLDraw from "@/components/OneTeamLDraw";
import { useRouter } from "next/navigation";
import SeasonSelect from "@/components/ui/season-select";

export default function Page() {

    const router = useRouter();
    const [season, setSeason] = useState("2024-2025");
    const [leagueStageDraw, setLeagueStageDraw] = useState<any | null>(null);

    // SETTINGS FOR POTS
    const pot1 = [uefaTeams[36], uefaTeams[37], uefaTeams[38], uefaTeams[39], uefaTeams[40], uefaTeams[41], uefaTeams[42], uefaTeams[43], uefaTeams[44]];
    const pot2 = [uefaTeams[45], uefaTeams[46], uefaTeams[47], uefaTeams[48], uefaTeams[49], uefaTeams[50], uefaTeams[51], uefaTeams[52], uefaTeams[53]];
    const pot3 = [uefaTeams[54], uefaTeams[55], uefaTeams[56], uefaTeams[57], uefaTeams[58], uefaTeams[59], uefaTeams[60], uefaTeams[61], uefaTeams[62]];
    const pot4 = [uefaTeams[63], uefaTeams[64], uefaTeams[65], uefaTeams[66], uefaTeams[67], uefaTeams[68], uefaTeams[69], uefaTeams[70], uefaTeams[71]];
    const pots = [pot1, pot2, pot3, pot4];

    const handleSeasonChange = (selSeason: string) => {
        setSeason(selSeason);
        router.push(`/uel/${selSeason}`);
    };

    return (
        <Container>
            <SeasonSelect selSeason={season} onSeasonChange={handleSeasonChange} seasons={["2024-2025"]} />

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