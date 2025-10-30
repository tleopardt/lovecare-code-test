'use client';

import { useCallback, useRef, useState } from "react";
import useCharactersApi from "./components/ListCharacters/useCharactersApi";
import ListCharacters from "./components/ListCharacters";
import TextInput from "./components/TextInput";
import { CharactersApiProps } from "~/services";
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from "~/assets/icons/SearchIcon";
import CloseIcon from "~/assets/icons/CloseIcon";
import Loader from "./components/Loader";

export default function Home() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [Filter, setFilter] = useState({
    page: 1,
    name: '',
    species: '',
    status: '',
    gender: ''
  })

  // run the characters API 
  const { isLoad, data, loadMore, isLastData } = useCharactersApi(Filter)

  /**
    we will get the very last data which is the element
    in this function using usecallback and then we gonna
    disconnect the current last data after loading API
    so it can updated into a right value, and then the
    last thing is we will render more page.
  */
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (element: HTMLElement | null) => {
      if (isLoad) return
      
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && loadMore) {
          setFilter(prevState => ({
            ...prevState,
            page: prevState.page + 1
          }))
        }
      })

      if (element) observer.current.observe(element)
    }, [isLoad, loadMore]
  )

  const handleChange = <K extends keyof CharactersApiProps>
    (key: K, value: CharactersApiProps[K]) => {

      setFilter(prevState => ({
        ...prevState,
        page: 1,
        [key]: value
      }))
  }

  const handleSearch = useDebouncedCallback((value) => {
    if (value === '' && Filter.name === '') return;
    
    handleChange('name', value);
  }, 700);

  const renderClearSearching = useCallback(() => {
    const input = searchRef.current;

    if (!input || !input.value) return null;

    const handleClear = () => {
      handleChange('name', '');
      
      input.value = '';
    };

    return (
      <button onClick={handleClear}>
        <CloseIcon width={24} height={24} />
      </button>
    );
  }, [handleChange]);

  const resetFilter = () => {
    setFilter(prevState => ({
      page: 1,
      name: prevState.name,
      species: '',
      status: '',
      gender: ''
    }))
  }

  return (
    <main>
      <div className="flex flex-col justify-center items-center text-center gap-3 !py-[4em] !px-[5%] md:!px-[15%]">
        <h1 className="font-semibold text-3xl">Meet the Multiverse: The Rick and Morty Character Gallery</h1>
        <p className="!mb-4">
          Explore every bizarre, brilliant, and chaotic mind from across the multiverse. 
          From genius scientists to interdimensional outlaws, discover the faces that make 
          Rick and Morty unforgettable.
        </p>
        
        <TextInput
          ref={searchRef}
          placeholder='Search character'
          onChange={(e) => handleSearch(e.target.value)}
          leftIcon={<SearchIcon />}
          rightIcon={renderClearSearching()} />
        
        <div className="flex flex-col w-full gap-3 mt-[4px] sm:flex-row">
          <select
            className="input-select"
            value={Filter.species}
            onChange={(e) => handleChange('species', e.target.value)}
          >
            <option value='' disabled>Species</option>
            <option value='human'>Human</option>
            <option value='alien'>Alien</option>
          </select>

          <select
            className="input-select"
            value={Filter.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value='' disabled>Status</option>
            <option value='alive'>Alive</option>
            <option value='dead'>Dead</option>
          </select>

          <select
            className="input-select"
            value={Filter.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value='' disabled>Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='genderless'>Genderless</option>
            <option value='unkown'>Unknown</option>
          </select>
        </div>

        {
          (Filter.gender !== '' || Filter.species !== '' || Filter.status !== '') && 
            <button className='flex items-center gap-1 cursor-pointer !p-3' onClick={resetFilter}>
              <CloseIcon fill='red' width={24} height={24} />
              <p className="text-[red]">Clear Filter</p>
            </button>
        }
      </div>

      <ListCharacters data={data} lastItemRef={lastItemRef} />
      
      {
        isLoad &&
          <div className="w-full !my-[40px] flex justify-center">
            <Loader />
          </div>
      }

      {
        !isLoad && data.length === 0 &&
          <div className="w-full flex flex-col text-center items-center">
            <SearchIcon width={40} height={40} />

            <h1 className="!px-[5%] md:!px-[0] !mt-4">No Results Found</h1>
            <p className="!px-[5%] md:!px-[0]">
              No matching results. Try updating or resetting your filters.
            </p>
          </div>
      }

      { !isLoad && isLastData && <p className="text-center">~ End of catalouge ~</p> }
    </main>
  );
}
