import React from 'react'

const SearchContext = React.createContext({
  searchText: '',
  onStartSearch: () => {},
})

export default SearchContext
