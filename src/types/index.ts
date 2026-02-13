export interface SellerInfo {
  title: string;
  fullName: string;
  cidNumber: string;
  gewog: string;
  dzongkhag: string;
}

export interface BuyerInfo {
  title: string;
  fullName: string;
  cidNumber: string;
  gewog: string;
  dzongkhag: string;
}

export interface VehicleDetails {
  model: string;
  registrationNumber: string;
  chassisNumber: string;
  engineNumber: string;
}

export interface WitnessInfo {
  title: string;
  fullName: string;
  cidNumber: string;
}

export interface SaleInfo {
  price: string;
  isNonRefundable: boolean;
}

export interface DeedData {
  seller: SellerInfo;
  buyer: BuyerInfo;
  vehicle: VehicleDetails;
  witness: WitnessInfo;
  sale: SaleInfo;
  date: string;
}

export const INITIAL_DEED_DATA: DeedData = {
  seller: {
    title: 'Mr.',
    fullName: '',
    cidNumber: '',
    gewog: '',
    dzongkhag: '',
  },
  buyer: {
    title: 'Mr.',
    fullName: '',
    cidNumber: '',
    gewog: '',
    dzongkhag: '',
  },
  vehicle: {
    model: '',
    registrationNumber: '',
    chassisNumber: '',
    engineNumber: '',
  },
  witness: {
    title: 'Mr.',
    fullName: '',
    cidNumber: '',
  },
  sale: {
    price: '',
    isNonRefundable: false,
  },
  date: new Date().toISOString().split('T')[0],
};

export type FormStep = 
  | 'hero'
  | 'seller-name'
  | 'seller-cid'
  | 'seller-location'
  | 'buyer-name'
  | 'buyer-cid'
  | 'buyer-location'
  | 'vehicle-details'
  | 'sale-price'
  | 'witness'
  | 'review'
  | 'success';

export const STEP_ORDER: FormStep[] = [
  'hero',
  'seller-name',
  'seller-cid',
  'seller-location',
  'buyer-name',
  'buyer-cid',
  'buyer-location',
  'vehicle-details',
  'sale-price',
  'witness',
  'review',
  'success',
];

export const STEP_INDEX: Record<FormStep, number> = {
  'hero': 0,
  'seller-name': 1,
  'seller-cid': 2,
  'seller-location': 3,
  'buyer-name': 4,
  'buyer-cid': 5,
  'buyer-location': 6,
  'vehicle-details': 7,
  'sale-price': 8,
  'witness': 9,
  'review': 10,
  'success': 11,
};
