'use client';

import { useEffect, useState } from 'react'
import { CHARACTER_RESPONSE_LIMIT } from '~/config/constant';
import { CharactersApiProps, getListCharacter } from '~/services'
import { CharactersPropType } from './index';

type UseCharactersApiReturn = {
  isLoad: boolean,
  data: CharactersPropType[],
  loadMore: boolean,
  isLastData: boolean
}

function useCharactersApi(filter: CharactersApiProps): UseCharactersApiReturn {
  const [isLoad, setLoad] = useState(true)
  const [data, setData] = useState([])
  const [preloadData, setPreloadData] = useState([])
  const [loadMore, setLoadMore] = useState(false)
  const [isLastData, setIsLastData] = useState(false)

  useEffect(() => {
    loadData();
  }, [filter]);

  async function nextProducts(filter: CharactersApiProps) {
    const response = await getListCharacter(filter)
  
    if (response) {
      setPreloadData(response.data.results)
      
      setLoadMore(response.data.results.length > 0)
      setLoad(false)

    } else {
      // data is not exist
      setIsLastData(true);
      setLoadMore(false)
      setLoad(false)
    }
  }

  async function loadData() {
    setLoad(true);

    if (filter.page == 1) {
      // we expect reset data for the next changes after addition on the other filter key
      setData([]);
      setIsLastData(false);

      const response = await getListCharacter(filter)
  
      if (response) {
        setData(response.data.results)
        
        if (response.data.results.length === CHARACTER_RESPONSE_LIMIT) {
          // move to the next page
          nextProducts({ ...filter, page: filter.page + 1 })
          setLoad(false)

        } else {
          setLoad(false)
        }
        
      } else {
        // data is not exist
        setLoad(false);
      }

    } else {
      setData((prevData) => {
        return [...new Set([...prevData, ...preloadData])]
      })

      await nextProducts({
        ...filter, 
        page: filter.page + 1
      })
    }
  }

  return { isLoad, data, loadMore, isLastData }
}

export default useCharactersApi