
import { Component } from "react";
import { SearchbarWarapper, SearchForm, SearchButton, SearchText, SearchInput } from "./Searchbar.styled";

export class Searchbar extends Component {
    state = {
        searchQuery: '',
    }

    handleChange = event => {
        this.setState({searchQuery: event.currentTarget.value})
    }

    handleSubmit = event => {
        const { searchQuery } = this.state
        const { onSubmit } = this.props
        const { resetForm } = this
        
        event.preventDefault()
        if (searchQuery.trim() === '') {
            console.log('add your search query');
        }

        onSubmit(searchQuery)
        resetForm()
    }

    resetForm = () => this.setState({ searchQuery: '' })
    

    render() {
        const { searchQuery } = this.state
        const {handleSubmit, handleChange} = this
        return (
        <SearchbarWarapper >
            <SearchForm onSubmit={handleSubmit}>
                <SearchButton type="submit" >
                <SearchText>Search</SearchText>
                </SearchButton>
                    <SearchInput
                        value={searchQuery}
                        onChange={handleChange}
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
            </SearchForm>
        </SearchbarWarapper>
        )
    }
}