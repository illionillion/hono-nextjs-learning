'use client'
import { Inquiry } from '@prisma/client'
import { Container, Heading, HStack, List, ListItem, Text, VStack } from '@yamada-ui/react'
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
      {
        inquirys.length > 0 ? inquirys.map(inquiry => (
          <ListItem key={inquiry.id} as={VStack}>
            <HStack>
              <Text fontSize="lg">{inquiry.name}</Text>
              <Text>
                {inquiry.createdAt?.toString()}
              </Text>
            </HStack>
            <Text as="pre">{inquiry.content}</Text>
          </ListItem>
        ))
          : <Text>取得中・・・</Text>
      }
    </List>
  </Container>
}
