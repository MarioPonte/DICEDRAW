"use client";

import Pot from "@/components/Pot";
import { teams } from "./teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function sortOpponents(pots: any) {
  const matches:any = []; // Array para armazenar os confrontos
  const teamsPerPot = pots.flat(); // Juntar todos os potes numa única lista de equipas
  
  teamsPerPot.forEach((team: any) => {
    const opponents = [];
    const usedTeams = new Set(); // Para evitar equipas repetidas ou do mesmo país

    for (let i = 0; i < pots.length; i++) {
      // Selecionar 2 adversários de cada pote (exceto do pote da própria equipa)
      const availableTeams = pots[i].filter(
        (opponent: any) => 
          opponent.id !== team.id && // Evitar que a equipa jogue contra si própria
          opponent.country !== team.country && // Evitar equipas do mesmo país
          !usedTeams.has(opponent.id) // Evitar equipas repetidas
      );

      // Randomizar e escolher 2 equipas disponíveis do pote atual
      while (opponents.length < (i + 1) * 2 && availableTeams.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableTeams.length);
        const chosenOpponent = availableTeams.splice(randomIndex, 1)[0]; // Retira equipa do array
        opponents.push(chosenOpponent);
        usedTeams.add(chosenOpponent.id); // Marca equipa como já usada
      }
    }

    // Armazenar os confrontos dessa equipa
    matches.push({
      team: team.name,
      opponents: opponents.map((opponent: any) => opponent.name),
    });
  });

  // Exibir os confrontos no console para revisão
  console.log(matches);
  return matches;
}

export default function Home() {

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