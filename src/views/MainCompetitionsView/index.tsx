import { Box, Stack } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import { CardGroup, Container, Hero, Layout, Markdown } from '@components'

interface CompetitionsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: IPage
  seo: NextSeoProps
  link: string
}

const MainCompetitionsView = ({
  source,
  pageData,
  seo,
}: CompetitionsProps): JSX.Element => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        title={pageData.title}
        image={pageData.image}
        isFullHeight={false}
      />
      <Container>
        <Stack my={8} spacing={8}>
          {source && (
            <Box
              my={4}
              fontSize="md"
              maxW="container.md"
              mx="auto"
              textAlign="center"
            >
              <Markdown source={source} />
            </Box>
          )}
          <CardGroup
            items={pageData?.competitions as ISubpage[]}
            isSimple={true}
            hasLink
          />
        </Stack>
      </Container>
    </Layout>
  )
}

export default MainCompetitionsView
