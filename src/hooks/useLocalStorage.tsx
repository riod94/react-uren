import { StorageProperties } from "../shared/interfaces";
import { createStorage, readValue } from "../helpers/createStorage";

function useLocalStorage<T = string>(props: StorageProperties<T>) {
	return createStorage<T>("localStorage", "use-local-storage")(props);
}

const readLocalStorageValue = readValue("localStorage");

export { useLocalStorage, readLocalStorageValue };
