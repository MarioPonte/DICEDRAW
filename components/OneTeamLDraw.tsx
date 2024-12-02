"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const FormSchema = z.object({
    team: z.string({ required_error: "Select one club" }),
})

interface OneTeamLDrawProps {
    pots: any;
}

const OneTeamLDraw: React.FC<OneTeamLDrawProps> = ({ pots }) => {
    const [oneTeamDraw, setOneTeamDraw] = useState(null);

    let tournamentTeams: any = [];
    pots.forEach((pot: any) => pot.forEach((team: any) => tournamentTeams.push(team)));

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setOneTeamDraw(drawTeamOpponents(tournamentTeams[Number(data.team)], pots))
    }

    return (
        <div className="m-auto">
            <Card className="w-fit mx-2">
                <CardHeader>
                    <CardTitle>
                        One team draw
                    </CardTitle>
                    <CardDescription>
                        Draw for one specific team.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4 ">
                            <FormField
                                control={form.control}
                                name="team"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-64">
                                                    <SelectValue placeholder="Select one team" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {tournamentTeams.map((team: any, index: any) => (
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
                </CardContent>
            </Card>

            {oneTeamDraw !== null && <TeamMatches draw={oneTeamDraw} />}
        </div>
    );
}

export default OneTeamLDraw;