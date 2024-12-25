import { i } from "@instantdb/core";

const schema = i.schema({
  entities: {
    chats: {
      chatId: i.string,
      participants: i.array(i.string),
      messages: i.array(
        i.object({
          sender: i.string,
          text: i.string,
          timestamp: i.date,
        })
      ),
    },
  },
});

export default schema;