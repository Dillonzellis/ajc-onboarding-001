import { useUser } from "./user-context";
import { getStoriesByIds, getJournalistsByIds } from "./story-data";

export function useSavedStories() {
  const { user, addSavedStory, removeSavedStory, isStorySaved, addFollowedJournalist, removeFollowedJournalist, isJournalistFollowed } = useUser();

  const savedStories = getStoriesByIds(user.savedStories);
  const followedJournalists = getJournalistsByIds(user.followedJournalists).map(j => ({
    ...j,
    followedDate: new Date().toLocaleDateString(), // In real app, store follow date
  }));

  const toggleSavedStory = (storyId: string) => {
    if (isStorySaved(storyId)) {
      removeSavedStory(storyId);
    } else {
      addSavedStory(storyId);
    }
  };

  const toggleFollowedJournalist = (journalistId: string) => {
    if (isJournalistFollowed(journalistId)) {
      removeFollowedJournalist(journalistId);
    } else {
      addFollowedJournalist(journalistId);
    }
  };

  return {
    savedStories,
    followedJournalists,
    savedStoriesCount: user.savedStories.length,
    followedJournalistsCount: user.followedJournalists.length,
    isStorySaved,
    isJournalistFollowed,
    toggleSavedStory,
    toggleFollowedJournalist,
    addSavedStory,
    removeSavedStory,
    addFollowedJournalist,
    removeFollowedJournalist,
  };
}