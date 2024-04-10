import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type PersistState = boolean;
type SetPersistState = Dispatch<SetStateAction<PersistState>>;

const usePersist = (): [PersistState, SetPersistState] => {
  const [persist, setPersist] = useState<PersistState>(JSON.parse(localStorage.getItem('persist') || 'false'));

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist]
} 

export default usePersist;