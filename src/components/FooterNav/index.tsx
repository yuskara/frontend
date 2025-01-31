import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { FooterNavItem } from '@components'
import { FOOTER_MENU } from '@config'

import { ListHeader } from '../Footer'

export const FooterNav = (): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <>
      {FOOTER_MENU.map((item, i) => {
        return (
          <Stack
            align={{ base: 'center', sm: 'start' }}
            marginX={4}
            fontSize="lg"
            color={'teal.500'}
            key={i}
            py={4}
          >
            <ListHeader>{t(item[locale as ILocale].label)}</ListHeader>
            {item[locale as ILocale].children.map((item, i) => {
              return <FooterNavItem key={i} navItem={item} />
            })}
          </Stack>
        )
      })}
    </>
  )
}
