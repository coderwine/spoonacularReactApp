import { React, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './searchRecipes.css';
import spoonKey from '../../keys'

export default function SearchRecipe(props) {

    // console.log(props)

    const [ searchValue, setSearchValue ] = useState('');
    const [ recipeDisplay, setRecipeDisplay ] = useState([]);
    const [ lastPg, setLastPg ] = useState(0);

    // For pagenation
    let pageNumber = 0;

    async function search(e) {
        e.preventDefault();
        console.log(searchValue);

        let buildURL = `${props.url.searchRecipe}?apiKey=${spoonKey}&query=${searchValue}`;

        // console.log('pagenumber:', pgNumber);
        console.log('pagenumber:', pageNumber);

        // if (pgNumber > 0) {
        //     buildURL = buildURL + `&offset=${pgNumber}`
        // }
        if (pageNumber > 0) {
            buildURL = buildURL + `&offset=${pageNumber}`
        }

        console.log(buildURL);

        const response = await fetch(buildURL);
        const data = await response.json();

        console.log('data', data);
        console.log(data.totalResults)
        setLastPg(data.totalResults);
        setRecipeDisplay(data.results);

    }

    // NOTE: working on pagination.  Offsets by numbers of 10, starting at 0.  Need to hit that last page dynamically and it's not shifting + 10 when indicating.  useState allows it but after a second click.

    const pageShift = (pos, value, event) => {
        console.log(pos, value);
        console.log('LAST PAGE:', lastPg)
        let newPosition = value - 10
        // console.log(pageNumber, pageNumber + value)
        switch (true) {
            case pos === 'list start':
                // console.log('page number 0');
                // setPgNumber(0);
                pageNumber = value;
                // search();
                break;
            case pos === 'back one':
                // console.log('page number - 10');
                // setPgNumber(pgNumber-10);
                pageNumber = (pageNumber - value);
                // search();
                break;
            case pos === 'forward one':
                // console.log('page number + 10');
                // setPgNumber(pgNumber+10);
                pageNumber = newPosition;
                // search();
                break;
            case pos === 'list end':
                // console.log('page number arr.length');
                // setPgNumber(100);
                pageNumber = value;
                // search();
                break;
            default:
                console.log('pagination value is invalid');
        }

        search(event);

    }

    // Pageination Build - need to make this so that only portions of it display.
    const paginationDisplay = () => {
        return (
            <Pagination id="pagination-btns" size="md" aria-label="Page navigation">
                <PaginationItem
                    onClick={(e) => pageShift('list start', 0, e)} >
                    <PaginationLink first href="#" />
                </PaginationItem>
                <PaginationItem
                    onClick={(e) => pageShift('back one', 10, e)}>
                    <PaginationLink
                        previous href="#" />
                </PaginationItem>

                <PaginationItem
                    onClick={(e) => pageShift('forward one', 10, e)}>
                    <PaginationLink next href="#" />
                </PaginationItem>
                <PaginationItem
                    onClick={(e) => pageShift('list end', lastPg, e)}>
                    <PaginationLink last href="#" />
                </PaginationItem>
            </Pagination>
            )
    }

return (
    <>
        <div className="search-bar-container">
            <Form onSubmit={search} className="search-form" inline>
                <FormGroup>
                    <Input type="text" name="text" id="search-recipe" placeholder="Input Recipe Here" onChange={(e) => setSearchValue(e.target.value)} />
                </FormGroup>
                {' '}
                <Button id="form-button" color="success">Submit</Button>
                {paginationDisplay()}
            </Form>
        </div>

        <div className="results-container">
            {
                recipeDisplay.map((recipe, i) => {
                    return (
                        <>
                            <div className="recipe-item">
                                <img src={recipe.image} alt={recipe.title} />
                                <p>{recipe.title}</p>
                            </div>
                        </>
                    )
                })
            }
        </div>


    </>
)
}