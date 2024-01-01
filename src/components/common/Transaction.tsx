import React from "react";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { formatUnits } from "viem";

import { FilterTransactionCallbackType } from "@/@types/filter";
import { truncate } from "@/utils/truncate";
import { DecodePasswordData } from "@/@types/decode";

const Transaction: React.FC<{
	transactionData: FilterTransactionCallbackType;
	isPending: boolean;
}> = ({ transactionData, isPending }) => {
	let data: {
		isDecoded: boolean;
		data: string | DecodePasswordData;
	} =
		typeof transactionData.data !== "string"
			? { isDecoded: true, data: transactionData.data }
			: { isDecoded: false, data: transactionData.data };

	return (
		<div id="transaction">
			<div className="flex flex-col gap-[6px]">
				<p title={transactionData.hash}>
					<span className="font-bold">Transaction Hash:</span>{" "}
					{truncate(transactionData.hash, 5, 63)}
				</p>
				<p title={transactionData.from}>
					<span className="font-bold">From:</span>{" "}
					{truncate(transactionData.from, 5, 39)}
				</p>
				<p title={transactionData.to}>
					<span className="font-bold">To:</span>{" "}
					{transactionData && transactionData.to
						? truncate(transactionData.to, 5, 39)
						: "Nothing"}
				</p>
				<p title={JSON.stringify(data.data)}>
					<span className="font-bold">Data:</span>{" "}
					{/* {JSON.stringify({ password: "minhdangvadinhhuy" }).replace("\n", "")} */}
					{typeof data.data !== "string"
						? JSON.stringify({ password: data.data.password }).replace("\n", "")
						: truncate(data.data, 5, 32)}
				</p>
				<p>
					<span className="font-bold">Gas Price:</span>{" "}
					{transactionData.gasPrice &&
						formatUnits(BigInt(transactionData.gasPrice.toString()), 9)}{" "}
					Gwei
				</p>
			</div>

			<div className="absolute right-[12px] top-[12px]">
				{transactionData && typeof transactionData.data !== "string" && (
					<Tag
						className="text-[14px] px-[6px]"
						icon={<CheckCircleOutlined />}
						color="success"
					>
						decoded
					</Tag>
				)}
				{isPending ? (
					<Tag
						className="text-[14px] px-[6px]"
						icon={<SyncOutlined />}
						color="gold"
					>
						pending
					</Tag>
				) : (
					<Tag
						className="text-[14px] px-[6px]"
						icon={<SyncOutlined />}
						color="purple"
					>
						executed
					</Tag>
				)}
			</div>
		</div>
	);
};

export default Transaction;
