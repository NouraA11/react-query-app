import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = (pageNumber) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}
export const PaginatedQueries = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const {isLoading, data, isError, error} = useQuery(
        ['colors', pageNumber], 
        () => fetchColors(pageNumber),
        {
            keepPreviousData: true
        });

    if (isLoading) {
        return <h2>Loading...</h2>
      }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    return (
        <>
            <div>
                <h2>RQ Paginated</h2>
                {
                    data?.data.map((color) => {
                        return (
                        <div key={color.id}>
                            <h3>
                                {color.id}. {color.label}
                            </h3>
                        </div>
                    )})
                }
            </div>
            <div>
                <button 
                onClick={() => setPageNumber(page => page-1)} 
                disabled={pageNumber === 1}>
                    Previous page</button>
                <button 
                onClick={() => setPageNumber(page => page+1)} 
                disabled={pageNumber === 3}>
                    Next page</button>
            </div>
        </>
    )
  }
  