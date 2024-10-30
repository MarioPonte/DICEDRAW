"use client";

import Pot from "@/components/Pot";
import { teams } from "../../teams";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
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
import TeamLeagueMatches from "@/components/TeamLeagueMatches";

const FormSchema = z.object({
    team: z.string({ required_error: "Select one club" }),
})

export default function Page() {

    const [oneTeamDraw, setOneTeamDraw] = useState(null)
    const [leagueStageDraw, setLeagueStageDraw] = useState<any | null>(null)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    // SETTINGS FOR POTS
    const pot1 = [teams[36], teams[37], teams[38], teams[39], teams[40], teams[41], teams[42], teams[43], teams[44]];
    const pot2 = [teams[45], teams[46], teams[47], teams[48], teams[49], teams[50], teams[51], teams[52], teams[53]];
    const pot3 = [teams[54], teams[55], teams[56], teams[57], teams[58], teams[59], teams[60], teams[61], teams[62]];
    const pot4 = [teams[63], teams[64], teams[65], teams[66], teams[67], teams[68], teams[69], teams[70], teams[71]];
    const pots = [pot1, pot2, pot3, pot4];

    //drawLeagueStage(pots);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setOneTeamDraw(drawTeamOpponents(teams[Number(data.team)], pots))
    }

    return (
        <Container>
            <div className="flex justify-between gap-10">
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
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select one club" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {teams.map((team, index) => (
                                                <SelectItem key={team.id} value={index.toString()}>
                                                    <div className="flex items-center gap-1">
                                                        <img src={`https://flagcdn.com/${team.country}.svg`} alt={`${team.country} Flag`} className="w-4 h-3 border" />
                                                        <span>{team.name}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Draw Opponents</Button>
                </form>
            </Form>

            {oneTeamDraw !== null && <TeamMatches draw={oneTeamDraw} />}

            <Button type="button" onClick={() => setLeagueStageDraw(drawLeagueStage(pots))}>Draw League Stage</Button>
            {leagueStageDraw !== null && <TeamLeagueMatches drawData={leagueStageDraw} />}

        </Container>
    );
}