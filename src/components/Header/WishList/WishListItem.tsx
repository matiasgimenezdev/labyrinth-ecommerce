import { FunctionComponent } from 'react';
import { Product } from '../../../types';
import { FiTrash } from 'react-icons/fi';
import { ProductDescription } from '..';
import { useShoppingCart } from '../../../hooks';

type WishListItemProps = {
	product: Product;
	index: number;
	handleRemoveWishListItem: (id: string) => void;
};

export const WishListItem: FunctionComponent<WishListItemProps> = ({
	product,
	index,
	handleRemoveWishListItem,
}) => {
	const { handleAddShoppingCartItem } = useShoppingCart();

	return (
		<article
			className={`p-3 py-1 relative ${
				index !== 3 && 'border-b-2'
			} border-cyan-500`}
		>
			<ProductDescription product={product} />
			<div className='mr-4 py-2 items-center gap-1 flex justify-between'>
				<button
					onClick={() => {
						if (!product) return;
						handleAddShoppingCartItem(product);
					}}
					className='bg-rustyred text-white p-2 py-1 text-sm w-[100px] rounded-lg border border-rustyred hover:bg-transparent hover:text-rustyred transition-colors duration-300'
				>
					Add to cart
				</button>

				<button
					className='text-rustyred px-3 mr-2 text-2xl'
					onClick={() => {
						handleRemoveWishListItem(product.id);
					}}
				>
					<FiTrash />
				</button>
			</div>
		</article>
	);
};
