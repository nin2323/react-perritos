import { useState, useEffect } from "react";
import { getRandomDogImage, getAllBreeds } from "../services/add-dog.service";
import { DogResponse } from "../services/model/dogs";

interface Dog {
    imgUrl: string;
    countLike: number;
    countDislike: number;
    breed: string;
  }

export const useDogLogic = () => {
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectBreed, setSelectBreed] = useState('');
  const [filterBreed, setFilterBreed] = useState('');
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [filterByLikes, setFilterByLikes] = useState(false);
  const [filterByDislikes, setFilterByDislikes] = useState(false);

  useEffect(() => {
    getAllBreeds().then(setBreeds);
  }, []);

  const handleBreedChanges = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectBreed(event.target.value);
  };

  const handleFilterChanges = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBreed = event.target.value;
    setFilterBreed(selectedBreed);

    if (selectedBreed === '') {
      setFilteredDogs([]);
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
      }]);
    }
  };

  const handleAddFirstDog = async () => {
    if (selectBreed === '') {
      alert('Por favor, selecciona una raza');
      return;
    }
    const dog = await getRandomDogImage(selectBreed);
    if (dog) {
      setDogList([{ imgUrl: dog?.imgUrl, countLike: 0, countDislike: 0, breed: selectBreed }, ...dogList]);
    }
  };

  const handleAddFiveDogs = async () => {
    if (selectBreed === '') {
      alert('Por favor, selecciona una raza');
      return;
    }
    const dogs = await Promise.all(
      Array.from({ length: 5 }, () => getRandomDogImage(selectBreed))
    );
    const validDogs = dogs.filter((dog): dog is DogResponse => Boolean(dog));
    setDogList([
      ...dogList,
      ...validDogs.map(dog => ({
        imgUrl: dog.imgUrl,
        countLike: 0,
        countDislike: 0,
        breed: selectBreed
      }))
    ]);
  };

  const handleAddLike = (index: number) => {
    setDogList(prevDogs => 
      prevDogs.map((dog, i) =>
        i === index ? { ...dog, countLike: dog.countLike + 1 } : dog
      )
    );
  };
  
  const handleAddDislike = (index: number) => {
    setDogList(prevDogs => 
      prevDogs.map((dog, i) =>
        i === index ? { ...dog, countDislike: dog.countDislike + 1 } : dog
      )
    );
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
    setFilterByLikes(prev => !prev);
  };

  const handleFilterDislikes = () => {
    setFilterByDislikes(prev => !prev);
  };

  return {
    dogList,
    breeds,
    selectBreed,
    filterBreed,
    filteredDogs,
    filterByLikes,
    filterByDislikes,
    handleBreedChanges,
    handleFilterChanges,
    handleAddDog,
    handleAddFirstDog,
    handleAddFiveDogs,
    handleAddLike,
    handleAddDislike,
    dogsToDisplay,
    handleFilterLikes,
    handleFilterDislikes
  };
};