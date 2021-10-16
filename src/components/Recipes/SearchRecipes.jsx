import { React, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import './searchRecipes.css';
// import spoonKey from '../../keys'

export default function SearchRecipe(props) {

    console.log(props)
    const searchProps = props.search;

    const paginationDisplay = () => {
        return (
            <Pagination id="pagination-btns" size="md" aria-label="Page navigation">
                <PaginationItem
                    onClick={(e) => props.search.pgShift('list start')} >
                    <PaginationLink first />
                </PaginationItem>
                <PaginationItem
                    onClick={(e) => props.search.pgShift('back one')}>
                    <PaginationLink
                        previous />
                </PaginationItem>

                <PaginationItem
                    onClick={(e) => props.search.pgShift('forward one')}>
                    <PaginationLink next />
                </PaginationItem>
                <PaginationItem
                    onClick={(e) => props.search.pgShift('list end')}>
                    <PaginationLink last />
                </PaginationItem>
            </Pagination>
            )
    }

    return (
        <>
            <div className="search-bar-container">
                    <Input type="text" name="text" id="search-recipe" placeholder="... what to eat?" onChange={(e) => searchProps.input(e.target.value)} />
                        {' '}
                    <Button onClick={props.search.term} id="form-button" color="success">Search</Button>

                    {paginationDisplay()}
            </div>

            <div className="results-container">
                {
                    searchProps.recipeArr.map((recipe, i) => {
                        return (
                            <>
                                <div key={recipe.id} className="recipe-item" id={`${recipe.id}`}>
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

// NOTE: Need to adjust  