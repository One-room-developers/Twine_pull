
import { Passage, StoriesState, Story } from "../../stories";
import { passageWithName } from "../../stories";
import axios from 'axios';

export async function createPassage(passage:Passage){
	

	axios({
		method: "POST",
		url: `${process.env.REACT_APP_API_URL}/game_play/create_passage`,
		data: {
			id: passage.id,
			name: passage.name,
			passageType: passage.passageType,
			story: passage.story,
			text: passage.text,
			text_user: passage.text_user,
			height: passage.height,
			highlighted: passage.highlighted,
			left: passage.left,
			selected: passage.selected,
			top: passage.top,
			width: passage.width,
			options : passage.options
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
				id: story.id,
				ifid: story.ifid,
				name: story.name,
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

export async function updatePassage(passage:Passage) {

	axios({
		method: "PATCH",
		url: `${process.env.REACT_APP_API_URL}/game_play/update_passage/${passage.id}`,
		data: {
			name: passage.name,
			passageType: passage.passageType,
			text: passage.text,
			text_user: passage.text_user,
			height: passage.height,
			highlighted: passage.highlighted,
			left: passage.left,
			selected: passage.selected,
			top: passage.top,
			width: passage.width,
			options : passage.options
		}
	})
	.then((res) => {
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

export async function deletePassage(passageId: string) {

		axios.delete(`${process.env.REACT_APP_API_URL}/game_play/delete_passage/${passageId}`)
		.then((res) => {
		})
		.catch((error) => {
			console.log(error);
		});
}

export async function deleteStory(storyId: string) {

	axios.delete(`${process.env.REACT_APP_API_URL}/game_play/delete_story/${storyId}`)
	.then((res) => {
	})
	.catch((error) => {
		console.log(error);
	});
}
