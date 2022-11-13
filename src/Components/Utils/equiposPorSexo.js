const equiposPorSexo = (sexo, allPuntajes, setEquiposUser) => {
    let teams= [];

    for (let i = 0; i < allPuntajes.length; i++) {
        const usuario = allPuntajes[i];
        teams.push([usuario.puntajeActual, usuario.equipo])


    }

    let nuevoArray = [];
    let equiposArray=teams;
    
    for (let i = 0; i < equiposArray.length; i++) {
        const element = equiposArray[i];
        let equipo = equiposArray.filter(el => el[1] === element[1])
        if (equipo.length > 1) {
            switch (equipo.length) {
                case 2:
                    equipo = [equipo[0][0] + equipo[1][0], equipo[0][1]]
                    break;
                case 3:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0], equipo[0][1]]
                    break;
                case 4:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0], equipo[0][1]]
                    break;
                case 5:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0] + equipo[4][0], equipo[0][1]];
                    break;
                case 6:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0] + equipo[4][0] + equipo[5][0], equipo[0][1]];
                    break;
                case 7:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0] + equipo[4][0] + equipo[5][0] + equipo[6][0], equipo[0][1]];
                    break;
                case 8:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0] + equipo[4][0] + equipo[5][0] + equipo[6][0] + equipo[7][0], equipo[0][1]];
                    break;
                case 9:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0] + equipo[4][0] + equipo[5][0] + equipo[6][0] + equipo[7][0] + equipo[8][0], equipo[0][1]];
                    break;
                case 10:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0] + equipo[4][0] + equipo[5][0] + equipo[6][0] + equipo[7][0] + equipo[8][0] + equipo[9][0], equipo[0][1]];
                    break;
                case 11:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0] + equipo[4][0] + equipo[5][0] + equipo[6][0] + equipo[7][0] + equipo[8][0] + equipo[9][0] + equipo[10][0], equipo[0][1]];
                    break;
                case 12:
                    equipo = [equipo[0][0] + equipo[1][0] + equipo[2][0] + equipo[3][0] + equipo[4][0] + equipo[5][0] + equipo[6][0] + equipo[7][0] + equipo[8][0] + equipo[9][0] + equipo[10][0] + equipo[11][0], equipo[0][1]];
                    break;
                default:
                    break;
            }
            let final = false;
            if (nuevoArray.length > 0) {
                for (let i = 0; i < nuevoArray.length; i++) {
                    const el = nuevoArray[i];
                    if (el[1] === equipo[1]) {
                        final = true
                    }
                }
            }
            if (final === false) {
                nuevoArray.push(equipo)
            }

        } else {
            nuevoArray.push(equipo[0]);
        }


    }
    
    let arrayOrdenado = nuevoArray.sort((a, b) => a[0] > b[0] ? -1 : b[0] > a[0] ? 1 : 0);
    setEquiposUser(arrayOrdenado);
}


export default equiposPorSexo;