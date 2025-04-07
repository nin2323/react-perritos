import { ChangeEvent } from "react";


interface BreedSelectorProps {
    breeds: string[];
    selectBreed: string;
    onBreedChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onAddDog: () => void;
    onAddFirstDog: () => void;
    onAddFiveDogs: () => void;
}

export const BreedSelector = (props: BreedSelectorProps) => {
    const {breeds, selectBreed, onBreedChange, onAddDog, onAddFirstDog, onAddFiveDogs} = props;

    return (
        <div className="buttons add-button">
        <select value={selectBreed} onChange={onBreedChange}>
          <option value="">Elegir raza</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button onClick={onAddDog}>Añadir al final</button>
        <button onClick={onAddFirstDog}>Añadir al principio</button>
        <button onClick={onAddFiveDogs}>Añadir 5 perritos</button>
      </div>
    )
}