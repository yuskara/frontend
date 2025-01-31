/**
 TODO: This page is created just for testing purposes
 * This page must be removed before the actual publish
 * It's better to use StoryBook for visual component testing
 */

import { useState } from 'react'

import { Box, Heading, HStack, Switch, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { EffectCoverflow, Pagination } from 'swiper'

import { ChakraNextImage, Container, Layout, Slider } from '@components'
import { useSubpagesQuery } from '@lib'

import eventsEn from '../../src/data/events.en.json'
import eventsNl from '../../src/data/events.nl.json'
import eventsTr from '../../src/data/events.tr.json'
import slideData from '../../src/data/slide-data.json'

const EVENTS_DATA: Record<string, unknown> = {
  en: eventsEn,
  nl: eventsNl,
  tr: eventsTr,
}

const SliderPage = (): JSX.Element => {
  const router = useRouter()
  const locale = router.locale as string
  const { data, isLoading } = useSubpagesQuery({ locale })
  const [loading, setLoading] = useState<boolean>(true)

  const mockEvents = EVENTS_DATA[locale] as ISubpage[]

  return (
    <Layout seo={{ nofollow: true, noindex: true, disableGooglebot: true }}>
      <Container>
        {/* Live Data with Social Cards*/}
        <Slider
          heading="Live Data with Social Cards"
          items={data}
          centeredSlides
          activeStyles={{
            borderColor: 'primary.400',
            borderWidth: 2,
          }}
          isLoading={isLoading}
          hasSocialCard
        />

        {/* Live Data with hero section & simple card*/}
        <Slider
          heading="Live Data with centered & hero section & simple card"
          items={data}
          centeredSlides
          activeStyles={{
            borderColor: 'primary.400',
            borderWidth: 2,
          }}
          isLoading={isLoading}
          isSimple
          hasSocialCard
          hasThumb
        />

        {/* Live Data (Centered - Active Style)*/}
        <Slider
          heading="Live Data (Centered - Active Style)"
          items={data}
          customStyles={{
            filter: 'grayscale(1)',
            _hover: {
              boxShadow: 'md',
              filter: 'grayscale(0)',
            },
          }}
          activeStyles={{
            filter: 'grayscale(0)',
            transform: 'translateY(-5px) scale(1.1)',
          }}
          isLoading={isLoading}
          hasSocialCard
        />

        {/* Live Data */}
        <Slider
          heading="Live Data"
          items={data}
          centeredSlides={false}
          activeStyles={{
            borderColor: 'primary.400',
            borderWidth: 2,
            boxShadow: 'lg',
          }}
          isLoading={isLoading}
        />

        {/* Mock Data */}
        <Slider
          heading="Mock Data (Default Pagination)"
          items={mockEvents}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        />

        {/* Loading State */}
        <Box>
          <Slider
            heading="Loading State"
            items={mockEvents}
            isLoading={loading}
          />
          <HStack>
            <Switch
              colorScheme="primary"
              size="lg"
              defaultChecked={true}
              onChange={() => setLoading(!loading)}
            />
            <Text>Switch loading</Text>
          </HStack>
        </Box>

        {/* Custom Slide */}
        <Slider
          heading="Custom Slide (Mock Data)"
          centeredSlides={false}
          navigation={false}
        >
          {slideData.map((data, i) => (
            <VStack
              key={i}
              pos="relative"
              h={300}
              p={4}
              cursor="pointer"
              justify="center"
              textAlign="center"
              color="white"
              textShadow="0 0 10px black"
            >
              <Heading size="lg" noOfLines={1} color="white" zIndex={2}>
                {data.title}
              </Heading>
              <Text zIndex={2} color="white" noOfLines={2}>
                {data.description}
              </Text>
              <Box
                pos="absolute"
                top={0}
                sk
                left={0}
                w="full"
                h="full"
                _before={{
                  content: '""',
                  pos: 'absolute',
                  top: 0,
                  left: 0,
                  w: 'full',
                  h: 'full',
                  bgGradient: 'linear(to-t, primary.900, primary.200)',
                  blendMode: 'multiply',
                  zIndex: 1,
                }}
              >
                <ChakraNextImage
                  image={data.imageUrl}
                  alt={data.imageAlt}
                  w="full"
                  h="full"
                />
              </Box>
            </VStack>
          ))}
        </Slider>

        {/* Image Slider */}
        <Slider
          heading="Image Slider (Fade Effect - Custom Pagination)"
          modules={[EffectCoverflow, Pagination]}
          effect="coverflow"
          centeredSlides={false}
          navigation={false}
          pagination={{ clickable: true }}
          slides={{ base: 1, md: 3 }}
          paginationStyles={{
            top: 'unset',
            bottom: '15px',
            textAlign: 'center',

            '&-bullet': {
              bg: 'primary.50',
              opacity: 1,
              boxShadow: 'md',

              '&-active': {
                bg: 'primary.400',
              },
            },
          }}
        >
          {new Array(10).fill(0).map((_, i) => (
            <ChakraNextImage
              key={i}
              h={300}
              image={`https://picsum.photos/id/${i * 10}/300`}
            />
          ))}
        </Slider>
      </Container>
    </Layout>
  )
}

export default SliderPage
