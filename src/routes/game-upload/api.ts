
export async function fetchStoryList(){
    const response = await fetch(``);
    const storyListData = await response.json();
    return storyListData;
}

export async function fetchStoryInfo(){
    const response = await fetch(``);
    const storyInfoData = await response.json();
    return storyInfoData;
}