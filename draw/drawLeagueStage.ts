type teamMatches = {
    team: string;
    home: object[];
    away: object[];
    selectedCountries: { [country: string]: number };
};

// Function to draw the matches of all the teams in the competition
export function drawLeagueStage(pots: any): teamMatches[] | null {
    let drawData: teamMatches[] | null = null;

    while (!drawData) drawData = attemptDraw(pots);
    console.log(`Draw successfully concluded`);
    return drawData;
}

function attemptDraw(pots: any): teamMatches[] | null {
    let drawData: teamMatches[] = [];

    // Initialization of the array with empty teams and matches
    pots.forEach((pot: any) => pot.forEach((team: any) => drawData[team.id] = { team: team.name, home: [], away: [], selectedCountries: {} }));

    let pot1TeamsAvailable = [[...pots[0]], [...pots[0]], [...pots[0]], [...pots[0]]];
    let pot2TeamsAvailable = [[...pots[1]], [...pots[1]], [...pots[1]], [...pots[1]]];
    let pot3TeamsAvailable = [[...pots[2]], [...pots[2]], [...pots[2]], [...pots[2]]];
    let pot4TeamsAvailable = [[...pots[3]], [...pots[3]], [...pots[3]], [...pots[3]]];

    // Backtracking function
    const backtrack = (teamIndex: number, pot: any, potTeamsAvailable: any): boolean => {
        // If all the teams already have opponents, the draw has been completed
        if (teamIndex >= 9) return true;

        const potTeam = pot[teamIndex];

        // Check if a pair of teams has already played against each other
        const hasPlayedBefore = (team: any, opponent: any): boolean => {
            return drawData.some((match: any) =>
                (match.team === team.name && match.home.includes(opponent)) ||
                (match.team === opponent.name && match.home.includes(team))
            );
        };

        const canSelectTeam = (opponent: { id: number; name: string; country: string; }) =>
            potTeam.id !== opponent.id &&
            potTeam.country !== opponent.country &&
            (drawData[potTeam.id].selectedCountries[opponent.country] || 0) < 2 &&
            (drawData[opponent.id].selectedCountries[potTeam.country] || 0) < 2 &&
            !hasPlayedBefore(potTeam, opponent);

        const potOpponents = potTeamsAvailable.filter(canSelectTeam).sort(() => Math.random() - 0.5);

        for (const opponent of potOpponents) {
            const opponentData = drawData[opponent.id];

            // Update the country counters for both teams
            drawData[potTeam.id].selectedCountries[opponent.country] = (drawData[potTeam.id].selectedCountries[opponent.country] || 0) + 1;
            opponentData.selectedCountries[potTeam.country] = (opponentData.selectedCountries[potTeam.country] || 0) + 1;

            // Try to add the opponent
            drawData[potTeam.id].home.push(opponent);
            drawData[opponent.id].away.push(potTeam);

            // Removes the opponent from the available list
            const index = potTeamsAvailable.indexOf(opponent);
            if (index > -1) potTeamsAvailable.splice(index, 1);

            // Recursive call to the next team
            if (backtrack(teamIndex + 1, pot, potTeamsAvailable)) return true;

            // If it fails, undo the assignment and continue
            drawData[potTeam.id].home.pop();
            drawData[opponent.id].away.pop();
            potTeamsAvailable.splice(index, 0, opponent);
        }

        // If no valid opponent was found, we return false to go back
        return false;
    };

    if (!backtrack(0, pots[0], pot1TeamsAvailable[0]) || !backtrack(0, pots[0], pot2TeamsAvailable[0]) || !backtrack(0, pots[0], pot3TeamsAvailable[0]) || !backtrack(0, pots[0], pot4TeamsAvailable[0]) ||
        !backtrack(0, pots[1], pot1TeamsAvailable[1]) || !backtrack(0, pots[1], pot2TeamsAvailable[1]) || !backtrack(0, pots[1], pot3TeamsAvailable[1]) || !backtrack(0, pots[1], pot4TeamsAvailable[1]) ||
        !backtrack(0, pots[2], pot1TeamsAvailable[2]) || !backtrack(0, pots[2], pot2TeamsAvailable[2]) || !backtrack(0, pots[2], pot3TeamsAvailable[2]) || !backtrack(0, pots[2], pot4TeamsAvailable[2]) ||
        !backtrack(0, pots[3], pot1TeamsAvailable[3]) || !backtrack(0, pots[3], pot2TeamsAvailable[3]) || !backtrack(0, pots[3], pot3TeamsAvailable[3]) || !backtrack(0, pots[3], pot4TeamsAvailable[3])) {
        console.log("No valid draw could be found.");
        return null;
    }

    return drawData;
}