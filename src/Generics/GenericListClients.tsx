import { IStorePage } from '@Interfaces';
import { GenericList } from './GenericList';

export class StoresList extends GenericList<IStorePage.IStoreData> {}
export class StoresSkeletonList extends GenericList<string> {}
export class StoreProductsList extends GenericList<IStorePage.IStoreProductData> {}
