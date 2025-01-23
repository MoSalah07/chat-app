import prisma from "../libs/prismadb";

export default async function getMessage(conversationId: string) {
  try {
    const message = prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return message;
  } catch (err: any) {
    console.log(err);
    return [];
  }
}
