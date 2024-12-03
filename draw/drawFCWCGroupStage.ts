interface Team {
    name: string;
    country: string;
}

type Pots = Team[][];

export function drawFCWCGroupStage(pots: Pots) {
    const RED_GROUPS = [0, 1, 2, 3];
    const BLUE_GROUPS = [4, 5, 6, 7];
    
    const draw = (pots: Pots, nbrOfGroups: number): Team[][] => {
        const groups: Team[][] = Array.from({ length: nbrOfGroups }, () => []);

        // Count the number of teams per country to define the pairing
        const countryCount = pots.flat().reduce((acc: Record<string, number>, team: Team) => {
            acc[team.country] = (acc[team.country] || 0) + 1;
            return acc;
        }, {});

        // Define pairing pairs per country based on the rules
        const pairedTeams = Object.keys(countryCount).reduce((acc: Record<string, Team[][]>, country: string) => {
            const teams = pots.flat().filter((team: Team) => team.country === country);

            if (countryCount[country] === 2) acc[country] = [[teams[0], teams[1]]];
            else if (countryCount[country] === 3) acc[country] = [[teams[0], teams[1]]]; // Only two clubs paired
            else if (countryCount[country] >= 4) acc[country] = [[teams[0], teams[1]], [teams[2], teams[3]]]; // Two pairings for 4 or more clubs
            return acc;
        }, {});

        for (let potIndex = 0; potIndex < pots.length; potIndex++) {
            const pot = pots[potIndex];

            for (let i = 0; i < pot.length; i++) {
                const team = pot[i];

                // Check if the club has any pairings
                const teamPair = Object.values(pairedTeams).flat().find((pair: Team[]) => pair.includes(team));

                // Defines the available groups based on the color pairing
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

                // If there are no valid groups for this team, restart the draw
                if (candidateGroups.length < 1) return draw(pots, nbrOfGroups);

                // Randomly selects a valid group and adds the team
                const selectedGroup = candidateGroups[Math.floor(Math.random() * candidateGroups.length)];
                groups[selectedGroup].push(team);
            }
        }

        return groups;
    };

    const drawData = draw(pots, 8);
    return drawData;
}