const launchNpcDialog = (npc) => {

    npcInteractedData = npcData[npc.id]
  
    if(npcInteractedData.dialogs !== undefined)
    {
      console.log("launch a dialog")
      console.log(npc)
      console.log(npcInteractedData)
      npcDialoged = npcInteractedData
    }else{
      console.log("no dialog disponible")
    }
  }


const displayDialogNpc = (npcDialoged) => {
    
    backgroundTransitionEffect();
  
    playerState = "dialoging"
  
    let dialogBox = uiData[11].image;
    let sizeXDialog = window.innerWidth/ 1.45;
    let sizeYDialog = sizeXDialog/5;
    let xStartDialog = (window.innerWidth /2) - (sizeXDialog/2);
    let yStartDialog = window.innerHeight - sizeYDialog;
  
    showNpcSpriteInDialog(npcDialoged);
  
    fill(0, 0, 0);
    let box = image(dialogBox, xStartDialog, yStartDialog, sizeXDialog, sizeYDialog)
    textSize(sizeYDialog/10);
  
    let paddingXText = sizeYDialog/2;
    let paddingYText = sizeYDialog/3.5;
    let paddingSizeXBox = paddingXText*2;
    let paddingSizeYBox = paddingYText*2;
  
    let actualDialogNpc = creatingStringWithDelay(npcDialoged.dialogs[actualDialog].text);;
  

    if(npcDialoged.dialogs[actualDialog].quest === undefined || npcDialoged.dialogs[actualDialog].questIsGived === true){
        createInputButtonWithCallback(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, goNextDialog);
    }else{
        showDialogChoiceBox(xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, npcDialoged.dialogs[actualDialog])
    }

    // Verify if the quest is gived or not and so change the text
    if(npcDialoged.dialogs[actualDialog].questIsGived === true)
    {
      actualDialogNpc = creatingStringWithDelay(npcDialoged.dialogs[actualDialog].altText);
    }
    // Verify if the quest is gived or not and so change the text

    textSize(sizeYDialog/10);
    textAlign(LEFT, TOP)
    text(actualDialogNpc, xStartDialog +paddingXText, yStartDialog+paddingYText, sizeXDialog-paddingSizeXBox, sizeYDialog-paddingSizeYBox);
  
  }

  // ! Dialog Effect

  let backgroundTransition = 0;
const backgroundTransitionEffect = () => {
    // Background transition
    if(backgroundTransition < 115){
      backgroundTransition+= 5;
    }
    background(0,0,0,backgroundTransition)
    // Background transition
  }

  var dialogTextIndex = 0;
const creatingStringWithDelay = (string) => {
    if(dialogTextIndex < string.length)
    {
      dialogTextIndex += 0.3;
    }
    return string.substr(0, Math.floor(dialogTextIndex));
  }

  // ! Dialog Effect

  // Dialog Component

const showDialogChoiceBox = (xStartDialog, yStartDialog, sizeXDialog, sizeYDialog, quest) => {
    
  

    textSize(18);
    textAlign(CENTER, CENTER);
    
    let sizeYChoice = sizeYDialog / 2.4;
    let sizeXChoice = sizeXDialog / 2.4;
    let paddingXChoice = sizeYDialog/2.75;
    let paddingYChoice = sizeYDialog/2.5;

    let dialogBox = uiData[11].image;
    let xBoxTrue = xStartDialog + paddingXChoice;
    let boxChoiceTrue = image(dialogBox, xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
    
    fill(0)
    changeFillOnHover(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 0, 180, 0)

    text("Accept", xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)
  
    createInputButtonWithCallback(xBoxTrue, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
        () => {
            quest.questIsGived = true;
            addQuestToList(quest.quest)
            goNextDialog();
        });

    let xBoxFalse = xStartDialog + sizeXDialog - sizeXChoice - paddingXChoice;
    let boxChoiceFalse = image(dialogBox, xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

    fill(0)
    changeFillOnHover(xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 180, 0, 0)

    text("Refuse", xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice)

    createInputButtonWithCallback(xBoxFalse, yStartDialog-paddingYChoice, sizeXChoice, sizeYChoice, 
        () => {
            goNextDialog();
        });
    fill(0)
  }
  
const showNpcSpriteInDialog = (npcDialoged) => {
    let sizeSpriteDialog = window.innerWidth/4.5;
  
    let xSprite1 = window.innerWidth - sizeSpriteDialog;
    let xSprite2 = 0;
  
    let ySprite = window.innerHeight - sizeSpriteDialog / 1.2;
    
    let spritePlayerAnimate = spritesData[0].image.get(0,0,30,30)
    let spriteNpcAnimate = spritesData[npcDialoged.spriteId].image.get(0,0,30,30)
    let spritePres1 = image(spriteNpcAnimate, xSprite1, ySprite, sizeSpriteDialog, sizeSpriteDialog)
    let spritePres2 = image(spritePlayerAnimate, xSprite2, ySprite, sizeSpriteDialog, sizeSpriteDialog)
  }

  // Dialog Component
  
  // ? Dialog Logic

const goNextDialog = () => {
    dialogTextIndex = 0;
    actualDialog++;

    if(actualDialog >= npcDialoged.dialogs.length){
      exitDialog()
    }

  }

const exitDialog = () => {
    backgroundTransition = 0;
    playerState = "normal"
    actualDialog = 0;
    npcDialoged = null;
    return;
  }

  // ? Dialog Logic