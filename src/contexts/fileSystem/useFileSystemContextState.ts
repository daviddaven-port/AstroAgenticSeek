import useAsyncFs from "./useAsyncFs";

const useFileSystemContextState = () => {
  const asyncFs = useAsyncFs();
  return asyncFs;
};

export default useFileSystemContextState;
