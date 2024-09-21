import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type PersistState = boolean;
type SetPersistState = Dispatch<SetStateAction<PersistState>>;

const usePersist = (): [PersistState, SetPersistState] => {
  const [persist, setPersist] = useState<PersistState>(() => {
    const storedPersist = localStorage.getItem('persist');
    return storedPersist ? JSON.parse(storedPersist) : false;
  });

  useEffect(() => {
    //console.log('Setting persist value:', persist);
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist]
} 

export default usePersist;