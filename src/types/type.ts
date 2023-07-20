export type ProductType = {
  id: string;
  title: string;
  url: string;
  brand: string;
  price: string;
  image: string;
}

export type CollectionType = {
  id: string;
  title: string;
  url: string;
}

export type SuggestionTermType = {
  id: string;
  title: string;
  url: string;
}

export type SuggestionsType = {
  collections: CollectionType[],
  products: ProductType[],
  suggestion_terms: SuggestionTermType[],
}