import { useState } from 'react';
import './App.css'
import { getRandomDogImage } from './services/add-dog.service';
import { DogResponse } from './services/model/dogs';

interface Dog {
  imgUrl: string;
  countLike: number;
  countDislike: number;
}

function App() {
  const [dogList, setDogList] = useState<Dog[]>([]); 

    const handleAddDog = async () => {
      const dog = await getRandomDogImage('');
      if (dog) {
        setDogList([...dogList, {    
          imgUrl: dog?.imgUrl,
          countLike: dog.likeCount,
          countDislike: dog.dislikeCount
      }
      ]);
    }
  };

    const handleAddFirstDog = async () => {
      const dog = await getRandomDogImage('');
      if (dog) {
        setDogList([ {    
          imgUrl: dog?.imgUrl,
          countLike: dog.likeCount,
          countDislike: dog.dislikeCount
      }, ...dogList, 
      ]);
    }
    }

    const handleAddFiveDogs = async () => {
      const dog = await Promise.all(  // con promise nos aseguramos que todas las promesas funcionen y si una falla se devuleva un error
        Array.from({ length: 5 }, () => getRandomDogImage(''))  // crear un array con 5 esapcios vacios y hacemos la llamada a getRandomImage
      );
      const validDogs = dog.filter((dog): dog is DogResponse => Boolean(dog));  // recorremos los elementos del array y eliminamos los valores null y undefined al pasar dog a tipo booleano, pasamos dog a tipo DogResponse para acceder a sus valores

      setDogList([
        ...dogList,
        ...validDogs.map(dog => ({
          imgUrl: dog.imgUrl,
          countLike: dog.likeCount,
          countDislike: dog.dislikeCount 
        })) 
     ])
    }

  return (
    <>
      <div className='buttons add-button'>
        <button onClick={handleAddDog}>Añadir al final</button>
        <button onClick={handleAddFirstDog}>Añadir al principio</button>
        <button onClick={handleAddFiveDogs}>Añadir 5 perritos</button>
      </div>
      <div className='card-list'>
        {dogList.map((dog) => {
          return  <div className='card-dog'>
          <img src={dog.imgUrl} alt="" />
          <div className='container-count'>
            <span className='count-like'>{dog.countLike} ❤️</span>
            <span className='count-dislike'>{dog.countDislike} 🤮</span>
          </div>
          <div className='buttons'>
            <button className='button-like'>Like</button>
            <button className='button-dislike'> Dislike</button>
          </div>
        </div>
        })}
      </div>
    </>
  )
}

export default App
