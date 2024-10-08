type teamMatches = {
    team: string, 
    home: string[],  // Adversários para jogos em casa
    away: string[]   // Adversários para jogos fora
}

// Função para sortear os jogos de todas as equipas da competição
export function drawLeagueStage(pots: any) {

    // Inicializar dados do sorteio para todas as equipas
    let drawData: teamMatches[] = [];

    pots.forEach((pot: any) => {
        pot.forEach((team: any) => {
            // Criar um objeto para cada equipa e inicializar com arrays vazios para jogos
            drawData.push({
                team: team.name,
                home: [],
                away: []
            });
        });
    });

    console.log(drawData);
}
