import { useEffect, useState } from 'react';
import './App.css'
import { getRandomDogImage } from './services/add-dog.service';
import { DogResponse } from './services/model/dogs';
import { getAllBreeds } from './services/add-dog.service';

interface Dog {
  imgUrl: string;
  countLike: number;
  countDislike: number;
}


function App() {
  const [dogList, setDogList] = useState<Dog[]>([]); 
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectBreed, setSelectBreed] = useState<string>('');

  useEffect(() => {
    getAllBreeds().then(setBreeds);
  }, []);


  const handleBreedChanges = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectBreed(event.target.value);
  }

    const handleAddDog = async () => {
      if (selectBreed === '') {
        alert('Por favor, selecciona una raza');
        return;
      }
      const dog = await getRandomDogImage(selectBreed);
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
      if (selectBreed === '') {
        alert('Por favor, selecciona una raza');
        return;
      }
      const dog = await getRandomDogImage(selectBreed);
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
      if (selectBreed === '') {
        alert('Por favor, selecciona una raza');
        return;
      }
      const dog = await Promise.all(  // con promise nos aseguramos que todas las promesas funcionen y si una falla se devuleva un error
        Array.from({ length: 5 }, () => getRandomDogImage(selectBreed))  // crear un array con 5 esapcios vacios y hacemos la llamada a getRandomImage
      );
      const validDogs = dog.filter((dog): dog is DogResponse => Boolean(dog));  // recorremos los elementos del array y le decimos que dog puede tener los valores de DogResponse, pasamos dog a tipo booleano para que devuleva false si los valores son null o undefined y evitamos errores de la api

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
        <select value={selectBreed} onChange={handleBreedChanges}>
          <option value="">Raza</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
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
