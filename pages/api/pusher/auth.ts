import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/auth/auth";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const session = await getServerSession(request, response, authOptions);
    if (!session?.user?.email) {
      return response
        .status(401)
        .json({ sucess: false, message: "Unthorized credentials" });
    }

    const socketId = request.body.socket_id;
    const channel = request.body.channel_name;
    const data = {
      user_id: session.user.email,
    };

    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

    return response
      .status(200)
      .json({ success: true, message: "Success", authResponse });
  } catch (err: any) {
    console.log(err);
    return response.status(500).send(err);
  }
}
