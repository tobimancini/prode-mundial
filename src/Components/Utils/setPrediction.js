import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { addDoc } from "firebase/firestore";


const setPrediction = async (matches, setToolText, setTooltip, tooltip, userInfo, now) => {

  let date = { mes: now.getMonth() + 1, dia: now.getDate() }
  let partidoJugado = false;
  if (userInfo.habilitado === true) {

    if (userInfo.uid) {

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
            let jugado = false;
            if (date.mes === match[1].fecha.mes) {
              if (date.dia === match[1].fecha.dia || date.dia + 1 === match[1].fecha.dia || date.dia - 1 === match[1].fecha.dia) {
                const q = query(collection(db, "Jugados"), where("jugado", "==", `partido${match[1].partido}`));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                  jugado = true;
                });
                if (jugado === true) {
                  document.getElementById(`container${match[1].partido}`).classList.add('played');
                  partidoJugado = true;
                  let counters = document.querySelectorAll(`.counter${match[1].partido}`);
                  for (let i = 0; i < counters.length; i++) {
                    const counter = counters[i];
                    counter.remove();
                  }
                }
              }
              if (jugado === false) {
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
        }
      }

      const q = query(collection(db, "Predicciones"), where("uid", "==", userInfo.uid));

      let usuarioRef = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        usuarioRef.push(doc)
      });


      if (!usuarioRef.length) {
        const docRef = await addDoc(collection(db, "Predicciones"), {
          uid: userInfo.uid,
          nombre: userInfo.nombre,
          apellido: userInfo.apellido,
          equipo: userInfo.equipo
        });
        let idUsuario = docRef.id;
        for (let i = 0; i < prediccion.length; i++) {
          let partido = prediccion[i];

          const partidoX = Object.entries(partido)[0][1];

          const userRef = doc(db, 'Predicciones', idUsuario);

          await updateDoc(userRef, {
            [`partido${partidoX.partido}`]: {
              "local": partidoX.local,
              "visitante": partidoX.visitante,
              "ganador": partidoX.ganador,
              "partido": partidoX.partido
            }
          });
        }

      } else {
        let idUsuario = usuarioRef[0].id;
        for (let i = 0; i < prediccion.length; i++) {
          let partido = prediccion[i];

          const partidoX = Object.entries(partido)[0][1];

          const userRef = doc(db, 'Predicciones', idUsuario);

          await updateDoc(userRef, {
            [`partido${partidoX.partido}`]: {
              "local": partidoX.local,
              "visitante": partidoX.visitante,
              "ganador": partidoX.ganador,
              "partido": partidoX.partido
            }
          });
        }
      }

      if (partidoJugado === false) {
        setToolText("SE GUARDÓ TU PREDICCIÓN.")
        setTooltip(tooltip + 1);
        setTimeout(() => {
          setTooltip(tooltip + 2)
        }, 4000);
      }else{
        setToolText("Parte o el total de la predicción no pudo ser guardada, debido a que un partido se encuentra en juego")
        setTooltip(tooltip + 1);
        setTimeout(() => {
          setTooltip(tooltip + 2)
        }, 6000);
      }

    }

    let selectAllLocal = document.querySelectorAll('.selectLocal');
    let selectAllVisit = document.querySelectorAll('.selectVisit');

    setTimeout(() => {
      for (let i = 0; i < selectAllLocal.length; i++) {
        let localVal = selectAllLocal[i];
        let visitVal = selectAllVisit[i];

        if (localVal.innerHTML !== "-" || visitVal.innerHTML !== "-") {
          localVal.innerHTML = "-"
          visitVal.innerHTML = "-"
        }

      }
    }, 500);

  }
  else {
    setToolText("LO SENTIMOS, PERO NO ESTAS HABILITADO TODAVÍA.")
    setTooltip(tooltip + 1);
    setTimeout(() => {
      setTooltip(tooltip + 2)
    }, 4000);

  }




}


export default setPrediction;