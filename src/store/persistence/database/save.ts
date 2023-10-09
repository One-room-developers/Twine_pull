
import { Passage, StoriesState, Story, option } from "../../stories";
import { passageWithName } from "../../stories";
import axios from 'axios';

export async function createOption(option:option){

	// axios({
	// 	method: "POST",
	// 	url: `${process.env.REACT_APP_API_URL}/game_play/create_option`,
	// 	data: {
	// 		id:,
	// 		name:,
	// 		passageType:,
	// 		story:,
	// 		passage:,
	// 		text:,
	// 		visibleText:,
	// 		after_story:,
	// 		status1:,
	// 		status1_num:,
	// 		status2:,
	// 		status2_num:,
	// 	}
	// })
	// .then((res) => {
	// })
	// .catch((err) => {
	// 	console.log(err);
	// });
}

export async function createPassage(passage:Passage){
	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/game_play/create_passage`,
		data: {
			id: passage.id,
			name: passage.name,
			optionVisibleName: passage.optionVisibleName,
			passageType: passage.passageType,
			story: passage.story,
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
		passage.options.forEach(option => {createOption(option)})
	})
	.catch((error) => {
		console.log("엄엄어엄");
		console.log(error);
	});
}

export async function createStory(story:Story){
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API_URL}/game_play/create_story`,
			data: {
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

export async function updateOption(option) {

	// axios({
	// 	method: "PATCH",
	// 	url: `${process.env.REACT_APP_API_URL}/game_play/update_option/${option.id}`,
	// 	data: {
	// 		name:,
	// 		text:,
	// 		visibleText:,
	// 		after_story:,
	// 		status1:,
	// 		status1_num:,
	// 		status2:,
	// 		status2_num:,
	// 		height:,
	// 		highlighted:,
	// 		left:,
	// 		selected:,
	// 		top:,
	// 		width:,
	// 	}
	// })
	// .then((res) => {
	// })
	// .catch((error) => {
	// 	console.log(error);
	// });
}

export async function updatePassage(passage:Passage) {
	axios({
		method: "PATCH",
		url: `${process.env.REACT_APP_API_URL}/game_play/update_passage/${passage.id}`,
		data: {
			name: passage.name,
			passageType: passage.passageType,	
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
		console.log(res);
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

	axios.delete(`${process.env.REACT_APP_API_URL}/game_play/delete_story/${story.id}`)
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}
