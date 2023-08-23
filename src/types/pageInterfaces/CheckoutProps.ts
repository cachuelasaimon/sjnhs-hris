import { IItem } from 'types/IItem';
import { IProduct } from 'types/IProduct';

export interface CheckoutProps {
  selectedItems: (Partial<IProduct> & Partial<IItem>)[] | null;
  handleOpenCheckout: () => void;
}
