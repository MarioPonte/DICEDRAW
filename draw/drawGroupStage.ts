interface Team {
    name: string;
    country: string;
}

type Pots = Team[][];

export function drawGroupStage(pots: Pots) {
    const RED_GROUPS = [0, 1, 2, 3];
    const BLUE_GROUPS = [4, 5, 6, 7];
    
    // Função auxiliar para realizar o sorteio
    const draw = (pots: Pots, nbrOfGroups: number): Team[][] => {
        const groups: Team[][] = Array.from({ length: nbrOfGroups }, () => []);

        // Conta o número de equipas por país para definir o emparelhamento
        const countryCount = pots.flat().reduce((acc: Record<string, number>, team: Team) => {
            acc[team.country] = (acc[team.country] || 0) + 1;
            return acc;
        }, {});

        // Define pares de emparelhamento por país com base nas regras
        const pairedTeams = Object.keys(countryCount).reduce((acc: Record<string, Team[][]>, country: string) => {
            const teams = pots.flat().filter((team: Team) => team.country === country);

            if (countryCount[country] === 2) acc[country] = [[teams[0], teams[1]]];
            else if (countryCount[country] === 3) acc[country] = [[teams[0], teams[1]]]; // Apenas dois clubes emparelhados
            else if (countryCount[country] >= 4) acc[country] = [[teams[0], teams[1]], [teams[2], teams[3]]]; // Dois emparelhamentos para 4 ou mais clubes
            return acc;
        }, {});

        for (let potIndex = 0; potIndex < pots.length; potIndex++) {
            const pot = pots[potIndex];

            for (let i = 0; i < pot.length; i++) {
                const team = pot[i];

                // Verifica se o clube tem algum par de emparelhamento
                const teamPair = Object.values(pairedTeams).flat().find((pair: Team[]) => pair.includes(team));

                // Define os grupos disponíveis com base no emparelhamento de cores
                let candidateGroups: number[];
                if (teamPair) {
                    const isPairedInRed = teamPair.some((t: Team) => RED_GROUPS.some(g => groups[g].includes(t)));
                    const isPairedInBlue = teamPair.some((t: Team) => BLUE_GROUPS.some(g => groups[g].includes(t)));

                    if (isPairedInRed) {
                        candidateGroups = BLUE_GROUPS.filter(
                            g => groups[g].length === potIndex && groups[g].every((member: Team) => member.country !== team.country)
                        );
                    } else if (isPairedInBlue) {
                        candidateGroups = RED_GROUPS.filter(
                            g => groups[g].length === potIndex && groups[g].every((member: Team) => member.country !== team.country)
                        );
                    } else {
                        candidateGroups = RED_GROUPS.concat(BLUE_GROUPS).filter(
                            g => groups[g].length === potIndex && groups[g].every((member: Team) => member.country !== team.country)
                        );
                    }
                } else {
                    candidateGroups = RED_GROUPS.concat(BLUE_GROUPS).filter(
                        g => groups[g].length === potIndex && groups[g].every((member: Team) => member.country !== team.country)
                    );
                }

                // Se não há grupos válidos para esta equipa, recomeçar o sorteio
                if (candidateGroups.length < 1) return draw(pots, nbrOfGroups);

                // Seleciona aleatoriamente um grupo válido e adiciona a equipa
                const selectedGroup = candidateGroups[Math.floor(Math.random() * candidateGroups.length)];
                groups[selectedGroup].push(team);
            }
        }

        return groups;
    };

    const drawData = draw(pots, 8);
    return drawData;
}