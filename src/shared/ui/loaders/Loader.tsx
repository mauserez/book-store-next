import { InfinitySpin } from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Loader() {
	return (
		<div className={s.loaderWrap}>
			<InfinitySpin
				visible={true}
				width="200"
				color="#756ad3"
				ariaLabel="infinity-spin-loading"
			/>
		</div>
	);
}
