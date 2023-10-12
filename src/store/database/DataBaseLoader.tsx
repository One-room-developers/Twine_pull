import * as React from 'react';

import { usePersistence } from '../persistence/use-persistence';
import { Passage, StoriesState } from '../stories';
import axios from 'axios';
import {doUpdateTransaction,savePassage,saveStory } from '../persistence/local-storage/stories'; 

export const DataBaseLoader: React.FC = () => {
    //꼼수로 지금 세션에 있는 값들을 분해해서 db에 저장하고, 그걸 불러와보기
    //나중에는 db에서 불러오는 것만 하기

    React.useEffect(() => {
		async function run() {
            console.log("Log : DataBaseLoader - run()");
            //db의 값 변수에 저장
            let dbStoriesState :StoriesState = null;
            let dbPassagesState : Passage[] = null;

            const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/game_play/get_stoires`);
            dbStoriesState = res1.data;

            const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/game_play/get_passages`);
            dbPassagesState = res2.data;
            //변수 값 local storage에 저장하기

            dbStoriesState.forEach((story)=>{
                doUpdateTransaction(transaction => {
                    saveStory(transaction, story);
                });
            })
            dbPassagesState.forEach((passage)=>{
                doUpdateTransaction(transaction => {
                    savePassage(transaction, passage);
                });
            })
		}
		run();
	}, []);

	return null;
    
}
