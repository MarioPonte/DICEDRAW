"use client";

import Pot from "@/components/Pot";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { drawLeagueStage } from "@/draw/drawLeagueStage";
import TeamLeagueMatches from "@/components/TeamLeagueMatches";
import OneTeamLDraw from "@/components/OneTeamLDraw";
import { useRouter } from "next/navigation";
import SeasonSelect from "@/components/ui/season-select";
import { pots } from "./pots";

export default function Page() {

    const router = useRouter();
    const [season, setSeason] = useState("2024-2025");
    const [leagueStageDraw, setLeagueStageDraw] = useState<object[] | null>(null);

    const handleSeasonChange = (selSeason: string) => {
        setSeason(selSeason);
        router.push(`/uel/${selSeason}`);
    };

    return (
        <Container>
            <SeasonSelect selSeason={season} onSeasonChange={handleSeasonChange} seasons={["2024-2025", "2023-2024"]} />

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