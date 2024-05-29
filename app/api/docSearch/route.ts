import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = await request.nextUrl.searchParams;
  const query = Object.fromEntries(searchParams.entries());

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("X-Auth-Token", process.env.YUQUE_TOKEN!);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  // 不太行，要超级会员
  const res = await fetch(
    `https://www.yuque.com/api/v2/search?q=${query.q}&type=doc&scope=lidelong-blog/info&strict=true`,
    requestOptions
  ).then((response) => response.json());

  return NextResponse.json(res.data);
};
