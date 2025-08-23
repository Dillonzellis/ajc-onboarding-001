// Mock data for stories and journalists
// In a real app, this would come from an API

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorId: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface Journalist {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

export const MOCK_STORIES: Record<string, Story> = {
  "1": {
    id: "1",
    title: "MARTA Expansion Project Faces New Challenges as Community Voices Concerns Over Affordable Housing Impact",
    subtitle: "Local residents and advocacy groups raise questions about displacement and gentrification as transit development moves forward",
    author: "Sarah Mitchell",
    authorId: "sarah-mitchell",
    date: "December 15, 2024",
    readTime: "6 min read",
    category: "Georgia News",
    image: "/marta-station-atlanta.png",
  },
  "2": {
    id: "2",
    title: "Atlanta City Council Approves Major Infrastructure Investment for Downtown Revitalization",
    subtitle: "The $2.3 billion plan will transform transportation, housing, and green spaces across the city center over the next decade.",
    author: "Sarah Mitchell",
    authorId: "sarah-mitchell",
    date: "December 19, 2024",
    readTime: "6 min read",
    category: "Georgia News",
    image: "/placeholder-tsr1e.png",
  },
};

export const MOCK_JOURNALISTS: Record<string, Journalist> = {
  "sarah-mitchell": {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    title: "City Hall Reporter",
    avatar: "/placeholder-f78sg.png",
  },
};

export const getStoryById = (id: string): Story | undefined => {
  return MOCK_STORIES[id];
};

export const getJournalistById = (id: string): Journalist | undefined => {
  return MOCK_JOURNALISTS[id];
};

export const getStoriesByIds = (ids: string[]): Story[] => {
  return ids.map(id => MOCK_STORIES[id]).filter(Boolean);
};

export const getJournalistsByIds = (ids: string[]): Journalist[] => {
  return ids.map(id => MOCK_JOURNALISTS[id]).filter(Boolean);
};