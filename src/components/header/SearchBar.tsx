import React from 'react'
import { Input } from '../common'
import { useSearchStore } from '@/stores/searchStore'

export const SearchBar = () => {
    const toggleSearch = useSearchStore((store) => store.toggleSearch)

    return (
        <Input
            readOnly
            onClick={toggleSearch}
            placeholder="/ 를 눌러 검색하세요"
            showIcon={true}
            className="cursor-pointer"
        />
    )
}
