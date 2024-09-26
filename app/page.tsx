"use client";

import Pot from "@/components/Pot";
import { teams } from "./teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import TeamMatches from "@/components/TeamMatches";
import { drawTeamOpponents } from "@/draw/drawTeamOpponents";
import { drawLeagueStage } from "@/draw/drawLeagueStage";

const FormSchema = z.object({
  team: z.string({ required_error: "Select one club" }),
})

export default function Home() {

  const [oneTeamDraw, setOneTeamDraw] = useState(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  // SETTINGS FOR POTS
  const pot1 = [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7], teams[8]];
  const pot2 = [teams[9], teams[10], teams[11], teams[12], teams[13], teams[14], teams[15], teams[16], teams[17]];
  const pot3 = [teams[18], teams[19], teams[20], teams[21], teams[22], teams[23], teams[24], teams[25], teams[26]];
  const pot4 = [teams[27], teams[28], teams[29], teams[30], teams[31], teams[32], teams[33], teams[34], teams[35]];
  const pots = [pot1, pot2, pot3, pot4];

  drawLeagueStage(pots);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setOneTeamDraw(drawTeamOpponents(teams[Number(data.team)], pots))
  }

  return (
    <Container>
      <h1 className="text-center text-2xl font-champions">League Phase Draw Simulator 2024/2025</h1>
      <div className="flex justify-between gap-8">
        <Pot num={1} teams={pot1} />
        <Pot num={2} teams={pot2} />
        <Pot num={3} teams={pot3} />
        <Pot num={4} teams={pot4} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-center flex flex-col gap-8 items-center">
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-[#0a0a61] max-w-96 border-white/50">
                      <SelectValue placeholder="Select one club" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {teams.map((team, index) => (
                        <SelectItem key={team.id} value={index.toString()}>{team.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-white text-[#010056] hover:bg-white/95 gap-1">
            <Image width={100} height={100} className="h-8 w-8" alt="ucl icon" src="/images/uclLogo.svg" />
            <span>Draw Opponents</span>
          </Button>
        </form>
      </Form>

      {oneTeamDraw !== null && (
        <TeamMatches draw={oneTeamDraw} />
      )}

    </Container>
  );
}