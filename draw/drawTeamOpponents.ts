// DRAW FOR ONLY ONE TEAM OF COMPETITION
export function drawTeamOpponents(team: any, pots: any) {
    const teamMatches: any = { team: team.name, opponents: [] };
    const selectedCountries: { [key: string]: number } = {};

    // Can opponent be selected
    const canSelectTeam = (opponent: any) => team.id !== opponent.id && opponent.country !== team.country && (selectedCountries[opponent.country] || 0) < 2;

    // Iterate on each pot to draw 2 opponents
    pots.forEach((pot: Object[]) => {
        const potOpponents = pot.filter(canSelectTeam).sort(() => 0.5 - Math.random());
        potOpponents.slice(0, 2).forEach((opponent: any) => {
            teamMatches.opponents.push(opponent);
            selectedCountries[opponent.country] = (selectedCountries[opponent.country] || 0) + 1;
        });
    });

    return teamMatches;
}