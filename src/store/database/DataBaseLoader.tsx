import * as React from 'react';

import { usePersistence } from '../persistence/use-persistence';
import { Passage, StoriesState, option } from '../stories';
import axios from 'axios';
import {doUpdateTransaction,savePassage,saveStory } from '../persistence/local-storage/stories'; 
import SessionStorageAPI from '../../routes/login/session';

type DataBaseLoader = {
	initing : boolean,
	setIniting : React.Dispatch<React.SetStateAction<boolean>>
}

export const DataBaseLoader: React.FC<DataBaseLoader> = props => {
    //꼼수로 지금 세션에 있는 값들을 분해해서 db에 저장하고, 그걸 불러와보기
    //나중에는 db에서 불러오는 것만 하기
    
    React.useEffect(() => {
        const sessionStorage = new SessionStorageAPI();
		async function run() {
            window.localStorage.clear();
            console.log("Log : DataBaseLoader - run()");
            //db의 값 변수에 저장
            let dbStoriesState :StoriesState = [];
            let dbPassagesState : Passage[] = [];
            // 유저 닉네임을 같이 보내줘야함
            let userNickname = sessionStorage.getItem("userNickname");
            const res1 = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/game_play/get_stoires`,
                data: {
                    nickname: userNickname
                }
            });
            dbStoriesState = res1.data;

            // url 뒤에 story pk 붙여줘야함
            let dummyArr = [];
            await Promise.all(dbStoriesState.map(async (dbStory) => {
                const res2 = await axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_API_URL}/game_play/get_passages/`,
                    data: {
                        nickname: dbStory.pk
                    }
                });
                res2.data.forEach(passage => {
                    dummyArr.push(passage)
                })
                
            }));
            dbPassagesState = dummyArr;
            // url 뒤에 passage pk 붙여줘야함
            // dbPassagesState의 option 안에 데이터 넣어줘야함
            dbPassagesState = await Promise.all(dbPassagesState.map(async (dbPassage) => {
                const res3 = await axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_API_URL}/game_play/get_options/`,
                    data: {
                        nickname: dbPassage.pk
                    }
                });
                dbPassage.options = res3.data;
                return dbPassage
            }))

            //변수 값 local storage에 저장하기
            await dbStoriesState.forEach((story)=>{
                doUpdateTransaction(transaction => {
                    saveStory(transaction, story);
                });
            })
            await dbPassagesState.forEach((passage)=>{
                doUpdateTransaction(transaction => {
                    savePassage(transaction, passage);
                });
            })
            props.setIniting(false);
		}
		run();
	}, []);

	return <>
        {props.children}
    </>
    
}
