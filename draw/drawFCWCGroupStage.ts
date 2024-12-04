interface Team {
    name: string;
    country: string;
    confederation: string;
}

type Pots = Team[][];

export function drawFCWCGroupStage(pots: Pots) {
    const RED_GROUPS = [0, 1, 2, 3];
    const BLUE_GROUPS = [4, 5, 6, 7];

    const draw = (pots: Pots, nbrOfGroups: number): Team[][] => {
        const groups: Team[][] = Array.from({ length: nbrOfGroups }, () => []);

        const confederationCountInGroup = Array.from({ length: nbrOfGroups }, () => ({} as Record<string, number>));
        const uefaTeamCountInGroup = Array(nbrOfGroups).fill(0);

        for (let potIndex = 0; potIndex < pots.length; potIndex++) {
            const pot = pots[potIndex];

            for (let i = 0; i < pot.length; i++) {
                const team = pot[i];

                // Determine the candidate groups
                const candidateGroups = RED_GROUPS.concat(BLUE_GROUPS).filter(g => {
                    const group = groups[g];
                    const confederationCount = confederationCountInGroup[g];
                    const uefaCount = uefaTeamCountInGroup[g];

                    // Rules for UEFA teams
                    if (team.confederation === "UEFA") {
                        if (uefaCount >= 2) return false; // No more than 2 UEFA teams in the group
                    } else {
                        if (confederationCount[team.confederation] >= 1) return false; // No more than 1 team from other confederations
                    }

                    // Respect the size of the pot and dont repeat country
                    return group.length === potIndex && group.every(member => member.country !== team.country);
                });

                // If there are not valid groups, restart the draw
                if (candidateGroups.length < 1) return draw(pots, nbrOfGroups);

                // Select one random group
                const selectedGroup = candidateGroups[Math.floor(Math.random() * candidateGroups.length)];
                groups[selectedGroup].push(team);

                // Updates count of confederations and UEFA teams in the group
                confederationCountInGroup[selectedGroup][team.confederation] = (confederationCountInGroup[selectedGroup][team.confederation] || 0) + 1;

                if (team.confederation === "UEFA") uefaTeamCountInGroup[selectedGroup]++;
            }
        }

        // Check that 4 groups have exactly 2 UEFA teams
        const groupsWithTwoUEFA = uefaTeamCountInGroup.filter(count => count === 2).length;
        if (groupsWithTwoUEFA !== 4) return draw(pots, nbrOfGroups);

        return groups;
    };

    const drawData = draw(pots, 8);
    return drawData;
}
