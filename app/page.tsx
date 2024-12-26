'use client'
import { Inquiry } from '@prisma/client'
import { Button, Center, Container, For, FormControl, Heading, HStack, Input, List, ListItem, Text, Textarea, VStack } from '@yamada-ui/react'
import { FormEvent, useEffect, useState } from 'react'

export default function Home() {
  const [inquirys, setInquirys] = useState<Inquiry[]>([])
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    const response = await fetch('/api/inquirys', {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        content
      })
    })
    const json = await response.json()
    console.log(json);

    if (json.message === "success") {
      setEmail('')
      setName('')
      setContent('')
      await fetchData()
    } else {
      console.error(json.error);
    }
    
  }

  const fetchData = async () => {
    const res = await fetch('/api/inquirys', { cache: "no-cache" })
    const { inquirys } = (await res.json()) as { inquirys: Inquiry[] }
    setInquirys(inquirys)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <Container w="full" h="100dvh" m="auto" >
    <Heading>お問合せ一覧</Heading>
    <VStack as="form" onSubmit={handleSubmit}>
      <FormControl label="メールアドレス" required>
        <Input value={email} onChange={e => setEmail(e.currentTarget.value)} type="email" placeholder="sample@email.com" />
      </FormControl>
      <FormControl label="名前" required>
        <Input value={name} onChange={e => setName(e.currentTarget.value)} type="text" placeholder="山田太郎" />
      </FormControl>
      <FormControl label="内容" required>
        <Textarea value={content} onChange={e => setContent(e.currentTarget.value)} placeholder='お問合せ内容'></Textarea>
      </FormControl>
      <Center>
        <Button type="submit">送信</Button>
      </Center>
    </VStack>
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
