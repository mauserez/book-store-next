import { InfinitySpin } from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Loader() {
	return (
		<div className={s.loaderWrap}>
			<InfinitySpin
				visible={true}
				width="200"
				color="#4fa94d"
				ariaLabel="infinity-spin-loading"
			/>
		</div>
	);
}
