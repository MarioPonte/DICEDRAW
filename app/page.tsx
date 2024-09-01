"use client";

import Pot from "@/components/Pot";
import { teams } from "./teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

function sortOpponents(pots: any) {
  const selectedOpponents: any[] = [];
  const selectedCountries: { [key: string]: number } = {};

  pots.forEach((pot: any) => {
    pot.forEach((selTeam: any) => {
      const canSelectOpponent = (opponent: any) => {
        if (selTeam.id === opponent.id) return false;
        if (opponent.country === selTeam.country) return false;
        if (selectedCountries[opponent.country] && selectedCountries[opponent.country] >= 2) return false;
        return true;
      };

      let potOpponents = pot.filter((opponent: any) => canSelectOpponent(opponent));
      console.log(potOpponents);
    });
  });

  return selectedOpponents;
}

export default function Home() {
  const [teamsDraw, setTeamsDraw] = useState<any[]>();

  const pot1 = [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7], teams[8]];
  const pot2 = [teams[9], teams[10], teams[11], teams[12], teams[13], teams[14], teams[15], teams[16], teams[17]];
  const pot3 = [teams[18], teams[19], teams[20], teams[21], teams[22], teams[23], teams[24], teams[25], teams[26]];
  const pot4 = [teams[27], teams[28], teams[29], teams[30], teams[31], teams[32], teams[33], teams[34], teams[35]];

  const draw = sortOpponents([pot1, pot2, pot3, pot4]);

  return (
    <Container>
      <h1 className="text-center text-2xl font-champions">League Phase Draw Simulator 2024/2025</h1>
      <div className="flex justify-between gap-8">
        <Pot num={1} teams={pot1} />
        <Pot num={2} teams={pot2} />
        <Pot num={3} teams={pot3} />
        <Pot num={4} teams={pot4} />
      </div>
      <div className="text-center flex flex-col gap-8 items-center">
        <Button className="w-fit bg-white text-[#010056] hover:bg-white/95 gap-1" onClick={() => draw}>
          <Image width={100} height={100} className="h-8 w-8" alt="ucl icon" src="/images/uclLogo.svg" />
          <span>Draw Opponents</span>
        </Button>
      </div>
    </Container>
  );
}