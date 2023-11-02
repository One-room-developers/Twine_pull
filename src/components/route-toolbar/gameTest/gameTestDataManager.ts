import { NextOption, NextPassage, NextStory, Status, NextStoryAndPassages, NextStoryAndPassagesArr } from "../../../store/stories/gameManager.types";
import axios from 'axios';
import { vibration } from "./gameTest";

export let maxStatus : Status = {
    health: 5,
    money: 5,
    hungry: 5,
}

export let default_status : Status = {
    health : 3,
    hungry : 3,
    money : 3
}

export let current_status: Status = default_status;


export async function getNextStoryAndPassages(currentStat: Status, lastStoryArr: string[]) : Promise<NextStoryAndPassagesArr>{
    const response = await axios({
        method : "POST",
        url: `${process.env.REACT_APP_API_URL}/game_play/get_next_episode`,
        data: {
            genre: 1,
            //currentStat: currentStat,
            lastStoryArr: lastStoryArr,
        }
    });

    const data = response.data;
    
    const story = getStory(data);
    const passages = getPassages(data);
    const options = getOptions(data);

    return [story, passages, options]
}

export function getOptions(data : NextStoryAndPassages){
    return data.nextOptions;
}

export function getPassages(data : NextStoryAndPassages){
    return data.nextPassages;
}

export function getStory(data : NextStoryAndPassages){
    return data.nextStory;
}


export function getCurrentPassageAndOptions(passages : NextPassage[], options : NextOption[][], nextPassageName : string) : [NextPassage, NextOption[], Status[]]{
    let index = 0
    for(let i = 0; i<passages.length; i++){
        if(passages[i].name === nextPassageName)
            index = i
    }
    let satusChange = getStatusChange(options[index])
    return [passages[index], options[index], satusChange]
}


export function getStatusChange(currentOptions : NextOption[]){


    let statusChange : Status[] = []
    currentOptions.forEach((option, index) => {
        statusChange[index] = {
            health : 0,
            money : 0,
            hungry : 0
        }
        switch(option.status1){
            case "health" : 
                statusChange[index].health = option.status1Num
                break;
            case "money" :
                statusChange[index].money = option.status1Num
                break;
            case "hungry" :
                statusChange[index].hungry = option.status1Num
                break;
            default :
                console.log("잘못된 stat 입력 - "+option.status1)
        }
        switch(option.status2){
            case "health" : 
                statusChange[index].health = option.status2Num
                break;
            case "money" :
                statusChange[index].money = option.status2Num
                break;
            case "hungry" :
                statusChange[index].hungry = option.status2Num
                break;
            default :
                console.log("잘못된 stat 입력 - "+option.status2)
        }
    })
    return statusChange;
}

export function resetStatus(){
    current_status.health = default_status.health;
    current_status.hungry = default_status.hungry;
    current_status.money = default_status.money;
}

export function changeStatus(changeStatus : Partial<Status>){
    if(changeStatus.health < 0) {
        vibration();
    }
    
    current_status.health += changeStatus.health;
    current_status.hungry += changeStatus.hungry;
    current_status.money += changeStatus.money;
}