import { DogCard } from "./dogCard";

interface Dog {
    imgUrl: string;
    countLike: number;
    countDislike: number;
    breed: string
  }

  interface DogListPops{
    dogs: Dog[];
    onAddLike: (index: number) => void;
    onAddDislike: (index: number) => void;
  }

 export const DogList = (props: DogListPops) => {
    const {dogs, onAddLike, onAddDislike} = props;

    return (
        <div className="card-list">
        {dogs.map((dog, index) => (
          <DogCard
            key={index}
            dog={dog}
            index={index}
            onAddLike={onAddLike}
            onAddDislike={onAddDislike}
          />
        ))}
      </div>
    )
  }