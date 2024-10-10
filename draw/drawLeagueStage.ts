type teamMatches = {
    team: string,
    home: string[],
    away: string[]
}

// Função para sortear os jogos de todas as equipas da competição
export function drawLeagueStage(pots: any) {
    let drawData: teamMatches[] = [];

    pots.forEach((pot: any) => {
        pot.forEach((team: any) => drawData.push({ team: team, home: [], away: [] }));
    });

    pots.forEach((pot: any) => {
        let potTeamsAvailable = [...pot];
        const selectedCountries: { [key: string]: number } = {};

        drawData.forEach((data: any) => {
            

            const canSelectTeam = (opponent: any) => data.team.id !== opponent.id && data.team.country !== opponent.country && (selectedCountries[opponent.country] || 0) < 2
            const potOpponents = potTeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

            data.home.push(potOpponents[0]);
            data.away.push(potOpponents[1]);
        });
    });

    console.log(drawData);
}