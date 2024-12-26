import { db } from "@/utils/prisma";
import { Prisma } from "@prisma/client";

async function main() {
  const inquirys: Prisma.InquiryCreateInput[] = [
    {
      name: "John",
      email: "john@email.com",
      content: "hello",
      createdAt: new Date(),
    },
    {
      name: "John2",
      email: "john2@email.com",
      content: "hello world",
      createdAt: new Date(),
    },
  ];

  await db.$transaction(
    () => db.inquiry.createMany({
      data: inquirys
    })
  );

  console.log("データ挿入完了");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });