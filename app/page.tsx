'use client'
import { Inquiry } from '@prisma/client'
import { Container, For, Heading, HStack, List, ListItem, Text, VStack } from '@yamada-ui/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [inquirys, setInquirys] = useState<Inquiry[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/inquirys')
      const { inquirys } = (await res.json()) as { inquirys: Inquiry[] }
      setInquirys(inquirys)
    }
    fetchData()
  }, [])

  return <Container w="full" h="100dvh" m="auto" >
    <Heading>お問合せ一覧</Heading>
    <List>
      <For each={inquirys} fallback={<Text>取得中・・・</Text>}>
        {(inquiry) => (
          <ListItem key={inquiry.id} as={VStack}>
            <HStack>
              <Text fontSize="lg">{inquiry.name}</Text>
              <Text>
                {inquiry.createdAt?.toString()}
              </Text>
            </HStack>
            <Text as="pre">{inquiry.content}</Text>
          </ListItem>
        )}
      </For>
    </List>
  </Container>
}
