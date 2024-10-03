// DRAW FOR ALL THE TEAMS OF COMPETITION
export function drawLeagueStage(pots: any) {

    // Collect data of the draw for all teams
    let drawData: any = [];

    // Check if a pair of teams has already played against each other
    const hasPlayedBefore = (team: any, opponent: any): boolean => {
        return drawData.some((match: any) => 
            (match.team === team.name && match.opponents.includes(opponent)) ||
            (match.team === opponent.name && match.opponents.includes(team))
        );
    };

    // Go through each pot
    pots.forEach((pot: any) => {

        let potTeamsAvailable = [...pot]; // Make a copy to manipulate available teams

        // Recursive function to draw matches for each team
        const drawMatchesForTeam = (teamIndex: number): boolean => {
            if (teamIndex >= pot.length) return true; // All teams have been processed

            const team = pot[teamIndex];
            const teamHomeMatches: any = { team: team.name, opponents: [] };

            const selectedCountries: { [key: string]: number } = {};
            const canSelectTeam = (opponent: any) =>
                team.id !== opponent.id &&
                opponent.country !== team.country &&
                (selectedCountries[opponent.country] || 0) < 2 &&
                !hasPlayedBefore(team, opponent) && // Ensure they haven't played before
                !drawData.some((entry: any) => entry.opponents.includes(opponent));

            // Shuffle potential opponents to add randomness
            const potOpponents = potTeamsAvailable.filter(canSelectTeam).sort(() => 0.5 - Math.random());

            for (const opponent of potOpponents) {
                teamHomeMatches.opponents.push(opponent);
                selectedCountries[opponent.country] = (selectedCountries[opponent.country] || 0) + 1;

                // Temporarily remove the opponent
                const index = potTeamsAvailable.indexOf(opponent);
                if (index > -1) potTeamsAvailable.splice(index, 1);

                drawData.push(teamHomeMatches);

                // Recursive call for the next team
                if (drawMatchesForTeam(teamIndex + 1)) return true;

                // Backtrack if it didn't work out
                drawData.pop();
                potTeamsAvailable.splice(index, 0, opponent);
                selectedCountries[opponent.country]--;
                teamHomeMatches.opponents.pop();
            }

            return false; // If no valid opponent was found, return false
        };

        drawMatchesForTeam(0);
    });

    console.log(drawData);
}
