"use client";

import Pot from "@/components/Pot";
import { teams } from "./teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { House, Plane } from "lucide-react";

function sortOpponents(team: any, pots: any) {
  const selectedOpponents: any[] = [];
  const selectedCountries: { [key: string]: number } = {};

  // Função auxiliar para verificar se um clube pode ser selecionado
  const canSelectTeam = (opponent: any) => {
    if (team.id === opponent.id) return false; // Mesmo time
    if (opponent.country === team.country) return false; // Mesmo país que o time base
    if (selectedCountries[opponent.country] && selectedCountries[opponent.country] >= 2) return false; // Já tem 2 times desse país
    return true;
  };

  // Itera sobre cada pote para sortear 2 times
  pots.forEach((pot: any) => {
    let potOpponents = pot.filter((opponent: any) => canSelectTeam(opponent));

    // Embaralha a lista de times elegíveis
    potOpponents = potOpponents.sort(() => 0.5 - Math.random());

    for (let i = 0; i < 2; i++) {
      const selectedLocation = `${i == 0 ? "h" : "a"}`;
      const selectedOpponent = potOpponents[i];
      selectedOpponents.push([selectedOpponent,selectedLocation]);

      // Atualiza o contador de times por país
      const opponentCountry = selectedOpponent.country;
      if (!selectedCountries[opponentCountry]) {
        selectedCountries[opponentCountry] = 0;
      }
      selectedCountries[opponentCountry]++;
    }
  });

  return selectedOpponents;
}

export default function Home() {
  const [selTeams, setSelTeams] = useState<any[]>();

  const pot1 = [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7], teams[8]];
  const pot2 = [teams[9], teams[10], teams[11], teams[12], teams[13], teams[14], teams[15], teams[16], teams[17]];
  const pot3 = [teams[18], teams[19], teams[20], teams[21], teams[22], teams[23], teams[24], teams[25], teams[26]];
  const pot4 = [teams[27], teams[28], teams[29], teams[30], teams[31], teams[32], teams[33], teams[34], teams[35]];

  return (
    <Container>
      <h1 className="text-center text-xl">League Phase Draw Simulator 2024/2025</h1>
      <div className="flex justify-between gap-8">
        <Pot num={1} teams={pot1} />
        <Pot num={2} teams={pot2} />
        <Pot num={3} teams={pot3} />
        <Pot num={4} teams={pot4} />
      </div>
      <div className="text-center flex flex-col gap-8 items-center">
        <Button className="w-fit bg-white text-[#010056] hover:bg-white/95 gap-1" onClick={() => setSelTeams(sortOpponents(teams[19], [pot1, pot2, pot3, pot4]))}>
          <Image width={100} height={100} className="h-8 w-8" alt="ucl icon" src="/images/uclLogo.svg" />
          <span>Draw Opponents</span>
        </Button>
        <div>
          {selTeams && (
            <div className="border border-white/50 bg-[#0a0a61] rounded-md">
              <div className="border-b-2 border-white/50 p-1 flex items-center gap-2">
                <Image width={100} height={100} className="h-10 w-10" alt={teams[19].name} src={teams[19].logo} />
                <p className="text-lg font-medium">{teams[19].name}</p>
              </div>
              <div>
                {selTeams.map((team: any) => (
                  <div key={team[0].id} className="flex items-center gap-2 p-1">
                    <Image width={100} height={100} className="h-6 w-6" alt={team[0].name} src={team[0].logo} />
                    <p className="text-sm">{team[0].name}</p>{team[1] == "h" && (<House className="h-4 w-4 text-sky-500/95" />)}{team[1] == "a" && (<Plane className="h-4 w-4 text-pink-500/95" />)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}