import getConversationById from "@/app/actions/getConversationById";
import getMessage from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import WaraperClientSide from "./components/WaraperClientSide";

export default async function ConversationId({ params }: any) {
  const { conversationId } = await Promise.resolve(params);

  const conversation = await getConversationById(conversationId);
  const messages = await getMessage(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-screen">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-screen">
      <div className="h-full flex flex-col">
        <WaraperClientSide conversation={conversation} messages={messages} />
        {/* <Header conversation={conversation} />
        <Body initialMessage={messages} />
        <Form /> */}
      </div>
    </div>
  );
}
