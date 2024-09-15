"use client";

import Pot from "@/components/Pot";
import { teams } from "./teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function sortOpponents(team: any, pots: any) {
  const teamMatches: any = { team: team.name, opponents: [] };
  const selectedCountries: { [key: string]: number } = {};

  // Função auxiliar para verificar se um clube pode ser selecionado
  const canSelectTeam = (opponent: any) => team.id !== opponent.id && opponent.country !== team.country && (selectedCountries[opponent.country] || 0) < 2;

  // Itera sobre cada pote para sortear 2 times
  pots.forEach((pot: any) => {
    const potOpponents = pot.filter(canSelectTeam).sort(() => 0.5 - Math.random());
    potOpponents.slice(0, 2).forEach((opponent: any) => {
      teamMatches.opponents.push(opponent);
      selectedCountries[opponent.country] = (selectedCountries[opponent.country] || 0) + 1;
    });
  });

  console.log(teamMatches);

  return teamMatches;
}

export default function Home() {

  const pot1 = [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7], teams[8]];
  const pot2 = [teams[9], teams[10], teams[11], teams[12], teams[13], teams[14], teams[15], teams[16], teams[17]];
  const pot3 = [teams[18], teams[19], teams[20], teams[21], teams[22], teams[23], teams[24], teams[25], teams[26]];
  const pot4 = [teams[27], teams[28], teams[29], teams[30], teams[31], teams[32], teams[33], teams[34], teams[35]];

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
        <Select>
          <SelectTrigger className="bg-[#0a0a61] max-w-96 border-white/50">
            <SelectValue placeholder="Select one club" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {teams.map(team => (
                <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="bg-white text-[#010056] hover:bg-white/95 gap-1" onClick={() => sortOpponents(teams[19], [pot1, pot2, pot3, pot4])}>
          <Image width={100} height={100} className="h-8 w-8" alt="ucl icon" src="/images/uclLogo.svg" />
          <span>Draw Opponents</span>
        </Button>
      </div>
    </Container>
  );
}