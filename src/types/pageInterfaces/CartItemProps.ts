import React from 'react';

import { IProduct } from '~/types';

export interface ICartItemProps extends Partial<IProduct> {
  cartId: string;
  quantity?: number;
  name?: string;
  isSelected: boolean;
  setSelectedItems: React.SetStateAction<React.Dispatch<any>>;
}
