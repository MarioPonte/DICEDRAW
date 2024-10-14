type Team = {
    id: number;
    name: string;
    country: string;
};

type teamMatches = {
    team: string;
    home: string[];
    away: string[];
};

// Função para sortear os jogos de todas as equipas da competição
export function drawLeagueStage(pots: any): teamMatches[] | null {
    let drawData: teamMatches[] = [];

    // Inicializamos o array com as equipas e confrontos vazios
    pots.forEach((pot: any) => {
        pot.forEach((team: any) => drawData.push({ team: team.name, home: [], away: [] }));
    });

    let pot1TeamsAvailable = [...pots[0]];
    let pot2TeamsAvailable = [...pots[1]];

    // Função de backtracking
    const backtrack = (teamIndex: number): boolean => {
        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[0].length) return true;

        const potTeam = pots[0][teamIndex];
        const selectedCountries: { [key: string]: number } = {}; // Para controlar o limite de países

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
            (selectedCountries[opponent.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot1TeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot1TeamsAvailable.indexOf(opponent);
            if (index > -1) pot1TeamsAvailable.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (backtrack(teamIndex + 1)) {
                return true;
            }

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot1TeamsAvailable.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    if (!backtrack(0)) {
        console.log("Não foi possível encontrar um sorteio válido.");
        return null;
    }

    const backtrack2 = (teamIndex: number): boolean => {
        // Se todas as equipas já têm adversários, o sorteio foi concluído
        if (teamIndex >= pots[1].length) return true;

        const potTeam = pots[0][teamIndex];
        const selectedCountries: { [key: string]: number } = {}; // Para controlar o limite de países

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
            (selectedCountries[opponent.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = pot2TeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            // Tenta adicionar o adversário
            drawData[potTeam.id - 1].home.push(opponent);
            drawData[opponent.id - 1].away.push(potTeam);

            // Remove o oponente da lista de disponíveis
            const index = pot2TeamsAvailable.indexOf(opponent);
            if (index > -1) pot2TeamsAvailable.splice(index, 1);

            // Chamada recursiva para a próxima equipa
            if (backtrack2(teamIndex + 1)) {
                return true;
            }

            // Se falhar, desfazemos a atribuição e continuamos
            drawData[potTeam.id - 1].home.pop();
            drawData[opponent.id - 1].away.pop();
            pot2TeamsAvailable.splice(index, 0, opponent);
        }

        // Se nenhum adversário válido foi encontrado, retornamos falso para voltar atrás
        return false;
    };

    if (!backtrack2(0)) {
        console.log("Não foi possível encontrar um sorteio válido.");
        return null;
    }

    console.log(drawData);
    return drawData;
}
