import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";

const setPrediction = async (matches, userId, setToolText, setTooltip, tooltip, userInfo) => {

  if (userInfo.habilitado === true) {
    setToolText("SE GUARDÓ TU PREDICCIÓN.")
    setTooltip(tooltip + 1);
    setTimeout(() => {
      setTooltip(tooltip + 2)
    }, 4000);


    if (userId != "") {

      let prediccion = [];
      let ganador = (local, visitante) => {
        if (local > visitante) {
          return "local"
        } else if (visitante > local) {
          return "visitante"
        } else if (local === visitante) {
          return "empate"
        }
      }

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];

        let selectAllLocal = document.querySelectorAll('.selectLocal');
        let selectAllVisit = document.querySelectorAll('.selectVisit');

        for (let i = 0; i < selectAllLocal.length; i++) {
          let local = selectAllLocal[i];
          let localName = local.name;
          let visit = selectAllVisit[i];

          if (localName == match[1].partido && (local.value != "-" && visit.value != "-")) {
            prediccion.push({
              [`partido${match[1].partido}`]: {
                "partido": match[1].partido,
                "local": local.value,
                "visitante": visit.value,
                "ganador": ganador(local.value, visit.value)

              }
            })
          }
        }
      }

      const q = query(collection(db, "Usuarios"), where("uid", "==", userId));

      let usuarioRef = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        usuarioRef.push(doc)
      });
      let idUsuario = usuarioRef[0].id;

      for (let i = 0; i < prediccion.length; i++) {
        let partido = prediccion[i];

        const partidoX = Object.entries(partido)[0][1];

        const userRef = doc(db, 'Usuarios', idUsuario);

        await updateDoc(userRef, {
          [`prediccion.partido${partidoX.partido}`]: {
            "local": partidoX.local,
            "visitante": partidoX.visitante,
            "ganador": partidoX.ganador,
            "partido": partidoX.partido
          }
        });
      }
    } else {
      console.log("primero debes iniciar sesion");
    }

    let selectAllLocal = document.querySelectorAll('.selectLocal');
    let selectAllVisit = document.querySelectorAll('.selectVisit');

    setTimeout(() => {
      for (let i = 0; i < selectAllLocal.length; i++) {
        let localVal = selectAllLocal[i];
        let visitVal =selectAllVisit[i];

        if (localVal.innerHTML !== "-" || visitVal.innerHTML !== "-") {
          localVal.innerHTML = "-"
          visitVal.innerHTML = "-"
        }

      }
    }, 500);

  }
  else {
    setToolText("PERDÓN, PERO NO ESTAS HABILITADO TODAVÍA.")
    setTooltip(tooltip + 1);
    setTimeout(() => {
      setTooltip(tooltip + 2)
    }, 4000);

  }




}


export default setPrediction;