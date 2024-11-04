export function drawGroupStage(pots: any) {
    const draw = (pots: any, nbrOfGroups: number) => {
        const teams = pots.flatMap((p: any, i: any) => p.map((x: any) => ({ ...x, pot: i + 1 })))
            .sort(({ country: a }: any, { country: b }: any) => a < b ? - 1 : a > b ? 1 : 0)
        const groups = Array.from({ length: nbrOfGroups }, _ => [])
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i]
            const candidateGroups: any = groups.filter(
                group => group.length < teams.length / nbrOfGroups
                    && group.every((member: any) => member.country !== team.country && member.pot !== team.pot)
            )
            if (candidateGroups.length < 1) return draw(pots, nbrOfGroups) // try over
            candidateGroups[Math.floor(Math.random() * candidateGroups.length)].push(team)
        }
        return groups
    }

    let drawData = draw(pots, 8);

    console.log(drawData);

    return drawData;
}