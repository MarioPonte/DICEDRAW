export function drawGroupStage(pots: any) {
    const draw = (pots: any, nbrOfGroups: number) => {
        const groups = Array.from({ length: nbrOfGroups }, () => [])

        for (let potIndex = 0; potIndex < pots.length; potIndex++) {
            const pot = pots[potIndex]

            for (let i = 0; i < pot.length; i++) {
                const team = pot[i]
                const candidateGroups: any = groups.filter(
                    group => group.length === potIndex && group.every((member: { country: string }) => member.country !== team.country)
                )

                // Se não há grupos válidos para esta equipa, recomeçar o sorteio
                if (candidateGroups.length < 1) return draw(pots, nbrOfGroups)

                // Seleciona aleatoriamente um grupo válido e adiciona a equipa
                candidateGroups[Math.floor(Math.random() * candidateGroups.length)].push(team)
            }
        }

        return groups
    }

    const drawData = draw(pots, 8);
    return drawData
}
