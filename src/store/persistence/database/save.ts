
import { Passage, StoriesState, Story, option } from "../../stories";
import { passageWithName } from "../../stories";
import axios from 'axios';

export async function createOption(option:option, normalPassagePk:string){
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/game_play/create_option`,
		data: {
			normalPassageId: normalPassagePk,
			name: option.name,
			optionVisibleName: option.optionVisibleName,
			afterStory: option.afterStory,
			status1: option.status1,
			status1Num: option.status1Num,
			status2: option.status2,
			status2Num: option.status2Num,
			nextNormalPassages: option.nextNormalPassages,
		}
	})
	.then((res) => {
		console.log(`createOption: ${res}`);
	})
	.catch((err) => {
		console.log(err);
	});
}

export async function createPassage(passage:Passage, storyPk:string){
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/game_play/create_passage`,
		data: {
			pk: passage.pk,
			id: passage.id,
			passageType: passage.passageType,
			storyPk: storyPk,
			storyId: passage.story,
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
	})
	.catch((error) => {
		console.log(error);
	});
}

export async function createStory(story:Story){
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API_URL}/game_play/create_story`,
			data: {
				pk: story.pk,
				id: story.id,
				ifid: story.ifid,
				difficulty: story.level,
				name: story.name,
				writer: story.userId,
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

export async function updateOption(option:option) {

	// axios({
	// 	method: "PATCH",
	// 	url: `${process.env.REACT_APP_API_URL}/game_play/update_option/${option.id}`,
	// 	data: {
	// 		optionVisibleName: option.optionVisibleName,
	// 		name: option.name,
	// 		afterStory: option.afterStory,
	// 		status1: option.status1,
	// 		status1Num: option.status1Num,
	// 		status2: option.status2,
	// 		status2Num: option.status2Num,
	// 		nextPassage: option.nextNormalPassages,
	// 	}
	// })
	// .then((res) => {
	// })
	// .catch((error) => {
	// 	console.log(error);
	// });
}

export async function updatePassage(passage:Passage){
	axios({
		method: "PATCH",
		url: `${process.env.REACT_APP_API_URL}/game_play/update_passage/${passage.pk}`,
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
		passage.options.forEach(option=>{
			createOption(option, passage.pk)
		})
	})
	.catch((error) => {
		console.log(error);
	});
}

export async function updateStory(story) {

	axios({
		method: "PATCH",
		url: `${process.env.REACT_APP_API_URL}/game_play/update_story/${story.id}`,
		data: {
			difficulty: story.level,
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

export async function deleteOption(optionId: string) {

	axios.delete(`${process.env.REACT_APP_API_URL}/game_play/delete_option/${optionId}`)
		.then((res) => {
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function deletePassage(passageId: string) {

		axios.delete(`${process.env.REACT_APP_API_URL}/game_play/delete_passage/${passageId}`)
		.then((res) => {
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function deleteStory(story: Story) {

	axios.delete(`${process.env.REACT_APP_API_URL}/game_play/delete_story/${story.pk}`)
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}
