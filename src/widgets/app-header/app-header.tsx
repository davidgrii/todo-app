'use client'

import React from 'react'
import { Logo } from '@/shared/components/ui/logo'
import { Nav } from '@/widgets/app-header/ui/nav'
import { SearchInput } from '@/widgets/app-header/ui/search-input'
import { MobileBurgerIcon } from '@/widgets/app-header/ui/mobile-menu-icon'
import { Advertisement } from '@/widgets/app-header/ui/advertisement'
import { MobileSidebar } from '@/widgets/app-header/ui/mobile-sidebar'

export const AppHeader = () => {
  return (
    <>
      <Advertisement />

      <header
        className={
          'flex flex-wrap justify-between relative z-50 items-center p-4 shadow lg:flex-nowrap lg:px-5 lg:flex lg:py-0'
        }
      >
        <div className={'flex items-center'}>
          <MobileBurgerIcon />

          <MobileSidebar />

          <Logo />
        </div>

        <SearchInput />

        <Nav />
      </header>
    </>
  )
}
