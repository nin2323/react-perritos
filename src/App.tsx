import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import './App.css'
import { getRandomDogImage } from './services/add-dog.service';
import { DogResponse } from './services/model/dogs';
import { getAllBreeds } from './services/add-dog.service';

interface Dog {
  imgUrl: string;
  countLike: number;
  countDislike: number;
  breed: string
}


function App() {
  const [dogList, setDogList] = useState<Dog[]>([]); 
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectBreed, setSelectBreed] = useState<string>('');
  const [filterBreed, setFilterBreed] = useState<string>('');
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [filterByLikes, setFilterByLikes] = useState(false);
  const [filterByDislikes, setFilterByDislikes] = useState(false);

  useEffect(() => {
    getAllBreeds().then(setBreeds); // funcion que devuelve una promesa, cuando la promesa se cumple se llama a setBreeds, con el then cuando la promesa se resuelve lo hace de manera asincrona
  }, []);


    const handleBreedChanges = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectBreed(event.target.value);
    }

    const handleFilterChanges = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedBreed = event.target.value;
      setFilterBreed(selectedBreed); // Cambiar la raza seleccionada para filtrar
  
      // Filtrar los perros en el momento que el usuario selecciona una raza
      if (selectedBreed === '') {
        setFilteredDogs([]); // Si no hay raza seleccionada, mostrar todos
      } else {
        const filtered = dogList.filter(dog => dog.breed === selectedBreed);
        setFilteredDogs(filtered);
      }
    };

    const handleAddDog = async () => {
      if (selectBreed === '') {
        alert('Por favor, selecciona una raza');
        return;
      }
      const dog = await getRandomDogImage(selectBreed);
      if (dog) {
        setDogList([...dogList, {    
          imgUrl: dog?.imgUrl,
          countLike: 0,
          countDislike: 0,
          breed: selectBreed
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
          countLike: 0,
          countDislike: 0,
          breed: selectBreed
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
          countLike: 0,
          countDislike: 0,
          breed: selectBreed
        })) 
     ])
    }

      const handleAddLike = (index: number) => {
        setDogList((prevDogs) =>
          prevDogs.map((dog, i) =>
            i === index ? { ...dog, countLike: dog.countLike + 1 } : dog
          )
        );
      };

      const handleAddDislike = (index: number) => {
        setDogList((prevDogs) => 
          prevDogs.map((dog, i) => 
            i === index ? { ...dog, countDislike: dog.countDislike + 1} : dog
        )
       )
      };

      const dogsToDisplay = (() => {
        let dogs = filterBreed ? filteredDogs : dogList;
        if (filterByLikes) {
          dogs = dogs.filter(dog => dog.countLike > 0);
        } else if (filterByDislikes) {
          dogs = dogs.filter(dog => dog.countDislike > 0);
        }
        return dogs;
      })();


      const handleFilterLikes = () => {
        setFilterByLikes(prev => !prev)
      };

      const handleFilterDislikes = () => {
        setFilterByDislikes(prev => !prev)
      }


  return (
    <>
      <div className="buttons add-button">
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
      <div className="buttons buttons-filter">
      <select value={filterBreed} onChange={handleFilterChanges}>
          <option value=""> Filtrar por Raza</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        <button onClick={handleFilterLikes}>{filterByLikes ? 'Mostrar todos' : 'Filtrar por likes'}</button>
        <button onClick={handleFilterDislikes}>{filterByDislikes ? 'Mostrar todos' : 'Filtrar por dislikes'}</button>
      </div>
      <div className="card-list">
        {dogsToDisplay.length === 0 ? (
          <p></p>
        ) : (
          dogsToDisplay.map((dog, index) => (
            <div className="card-dog" key={index}>
              <img src={dog.imgUrl} alt="" />
              <div className="container-count">
                <span className="count-like">{dog.countLike} ❤️</span>
                <span className="count-dislike">{dog.countDislike} 🤮</span>
              </div>
              <div className="buttons">
                <button className="button-like" onClick={() => handleAddLike(index)}>Like</button>
                <button className="button-dislike" onClick={() => handleAddDislike(index)}>Dislike</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
