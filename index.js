let score = 0
//Menuju Page game
function goToGame(){
  window.location.replace("index2.html")
}

//Mengambil nama player dan genre
let data = ""
function getNameAndGenre(event){
  event.preventDefault()
  
  
  let namaPlayer = document.getElementById("playerName").value
  console.log(namaPlayer)
  
  let genreLagu = document.getElementsByName("genre")
  for (let i = 0; i < genreLagu.length; i++){
    if (genreLagu[i].checked){
      console.log(genreLagu[i].value)
      data = genreLagu[i].value
      break
    }
  }
  
  // console.log(data)
  
  localStorage.setItem("genre", data)
  localStorage.setItem("player", namaPlayer)
}


/////////////////////////////////////////////////////////////////////////////////////


let songGenre = []
let song = [
  {
    song: "diatasnormal.mp3",
    genre: "pop",
    answer: "diatas normal",
    distract: ["diatas normal", "wavin flag", "madagaskar"]
  },
  {
    song: "dragonball.mp3",
    genre: "rock",
    answer: "dragon ball",
    distract: ["dragon ball", "wavin flag", "madagaskar"]
  },
  {
    song: "pejantantangguh.mp3",
    genre: "pop",
    answer: "pejantan tangguh",
    distract: ["pejantan tangguh", "wavin flag", "madagaskar"]
  },
  {
    song: "wavinflag.mp3",
    genre: "pop",
    answer: "wavin flag",
    distract: ["pejantan tangguh", "wavin flag", "madagaskar"]
  },
  {
    song: "d4c.mp3",
    genre: "rock",
    answer: "dirty deeds done dirt cheap",
    distract: ["pejantan tangguh", "wavin flag", "dirty deeds done dirt cheap"]
  },
  {
    song: "killerqueen.mp3",
    genre: "rock",
    answer: "killer queen",
    distract: ["killer queen", "wavin flag", "dirty deeds done dirt cheap"]
  }

]

let genre = localStorage.getItem("genre")


for (let i = 0; i < song.length; i++){
  if (genre === song[i].genre){
    songGenre.push(song[i])
  }
}

let musik = new Audio()
let index = 0
let randomSong = shuffle(songGenre)
randomSong.push("")


let player = localStorage.getItem("player")



function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
    
    return array;
}
  
  
let btnJawaban1 = document.getElementById("jawaban-1")
let btnJawaban2 = document.getElementById("jawaban-2")
let btnJawaban3 = document.getElementById("jawaban-3")

let randomAnswer
musik.src = randomSong[index].song

function generateMusic(){
  console.log(genre)
  musik.play()  
  randomAnswer = shuffle(randomSong[index].distract)
  btnJawaban1.style.visibility = "visible"
  btnJawaban2.style.visibility = "visible"
  btnJawaban3.style.visibility = "visible"
  btnJawaban1.innerHTML = randomAnswer[0]
  btnJawaban2.innerHTML = randomAnswer[1]
  btnJawaban3.innerHTML = randomAnswer[2]
}
  
function pause(){
  // musik.src = randomSong[index].song
  musik.pause()
}

function repeat(){
  musik.src = randomSong[index].song
  musik.play() 
}

function nextMusic(){
  index++
  if (index === randomSong.length-1){
    alert("Lagu Sudah Habis\nScore " + player + ": " + score)
    localStorage.setItem("poin", score)
    window.location.replace("index.html")
  }

  if (btnJawaban1.style.visibility === "hidden" || btnJawaban2.style.visibility === "hidden" || btnJawaban3.style.visibility === "hidden"){
    btnJawaban1.style.visibility = "visible"
    btnJawaban2.style.visibility = "visible"
    btnJawaban3.style.visibility = "visible"
  }

  musik.src = randomSong[index].song
  musik.play()
  randomAnswer = shuffle(randomSong[index].distract)
  btnJawaban1.innerHTML = randomAnswer[0]
  btnJawaban2.innerHTML = randomAnswer[1]
  btnJawaban3.innerHTML = randomAnswer[2]
  console.log(index)
}


/////////////////////////////////////////////////////////////////////////////////////


function checkJawaban(jawaban){
  let getJawaban = randomAnswer[jawaban]


  if (getJawaban === randomSong[index].answer){
    alert("betul")
    score += 10
    nextMusic()
  } else {
    alert("salah")
    nextMusic()
  }
}


let countHelp = 0
function helpMe(){

  if (countHelp >= 2){
    return alert("HELP HABIS")
  } else {

    let arrSalah = []
  
    for (let i = 0; i < randomSong[index].distract.length; i++){
  
      if (randomSong[index].distract[i] !== randomSong[index].answer){
        arrSalah.push(randomSong[index].distract[i])
      }
  
    }
  
    console.log(arrSalah)
    let randoming = Math.floor(Math.random() * arrSalah.length)
    console.log(randoming)
  
    let buttonHelp = 0
    for (let i = 0; i < randomAnswer.length; i++){
  
      if (arrSalah[randoming] === randomAnswer[i]){
        //console.log(i)
        buttonHelp = i+1
        break
      }
  
    }
  
    console.log(buttonHelp)
  
    let help = document.getElementById("jawaban-" + buttonHelp)
    help.style.visibility = "hidden"
  
    countHelp++
  }
}


