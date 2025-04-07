
interface Dog {
    imgUrl: string;
    countLike: number;
    countDislike: number;
    breed: string
  }

interface DogProps {
    dog: Dog;
    index: number;
    onAddLike: (index:number) => void;
    onAddDislike: (index:number) => void;
}

export const DogCard = (props: DogProps) => {
    const {dog, index, onAddLike, onAddDislike} = props;

    return (
        <div className="card-dog">
        <img src={dog.imgUrl} alt={`Dog of breed ${dog.breed}`} />
        <div className="container-count">
          <span className="count-like">{dog.countLike} ❤️</span>
          <span className="count-dislike">{dog.countDislike} 🤮</span>
        </div>
        <div className="buttons">
          <button className="button-like" onClick={() => onAddLike(index)}>
            Like
          </button>
          <button className="button-dislike" onClick={() => onAddDislike(index)}>
            Dislike
          </button>
        </div>
      </div>
    )
}