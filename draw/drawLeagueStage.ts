// DRAW FOR ALL THE TEAMS OF COMPETITION
export function drawLeagueStage(pots: any) {

    // Collect data of the draw for all teams
    let drawData: any = [];

    // Go through each pot
    pots.forEach((pot: any) => {
        let potTeamsAvailable = [...pot]; // Make a copy to manipulate available teams

        // Go through each team of each pot
        pot.forEach((team: any) => {
            const teamHomeMatches: any = { team: team.name, opponents: [] };

            const selectedCountries: { [key: string]: number } = {};
            // Can opponent be selected
            const canSelectTeam = (opponent: any) => team.id !== opponent.id && opponent.country !== team.country && (selectedCountries[opponent.country] || 0) < 2;

            // draw home opponent
            const potOpponents = potTeamsAvailable.filter(canSelectTeam).sort(() => 0.5 - Math.random());
            potOpponents.slice(0, 1).forEach((opponent: any) => {
                teamHomeMatches.opponents.push(opponent);
                selectedCountries[opponent.country] = (selectedCountries[opponent.country] || 0) + 1;

                const index = potTeamsAvailable.indexOf(opponent);
                if (index > -1) potTeamsAvailable.splice(index, 1);
            });

            drawData.push(teamHomeMatches);
        });
    });

    console.log(drawData);

}