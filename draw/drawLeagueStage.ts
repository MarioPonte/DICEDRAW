type Team = {
    id: number;
    name: string;
    country: string;
};

type teamMatches = {
    team: string;
    home: string[];
    away: string[];
    selectedCountries: { [country: string]: number };
};

// Função para sortear os jogos de todas as equipas da competição
export function drawLeagueStage(pots: any): teamMatches[] | null {
    let drawData: teamMatches[] | null = null;

    while (!drawData) drawData = attemptDraw(pots);
    console.log(`Sorteio concluído com sucesso`);
    return drawData;
}

function attemptDraw(pots: any): teamMatches[] | null {
    let drawData: teamMatches[] = [];

    // Inicializamos o array com as equipas e confrontos vazios
    pots.forEach((pot: any) => {
        pot.forEach((team: any) => drawData[team.id] = { team: team.name, home: [], away: [], selectedCountries: {} });
    });

    let pot1TeamsAvailable = [[...pots[0]], [...pots[0]], [...pots[0]], [...pots[0]]];
    let pot2TeamsAvailable = [[...pots[1]], [...pots[1]], [...pots[1]], [...pots[1]]];
    let pot3TeamsAvailable = [[...pots[2]], [...pots[2]], [...pots[2]], [...pots[2]]];
    let pot4TeamsAvailable = [[...pots[3]], [...pots[3]], [...pots[3]], [...pots[3]]];

    // Função de backtracking
    const backtrack = (teamIndex: number, pot: any, potTeamsAvailable: any): boolean => {
        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= 9) return true;

        const potTeam = pot[teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: Team) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = potTeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id]; // Dados do adversário

            // Atualizamos os contadores de países para ambos os times
            drawData[potTeam.id].selectedCountries[opponent.country] = (drawData[potTeam.id].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Tenta adicionar o adversário
            drawData[potTeam.id].home.push(opponent);
            drawData[opponent.id].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = potTeamsAvailable.indexOf(opponent);
            if (index > -1) potTeamsAvailable.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (backtrack(teamIndex + 1, pot, potTeamsAvailable)) return true;

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id].home.pop();
            drawData[opponent.id].away.pop();
            potTeamsAvailable.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    if (!backtrack(0, pots[0], pot1TeamsAvailable[0]) || !backtrack(0, pots[0], pot2TeamsAvailable[0]) || !backtrack(0, pots[0], pot3TeamsAvailable[0]) || !backtrack(0, pots[0], pot4TeamsAvailable[0]) ||
        !backtrack(0, pots[1], pot1TeamsAvailable[1]) || !backtrack(0, pots[1], pot2TeamsAvailable[1]) || !backtrack(0, pots[1], pot3TeamsAvailable[1]) || !backtrack(0, pots[1], pot4TeamsAvailable[1]) ||
        !backtrack(0, pots[2], pot1TeamsAvailable[2]) || !backtrack(0, pots[2], pot2TeamsAvailable[2]) || !backtrack(0, pots[2], pot3TeamsAvailable[2]) || !backtrack(0, pots[2], pot4TeamsAvailable[2]) ||
        !backtrack(0, pots[3], pot1TeamsAvailable[3]) || !backtrack(0, pots[3], pot2TeamsAvailable[3]) || !backtrack(0, pots[3], pot3TeamsAvailable[3]) || !backtrack(0, pots[3], pot4TeamsAvailable[3])) {
        console.log("Não foi possível encontrar um sorteio válido.");
        return null;
    }

    return drawData;
}