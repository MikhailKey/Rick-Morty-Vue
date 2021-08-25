// -------------------- GETTERS ------------------------
const CHARACTERS = "characters";
const SPECIES = "species";
const SEARCH_VALUE = "searchValue";
const PAGE = "page";
const PAGES_COUNT = "pagesCount";
const LOADING = "loading";
const ERROR = "error";
const FAVOURITES_IDS = "favouritesIds";
const FAVOURITES = "favourites";
const CHARACTER = "character";
// -------------------- ACTIONS ------------------------
const GET_CHARACTERS = "getCharacters";
const GET_PAGE = "getPage";
const GET_SEARCH_VALUE = "getSearchValue";
const GET_SPECIES = "getSpecies";
const GET_URL_PARAMS = "getURLParams";
const ADD_TO_FAVOURITES = "addToFavourites";
const REMOVE_FROM_FAVOURITES = "removeFromFavourites";
const GET_FAVOURITES_IDS = "getFavouritesIds";
const GET_FAVOURITES = "getFavourites";
const GET_CHARACTER = "getCharacter";
// -------------------- MUTATIONS ------------------------
const CHANGE_ERROR = "changeError";
const CHANGE_LOADING = "changeLoading";
const UPDATE_CHARACTERS = "updateCharacters";
const UPDATE_PAGES_COUNT = "updatePagesCount";
const UPDATE_PAGE = "updatePage";
const UPDATE_SEARCH_VALUE = "updateSearchValue";
const UPDATE_SPECIES = "updateSpecies";
const UPDATE_URL_PARAMS = "updateURLParams";
const UPDATE_FAVOURITES = "updateFavourites";
const FILTER_FAVOURITES = "filterFavourites";
const UPDATE_FAVOURITES_FROM_STORE = "updateFavouritesFromStore";
const LOAD_FAVOURITES_LIST = "loadFavouritesList";
const UPDATE_CHARACTER = "updateCharacter";

export {
  //getters
  CHARACTERS,
  ERROR,
  FAVOURITES_IDS,
  LOADING,
  PAGE,
  PAGES_COUNT,
  SEARCH_VALUE,
  SPECIES,
  FAVOURITES,
  CHARACTER,
  //actions,
  ADD_TO_FAVOURITES,
  GET_CHARACTERS,
  GET_PAGE,
  GET_SEARCH_VALUE,
  GET_SPECIES,
  GET_URL_PARAMS,
  REMOVE_FROM_FAVOURITES,
  GET_FAVOURITES_IDS,
  GET_FAVOURITES,
  GET_CHARACTER,
  //mutations
  CHANGE_ERROR,
  CHANGE_LOADING,
  FILTER_FAVOURITES,
  UPDATE_CHARACTERS,
  UPDATE_FAVOURITES,
  UPDATE_PAGE,
  UPDATE_PAGES_COUNT,
  UPDATE_SEARCH_VALUE,
  UPDATE_SPECIES,
  UPDATE_URL_PARAMS,
  UPDATE_FAVOURITES_FROM_STORE,
  LOAD_FAVOURITES_LIST,
  UPDATE_CHARACTER,
};
