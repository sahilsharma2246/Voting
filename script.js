const firebaseConfig = {
    apiKey: "AIzaSyAC42sirek7m-9wnh-7FsX2ow25KFRTjVA",
    authDomain: "react-36e2c.firebaseapp.com",
    databaseURL: "https://react-36e2c-default-rtdb.firebaseio.com",
    projectId: "react-36e2c",
    storageBucket: "react-36e2c.firebasestorage.app",
    messagingSenderId: "995727795506",
    appId: "1:995727795506:web:420373ff0c0057b7a9a32b"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref("votes");

function vote(option) {

    db.child(option).transaction(function (current) {
        return (current || 0) + 1;
    });

}

db.on("value", function (snapshot) {

    const data = snapshot.val() || {};

    let sahil = data.Sahil || 0;
    let sunny = data.Sunny || 0;
    let rudraksh = data.Rudraksh || 0;

    document.getElementById("Sahil").innerText = sahil;
    document.getElementById("Sunny").innerText = sunny;
    document.getElementById("Rudraksh").innerText = rudraksh;

    let winner = "No votes yet";

    let maxVotes = Math.max(sahil, sunny, rudraksh);

    let winners = [];

    if (sahil === maxVotes && maxVotes !== 0) winners.push("SAHIL");
    if (sunny === maxVotes && maxVotes !== 0) winners.push("SUNNY");
    if (rudraksh === maxVotes && maxVotes !== 0) winners.push("RUDRAKSH");

    if (winners.length === 1) {
        winner = winners[0];
    } 
    else if (winners.length > 1) {
        winner = "Tie between " + winners.join(" & ");
    }

    document.getElementById("winner").innerText = winner;

});

function clearVotes() {

    if (confirm("Are you sure you want to clear all votes?")) {
        db.set({
            Sahil: 0,
            Sunny: 0,
            Rudraksh: 0
        });
    }

}