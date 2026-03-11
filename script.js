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

    let A = data.A || 0;
    let B = data.B || 0;
    let C = data.C || 0;

    document.getElementById("A").innerText = A;
    document.getElementById("B").innerText = B;
    document.getElementById("C").innerText = C;

    let winner = "No votes yet";

    let maxVotes = Math.max(A, B, C);

    let winners = [];

    if (A === maxVotes && maxVotes !== 0) winners.push("A");
    if (B === maxVotes && maxVotes !== 0) winners.push("B");
    if (C === maxVotes && maxVotes !== 0) winners.push("C");

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
            A: 0,
            B: 0,
            C: 0
        });
    }

}