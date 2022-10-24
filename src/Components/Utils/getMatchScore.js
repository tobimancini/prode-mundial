const getMatchScore = (allPuntajes, userLogged, setPrediccionUsuario) => {
    let userScores = [];
    for (let i = 0; i < allPuntajes.length; i++) {
        const usuario = allPuntajes[i];
        if (usuario.uid === userLogged) {
            userScores.push(usuario);
        }
    }
    setPrediccionUsuario(userScores[0]);
}

export default getMatchScore;