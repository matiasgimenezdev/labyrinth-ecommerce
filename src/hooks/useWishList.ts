import { useContext } from 'react';
import { WishListContext } from '../context';
import { WishList, Product } from '../types';
import { toast } from 'react-toastify';
import { saveLocalStorage } from '../helpers';

type useWishList = {
	wishList: WishList;
	handleRemoveWishListItem: (id: string) => void;
	handleAddWishListItem: (product: Product) => void;
};

export const useWishList = () => {
	const { wishList, updateWishList } = useContext(WishListContext);
	const localStorageKey = 'wish-list';

	function handleRemoveWishListItem(id: string) {
		if (!wishList[id]) return;

		const nextWishList = { ...wishList };
		delete nextWishList[id];
		updateWishList(nextWishList);
		saveLocalStorage(localStorageKey, JSON.stringify(nextWishList));
	}

	function handleAddWishListItem(product: Product) {
		if (wishList[product.id]) return;

		if (Object.entries(wishList).length === 4) {
			return toast.error(
				'The wishlist can contain up to 4 different products'
			);
		}

		const nextWishList = { ...wishList, [product.id]: { product } };

		updateWishList(nextWishList);
		saveLocalStorage(localStorageKey, JSON.stringify(nextWishList));
	}

	return { wishList, handleRemoveWishListItem, handleAddWishListItem };
};
