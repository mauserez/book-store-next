import { supabase } from "@/supabase";
import { nextResponseUserError } from "@/src/shared/utils/error";
import { NextResponse } from "next/server";
import { getUserAuth } from "@/src/shared/utils/serverSession";

export async function GET() {
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError();
	}

	const result = await supabase.from("cart").select().eq("user_id", user.id);

	return NextResponse.json(result.data);
}

export async function DELETE() {
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError();
	}

	const { data } = await supabase.from("cart").delete().eq("user_id", user.id);

	return NextResponse.json(data);
}
