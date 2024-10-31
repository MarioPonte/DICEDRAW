export function drawGroupStage(pots: any) {
    let groups = {
        redGroups: [
            {name: "Group A", teams: []},
            {name: "Group B", teams: []},
            {name: "Group C", teams: []},
            {name: "Group D", teams: []}
        ],
        blueGroups: [
            {name: "Group E", teams: []},
            {name: "Group F", teams: []},
            {name: "Group G", teams: []},
            {name: "Group H", teams: []}
        ]
    }

    let pot1TeamsAvailable = [...pots[0]];
    let pot2TeamsAvailable = [...pots[1]];
    let pot3TeamsAvailable = [...pots[2]];
    let pot4TeamsAvailable = [...pots[3]];

    groups.redGroups.forEach((group: any) => {
        pot1TeamsAvailable.sort(() => Math.random() - 0.5);
        group.teams.push(pot1TeamsAvailable[0]);
        pot1TeamsAvailable.splice(0,1);
    });

    groups.blueGroups.forEach((group: any) => {
        pot1TeamsAvailable.sort(() => Math.random() - 0.5);
        group.teams.push(pot1TeamsAvailable[0]);
        pot1TeamsAvailable.splice(0,1);
    });

    groups.redGroups.forEach((group: any) => {
        pot2TeamsAvailable.sort(() => Math.random() - 0.5);
        group.teams.push(pot2TeamsAvailable[0]);
        pot2TeamsAvailable.splice(0,1);
    });

    groups.blueGroups.forEach((group: any) => {
        pot2TeamsAvailable.sort(() => Math.random() - 0.5);
        group.teams.push(pot2TeamsAvailable[0]);
        pot2TeamsAvailable.splice(0,1);
    });

    groups.redGroups.forEach((group: any) => {
        pot3TeamsAvailable.sort(() => Math.random() - 0.5);
        group.teams.push(pot3TeamsAvailable[0]);
        pot3TeamsAvailable.splice(0,1);
    });

    groups.blueGroups.forEach((group: any) => {
        pot3TeamsAvailable.sort(() => Math.random() - 0.5);
        group.teams.push(pot3TeamsAvailable[0]);
        pot3TeamsAvailable.splice(0,1);
    });

    groups.redGroups.forEach((group: any) => {
        pot4TeamsAvailable.sort(() => Math.random() - 0.5);
        group.teams.push(pot4TeamsAvailable[0]);
        pot4TeamsAvailable.splice(0,1);
    });

    groups.blueGroups.forEach((group: any) => {
        pot4TeamsAvailable.sort(() => Math.random() - 0.5);
        group.teams.push(pot4TeamsAvailable[0]);
        pot4TeamsAvailable.splice(0,1);
    });

    console.log(groups);

    return groups;
}