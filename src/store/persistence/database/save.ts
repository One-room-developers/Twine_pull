
import { Passage, StoriesState, Story, option, passageWithNameAsStory } from "../../stories";
import { passageWithName } from "../../stories";
import axios from 'axios';

export async function createOption(option:option, normalPassagePk:string){
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/make_episode/create_option`,
		data: {
			pk: option.pk,
			normalPassagePk: normalPassagePk,
			name: option.name,
			optionVisibleName: option.optionVisibleName,
			afterStory: option.afterStory,
			status1: option.status1,
			status1Num: option.status1Num,
			status2: option.status2,
			status2Num: option.status2Num,
			nextNormalPassage: option.nextNormalPassage,
		}
	})
	.then((res) => {
	})
	.catch((err) => {
		console.log(err);
	});
}

export async function updateOption(option:option) {

	axios({
		method: "PATCH",
		url: `${process.env.REACT_APP_API_URL}/make_episode/update_option/${option.pk}`,
		data: {
			optionVisibleName: option.optionVisibleName,
			name: option.name,
			afterStory: option.afterStory,
			status1: option.status1,
			status1Num: option.status1Num,
			status2: option.status2,
			status2Num: option.status2Num,
			nextNormalPassage: option.nextNormalPassage,
		}
	})
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}

export async function deleteOption(option: option) {
	
	axios.delete(`${process.env.REACT_APP_API_URL}/make_episode/delete_option/${option.pk}`)
		.then((res) => {
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function deleteUploadOption(option: option) {
	
	axios.delete(`${process.env.REACT_APP_API_URL}/make_episode/delete_upload_option/${option.pk}`)
		.then((res) => {
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function createPassage(passage:Passage, story:Story){
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/make_episode/create_passage`,
		data: {
			pk: passage.pk,
			id: passage.id,
			passageType: passage.passageType,
			storyPk: story.pk,
			story: passage.story,
			parentOfOption: passage.parentOfOption,
			name: passage.name,
			optionVisibleName: passage.optionVisibleName,
			text: passage.text,
			visibleText: passage.visibleText,
			height: passage.height,
			highlighted: passage.highlighted,
			left: passage.left,
			selected: passage.selected,
			top: passage.top,
			width: passage.width
		}
	})
	.then((res) => {
		if(passage.passageType === "optionPassage"){
			const parentPassage = passageWithNameAsStory(story, passage.parentOfOption);
			parentPassage.options.forEach(option => {
				if(option.name === passage.name){
					createOption(option, parentPassage.pk)
					return true;
				}
			})
		}
	})
	.catch((error) => {
		console.log(error);
	});
}

export async function createStory(story:Story){
	
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/make_episode/create_story`,
		data: {
			pk: story.pk,
			id: story.id,
			ifid: story.ifid,
			level: story.level,
			name: story.name,
			userNickname: story.userNickname,
			startPassage: story.startPassage,
			script: story.script,
			selected: story.selected,
			snapToGrid: story.snapToGrid,
			storyFormat: story.storyFormat,
			storyFormatVersion: story.storyFormatVersion,
			zoom: story.zoom,
		},
	})
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}

export async function uploadStory(story:Story){
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/make_episode/upload_story`,
		data: {
			pk: story.pk,
			id: story.id,
			ifid: story.ifid,
			level: story.level,
			name: story.name,
			userNickname: story.userNickname,
			startPassage: story.startPassage,
			script: story.script,
			selected: story.selected,
			snapToGrid: story.snapToGrid,
			storyFormat: story.storyFormat,
			storyFormatVersion: story.storyFormatVersion,
			zoom: story.zoom,
		},
	})
	.then((res) => {
		console.log(story)
		story.passages.forEach(passage => {
			uploadPassage(passage, story);
			if(passage.passageType === "normalPassage"){
				passage.options.forEach(option => {
					uploadOption(option, passage.pk)
				})
			}
		})
		
	})
	.catch((error) => {
		console.log(error);
	});
}
export async function uploadPassage(passage:Passage, story:Story){
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/make_episode/upload_passage`,
		data: {
			pk: passage.pk,
			id: passage.id,
			passageType: passage.passageType,
			storyPk: story.pk,
			story: passage.story,
			parentOfOption: passage.parentOfOption,
			name: passage.name,
			optionVisibleName: passage.optionVisibleName,
			text: passage.text,
			visibleText: passage.visibleText,
			height: passage.height,
			highlighted: passage.highlighted,
			left: passage.left,
			selected: passage.selected,
			top: passage.top,
			width: passage.width
		}
	})
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}

export async function uploadOption(option:option, normalPassagePk:string){
	
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/make_episode/upload_option`,
		data: {
			pk: option.pk,
			normalPassagePk: normalPassagePk,
			name: option.name,
			optionVisibleName: option.optionVisibleName,
			afterStory: option.afterStory,
			status1: option.status1,
			status1Num: option.status1Num,
			status2: option.status2,
			status2Num: option.status2Num,
			nextNormalPassage: option.nextNormalPassage,
		}
	})
	.then((res) => {
	})
	.catch((err) => {
		console.log(err);
	});
}

