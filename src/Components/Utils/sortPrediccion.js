const sortPrediccion = (prediccionActual, setSortedPredic) => {
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
    prediccionArray.sort((a, b) => (parseInt(a[1].partido) > parseInt(b[1].partido)) ? 1 : ((parseInt(b[1].partido) > parseInt(a[1].partido)) ? -1 : 0));
    setSortedPredic(prediccionArray);
}

export default sortPrediccion;