import { useRef } from 'react';

const useUniqueComponentId = () => {
  const ref = useRef(0);

  const getId = () => {
    ref.current += 1;
    return ref.current;
  };

  return getId;
};

export default useUniqueComponentId;
