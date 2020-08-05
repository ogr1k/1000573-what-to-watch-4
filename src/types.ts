import {InjectingProps as ActiveTypeInjectedProps} from "./hoc/with-active-tab/with-active-tab";


export interface Film {
      description: string;
      director: string;
      genre: string;
      id: number;
      name: string;
      poster: string;
      previewImage: string;
      rating: number;
      ratings: number;
      starring: string[];
      video: string;
      year: number;
      backgroundImage: string;
      backgroundColor: string;
      runTime: number;
      isFavourite: boolean;
      mainVideo: string;
    };

export interface Review {
    rating: string;
    comment: string;
  };

export interface InfoBlockCommonProps {
  film: Film;
  activeTab: string;
  onClick: (tab: string) => void;
}
