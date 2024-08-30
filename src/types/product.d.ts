export interface Product {
  relevance: any;
  name: any;
  sales: any;
  price: any;
  id: any;
  quantity: any;
  data: Data;
  extensions: Extensions;
}

export interface Data {
  products: Products;
}

export interface Products {
  pagination: Pagination;
  search: Search;
  products: Product[];
}

export interface Pagination {
  objectsPerPage: number;
  currentPage: number;
  pageCount: number;
  objectCount: number;
}

export interface Search {
  term: Term;
}

export interface Term {
  original: string;
  corrected: any;
}

export interface Product {
  productId: string;
  title: string;
  depositLabel?: string;
  imageURL: string;
  attributes: Attributes;
  orderLimit: number;
  categories: string[];
  detailsViewRequired: boolean;
  articleId: string;
  listing: Listing;
  advertisement?: Advertisement;
}

export interface Attributes {
  isBulkyGood: boolean;
  isOrganic: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isDairyFree: boolean;
  isGlutenFree: boolean;
  isBiocide: boolean;
  isAgeRestricted: any;
  isRegional: boolean;
  isNew: boolean;
}

export interface Listing {
  listingId: string;
  listingVersion: number;
  currentRetailPrice: number;
  totalRefundPrice?: number;
  grammage: string;
  discount?: Discount;
  loyaltyBonus: any;
}

export interface Discount {
  __typename: string;
  validTo: string;
}

export interface Advertisement {
  source: string;
  id: string;
}

export interface Extensions {
  http: Http[];
}

export interface Http {
  path: string[];
  message: string;
  statusCode: number;
}
