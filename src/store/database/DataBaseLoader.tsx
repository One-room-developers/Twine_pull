import * as React from 'react';

import { usePersistence } from '../persistence/use-persistence';
import { StoriesState } from '../stories';
import axios from 'axios';

export const DataBaseLoader: React.FC = () => {
    //꼼수로 지금 세션에 있는 값들을 분해해서 db에 저장하고, 그걸 불러와보기
    //나중에는 db에서 불러오는 것만 하기

    const {stories} = usePersistence();

    React.useEffect(() => {
		async function run() {
                //local storage에서 값 변수에 불러오기
				const locStoriesState = await stories.load();
                const locPassagesState = locStoriesState.map(locStoryState => {
                    return locStoryState.passages.map(locPassageState => {
                        return locPassageState;
                    })
                });
                
                //변수 값 db에 저장
                locStoriesState.forEach((storyState)=>{
                    axios({
                        method: "POST",
                        url: `${process.env.REACT_APP_API_URL}/game_play/create_story`,
                        data: {
                            id: storyState.id,
                            if_id: storyState.ifid,
                            name: storyState.name,
                            start_passage: storyState.startPassage,
                            script: storyState.script,
                            selected: storyState.selected,
                            snap_to_grid: storyState.snapToGrid,
                            story_format: storyState.storyFormat,
                            story_format_version: storyState.storyFormatVersion,
                            zoom: storyState.zoom,
                        },
                    })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                })

                //local storage 값 삭제
                // window.localStorage.clear();
                
                //db의 값 변수에 저장
                const dbStoriesState :StoriesState = null;
                //변수 값 local storage에 저장하기
                
		}
		run();
	}, []);

	return null;
    
}
