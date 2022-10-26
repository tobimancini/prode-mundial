const sortPrediccion = (prediccionActual, setSortedPredic, modal) => {
    let prediccionArray = [];
    if (prediccionActual !== {}) {
        let prediccion = Object.entries(prediccionActual);
        for (let i = 0; i < prediccion.length; i++) {
            const el = prediccion[i];
            if (el[1].ganador !== "") {
                prediccionArray.push(el);
            }
        }
    }

    if (modal === "equipos") {
        prediccionActual.sort((a, b) => a.puntajeActual > b.puntajeActual ? 1 : b.puntajeActual > a.puntajeActual ? -1 : 0);
        setSortedPredic(prediccionArray);
    }
    if (modal === true) {
        prediccionArray.sort((a, b) => (parseInt(a[1][1].partido) > parseInt(b[1][1].partido)) ? 1 : ((parseInt(b[1][1].partido) > parseInt(a[1][1].partido)) ? -1 : 0));
        setSortedPredic(prediccionArray);
    } else {
        prediccionArray.sort((a, b) => (parseInt(a[1].partido) > parseInt(b[1].partido)) ? 1 : ((parseInt(b[1].partido) > parseInt(a[1].partido)) ? -1 : 0));
        setSortedPredic(prediccionArray);
    }
}

export default sortPrediccion;