import { Props } from 'react';

import {
    IHomePage,
    IStorePage,
    IStoresPage,
    IEntity
} from '@Interfaces';

export type IStore = {
    home: IHomePage.IStateProps,
    store: IStorePage.IStateProps,
    stores: IStoresPage.IStateProps,
    entities: IEntity.IStateProps,
}