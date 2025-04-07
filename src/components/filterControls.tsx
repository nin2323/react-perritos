import { ChangeEvent } from "react";

interface FilterControlsProps {
    breeds: string[];
    filterBreed: string;
    filterByLikes: boolean;
    filterByDislikes: boolean;
    onFilterBreedChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onFilterLikes: () => void;
    onFilterDislikes: () => void;
}

export const FilterControls = (props: FilterControlsProps) => {
    const {breeds, filterBreed, filterByLikes, filterByDislikes, onFilterBreedChange, onFilterLikes, onFilterDislikes} = props;

    return (
        <div className="buttons buttons-filter">
        <select value={filterBreed} onChange={onFilterBreedChange}>
          <option value="">Filtrar por Raza</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button onClick={onFilterLikes}>
          {filterByLikes ? 'Mostrar todos' : 'Filtrar por likes'}
        </button>
        <button onClick={onFilterDislikes}>
          {filterByDislikes ? 'Mostrar todos' : 'Filtrar por dislikes'}
        </button>
      </div>
    )
}