import { getStoriesArray } from "./aux/helpers";
import { useState, useEffect } from "react";
import Story from "./Story";

interface Props {
    topstories: Array<any>;
}

const List = ({ topstories }: Props) => {

  
    interface Story {
        id: number;
        title: string;  
        url: string;
        text: string;
        score: number;
        by: string;
        time: number;
    }

 
    const [storiesArray, setStoriesArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


        useEffect(() => {
            setIsLoading(true);
            getStoriesArray(topstories).then((apiStoriesData: any) => {
                setStoriesArray(apiStoriesData);
                setIsLoading(false);
            })
        }
        , [topstories])



    return (
        <div>
            {isLoading ? <p>Stories loading...</p> : storiesArray?.sort((a: Story, b: Story) => b.time - a.time).map((story: Story) => {
                return (
                    <Story
                        key={story.id}
                        id={story.id}
                        title={story.title}
                        url={story.url}
                        text={story.text}
                        score={story.score}
                        by={story.by}
                        time={story.time}
                    />
                )
            })
            }
        </div>
    )
}


export default List




