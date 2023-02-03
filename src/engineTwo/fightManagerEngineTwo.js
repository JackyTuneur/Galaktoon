const changeCurrentAbilityOnInput = () => {
    if(keyIsDown(65)){
        currentAbilityUsed = 0;
    }
    if(keyIsDown(90)){
        currentAbilityUsed = 1;
    }
    if(keyIsDown(69)){
        currentAbilityUsed = 2;
    }
}

const changeCurrentTargetOnInput = () => {
    let mouseCurrentX = Math.floor((window.innerWidth - mouseX -120) / 200);
    let mouseCurrentY = Math.floor((window.innerHeight - mouseY) / 200);
    if(mouseCurrentX === 0){
        changeCurrentTarget(mouseCurrentY)
    }
}

const changeCurrentTarget = (targetIndex) => {
    if(targetIndex < (enemyTeam.length))
    {
        currentTarget = targetIndex;
    }
}

const attackCurrentTargetOnInput = () => {
    if(keyIsDown(32) && turnTeam === "player")
    {
        let playerRef = playerTeam[currentTurn];
        let playerAttack = playerTeam[currentTurn].abilities[currentAbilityUsed];
        let enemyWhoGetAttacked = enemyTeam[currentTarget];
        useAbilityOnTarget(playerAttack, enemyWhoGetAttacked, playerRef);
        endTurn();
    }
}

const compareCurrentTargetAndEnemyTeam = (currentTargetNumber) => {
    if(currentTargetNumber >= enemyTeam.length){
        currentTarget = 0;
    }
    if(currentTargetNumber < 0)
    {
        currentTarget = (enemyTeam.length -1)
    }
}

// ------- TURN MANAGER

const endTurn = () => {
    indexAnimationFight = 0;
    switchTeamTurn(turnTeam)
    console.log("endTurn, wait")
    setTimeout(() => {
        checkFightState();
        playerTeam[currentTurn].state = "idle"
        console.log("You can play now")
        indexAnimationFight = 0;
        turnManager(turnTeam)
        actualTurnGame ++;
    }, 1000);
}

const switchTeamTurn = (teamTurn) => {
    switch(teamTurn){
        case "player" :
            turnTeam = "ia"
            break;
        case "ia" :
            turnTeam = "player"
            break;
        default :
            throw new Error("It will be the turn of nobody which is IMPOSSIBLE")
    }
}

const turnManager = (teamTurn) => {
    switch(teamTurn){
        case "player" :
            break;
        case "ia" :
            enemyIaTurn();
            break;
        default :
            throw new Error("It's the turn of nobody which is IMPOSSIBLE")
    }
}

// ------- TURN MANAGER

// ------- CHECK IF THE FIGHT IS ENDED

const checkFightState = () => {
    if(allAlliesAreDead()){
        playerLooseFight()
    }else if(allEnemiesAreDead()){
        playerWinFight()
    }
}

const allAlliesAreDead = () => playerTeam[0].hp.current <= 0

const allEnemiesAreDead = () => {
    let countDeadTeam = 0
    for(let i = 0; i < enemyTeam.length; i++)
    {
        if(enemyTeam[i].hp.current <= 0)
        {
            enemyTeam[i].isAlive = false;
            enemyTeam[i].state = "dead";
            countDeadTeam ++;
        }
    }
    if(countDeadTeam === enemyTeam.length){
        return true
    }else{
        return false
    }
}

const playerWinFight = () => {
    whoWin = "Player";
    fightIsEnd = true
    fightLog.push("Player Won !")
}

const playerLooseFight = () => {
    whoWin = "Enemy";
    fightIsEnd = true
    fightLog.push("Player is Dead !")
}