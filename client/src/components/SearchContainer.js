import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
const SearchContainer = () => {
    const {
        isLoading,
        search,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters,
    } = useAppContext()

    const handleSearch = (e) => {
        if (isLoading) return
        handleChange({ name: e.target.name, value: e.target.value })

    }

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                {/* search position */}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='search'
                        value={search}
                        handleChange={handleSearch}
                    ></FormRow>
                    <FormRowSelect
                        labelText={'status'}
                        name='searchStatus'
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={['All', ...statusOptions]} />
                    <FormRowSelect
                        labelText={'job type'}
                        name='searchType'
                        value={searchType}
                        handleChange={handleSearch}
                        list={['All', ...jobTypeOptions]} />
                    <FormRowSelect
                        labelText={'sort'}
                        name='sort'
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions} />
                    <button
                        className='btn btn-block clear-btn'
                        onClick={(e) => {
                            e.preventDefault()
                            clearFilters()
                        }}
                    >
                        clear
                    </button>


                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer
