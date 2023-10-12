import * as React from 'react';

import { usePersistence } from '../persistence/use-persistence';
import { Passage, StoriesState } from '../stories';
import axios from 'axios';
import {doUpdateTransaction,savePassage,saveStory } from '../persistence/local-storage/stories'; 
import SessionStorageAPI from '../../routes/login/session';


export const DataBaseLoader: React.FC = () => {
    //꼼수로 지금 세션에 있는 값들을 분해해서 db에 저장하고, 그걸 불러와보기
    //나중에는 db에서 불러오는 것만 하기
    
    React.useEffect(() => {
        const sessionStorage = new SessionStorageAPI();
		async function run() {
            console.log("Log : DataBaseLoader - run()");
            //db의 값 변수에 저장
            let dbStoriesState :StoriesState = null;
            let dbPassagesState : Passage[] = null;
            // 유저 닉네임을 같이 보내줘야함
            let userNickname = sessionStorage.getItem("userNickname");
            const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/game_play/get_stoires/${userNickname}`);
            dbStoriesState = res1.data;
            debugger;

            // url 뒤에 story pk 붙여줘야함
            dbStoriesState.forEach(async (dbStory) => {
                const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/game_play/get_passages/${dbStory.pk}`)
                dbPassagesState.push(res2.data)
            });

            // url 뒤에 passage pk 붙여줘야함
            // dbPassagesState의 option 안에 데이터 넣어줘야함
            const res3 = await axios.get(`${process.env.REACT_APP_API_URL}/game_play/get_options`)
            //변수 값 local storage에 저장하기

            // dbStoriesState.forEach((story)=>{
            //     doUpdateTransaction(transaction => {
            //         saveStory(transaction, story);
            //     });
            // })
            // dbPassagesState.forEach((passage)=>{
            //     doUpdateTransaction(transaction => {
            //         savePassage(transaction, passage);
            //     });
            // })
		}
		run();
	}, []);

	return null;
    
}