export async function updatePassage(passage:Passage){
	
	axios({
		method: "PATCH",
		url: `${process.env.REACT_APP_API_URL}/make_episode/update_passage/${passage.pk}`,
		data: {
			parentOfOption: passage.parentOfOption,
			name: passage.name,
			optionVisibleName: passage.optionVisibleName,
			text: passage.text,
			visibleText: passage.visibleText,
			height: passage.height,
			highlighted: passage.highlighted,
			left: passage.left,
			selected: passage.selected,
			top: passage.top,
			width: passage.width,
		}
	})
	.then((res) => {
		if(passage.passageType === "normalPassage"){
			passage.options.forEach(option => {
				updateOption(option)
			})
		}
	})
	.catch((error) => {
		console.log(error);
	});
}


export async function updateStory(story) {
	axios({
		method: "PATCH",
		url: `${process.env.REACT_APP_API_URL}/make_episode/update_story/${story.pk}`,
		data: {
			level: story.level,
			name: story.name,
			startPassage: story.startPassage,
			script: story.script,
			selected: story.selected,
			snapToGrid: story.snapToGrid,
			storyFormat: story.storyFormat,
			storyFormatVersion: story.storyFormatVersion,
			zoom: story.zoom,
		}
	})
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}


export async function deletePassage(passage: Passage, story : Story, state : StoriesState) {

		axios.delete(`${process.env.REACT_APP_API_URL}/make_episode/delete_passage/${passage.pk}`)
		.then((res) => {
			if(passage.passageType === "optionPassage"){
				const parentPassage = passageWithName(state, story.id, passage.parentOfOption);
				parentPassage.options.forEach(option => {
					if(option.name === passage.name){
						deleteOption(option)
						return true;
					}
				})
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function deleteUploadPassage(passage: Passage, story : Story, state : StoriesState) {

	axios.delete(`${process.env.REACT_APP_API_URL}/make_episode/delete_upload_passage/${passage.pk}`)
	.then((res) => {
		if(passage.passageType === "optionPassage"){
			const parentPassage = passageWithName(state, story.id, passage.parentOfOption);
			parentPassage.options.forEach(option => {
				if(option.name === passage.name){
					deleteOption(option)
					return true;
				}
			})
		}
	})
	.catch((error) => {
		console.log(error);
	});
}

export async function deleteStory(story: Story) {

	axios.delete(`${process.env.REACT_APP_API_URL}/make_episode/delete_story/${story.pk}`)
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}

export async function deleteUploadStory(story: Story) {

	axios.delete(`${process.env.REACT_APP_API_URL}/make_episode/delete_upload_story/${story.pk}`)
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}