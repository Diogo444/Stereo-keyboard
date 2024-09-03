/** @format */

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function audio(file, gd, hb, p) {
  fetch(`./audio/${file}.mp3`) // Remplace par le chemin de ton fichier audio
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      const audioSource = audioContext.createBufferSource();
      audioSource.buffer = audioBuffer;

      // Créer un panner pour gérer la profondeur
      const panner = audioContext.createPanner();
      panner.panningModel = "HRTF";
      panner.distanceModel = "inverse"; // Modèle de distance (inverse, linear, ou exponential)

      // Position du son en 3D (x, y, z)
      // Pour simuler la profondeur, on agit sur la position Z :
      panner.positionX.value = gd; // Gauche/Droite
      panner.positionY.value = hb; // Haut/Bas
      panner.positionZ.value = p; // Devant/Derrière (plus la valeur est négative, plus le son est proche)

      // Créer un gain pour le contrôle du volume
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1; // Ajuste le volume

      // Connecter les nodes
      audioSource.connect(panner);
      panner.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Jouer l'audio
      audioSource.start();
    })
    .catch((error) =>
      console.error("Erreur lors du chargement de l'audio:", error)
    );
}

window.addEventListener("keydown", (event) => {
  const key = event.key;

  switch (key) {
    case "a":
      audio("a", -10, -10, 10);
      break;
    case "z":
      audio("z", -8, -10, 9);
      break;
    case "e":
      audio("e", -6, -10, 8);
      break;
    case "r":
      audio("r", -4, -10, 7);
      break;
    case "t":
      audio("t", -2, -10, 6);
      break;
    case "y":
      audio("y", 0, -10, 5);
      break;
    case "u":
      audio("u", 2, -10, 4);
      break;
    case "i":
      audio("i", 4, -10, 3);
      break;
    case "o":
      audio("o", 6, -10, 2);
      break;
    case "p":
      audio("p", 8, -10, 1);
      break;
    case "q":
      audio("q", -10, -3, 10);
      break;
    case "s":
      audio("s", -8, -3, 9);
      break;
    case "d":
      audio("d", -6, -3, 8);
      break;
    case "f":
      audio("f", -4, -3, 7);
      break;
    case "g":
      audio("g", -2, -3, 6);
      break;
    case "h":
      audio("h", 0, -3, 5);
      break;
    case "j":
      audio("j", 2, -3, 4);
      break;
    case "k":
      audio("k", 4, -3, 3);
      break;
    case "l":
      audio("l", 6, -3, 2);
      break;
    case "m":
      audio("m", 8, -3, 1);
      break;
    case "w":
      audio("w", -10, 4, 10);
      break;
    case "x":
      audio("x", -8, 4, 9);
      break;
    case "c":
      audio("c", -6, 4, 8);
      break;
    case "v":
      audio("v", -4, 4, 7);
      break;
    case "b":
      audio("b", -2, 4, 6);
      break;
    case "n":
      audio("n", 0, 4, 5);
      break;
    default:
      break;
  }
});
