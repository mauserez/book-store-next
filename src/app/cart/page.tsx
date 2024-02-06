import { PageTitle } from "@/src/shared/ui/page-title";
import { CartTable } from "@/src/widgets/ui/cart";

export default function CartPage() {
	return (
		<div>
			<PageTitle>SHOPPING CART</PageTitle>
			<CartTable />
		</div>
	);
}
