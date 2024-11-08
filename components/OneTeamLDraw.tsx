"use client";

import { teams } from "@/app/teams";
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

const FormSchema = z.object({
    team: z.string({ required_error: "Select one club" }),
})

interface OneTeamLDrawProps {
    pots: any;
}

const OneTeamLDraw: React.FC<OneTeamLDrawProps> = ({ pots }) => {
    const [oneTeamDraw, setOneTeamDraw] = useState(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setOneTeamDraw(drawTeamOpponents(teams[Number(data.team)], pots))
    }

    return (
        <>
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
        </>
    );
}

export default OneTeamLDraw;