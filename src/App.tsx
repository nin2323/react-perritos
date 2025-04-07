import './App.css';
import { BreedSelector } from './components/breedSelector';
import { FilterControls } from './components/filterControls';
import { DogList } from './components/dogList';
import { useDogLogic } from './hooks/useDogLogic';

function App() {
  const {
    breeds,
    selectBreed,
    filterBreed,
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
  } = useDogLogic();

  return (
    <>
    <div className='title'>
      <p>DogList</p>
    </div>
      <div className="buttons add-button">
        <BreedSelector
          breeds={breeds}
          selectBreed={selectBreed}
          onBreedChange={handleBreedChanges}
          onAddDog={handleAddDog}
          onAddFirstDog={handleAddFirstDog}
          onAddFiveDogs={handleAddFiveDogs}
        />
      </div>

      <div className="buttons buttons-filter">
        <FilterControls
          breeds={breeds}
          filterBreed={filterBreed}
          onFilterBreedChange={handleFilterChanges}
          filterByLikes={filterByLikes}
          onFilterLikes={handleFilterLikes}
          filterByDislikes={filterByDislikes}
          onFilterDislikes={handleFilterDislikes}
        />
      </div>

      <DogList
        dogs={dogsToDisplay}
        onAddLike={handleAddLike}
        onAddDislike={handleAddDislike}
      />
    </>
  );
}

export default App;