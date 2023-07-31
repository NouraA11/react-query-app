import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = ({queryKey}) => {
    const email = queryKey[1];
    return axios.get(`http://localhost:4000/users/${email}`)
}
const fetchProfileByProfileId = ({queryKey}) => {
    const profileId = queryKey[1];
    return axios.get(`http://localhost:4000/profiles/${profileId}`)
}

export const DependentQueries = ({email}) => {
    const { data: user, isError, error } = useQuery(
        ['user', email],
        fetchUserByEmail
    );
    const profileId = user?.data.profileId;
    const { data: profile, isLoading} = useQuery(
        ['profile', profileId],
        fetchProfileByProfileId, 
        {
            enabled : !!profileId
        }
    )
    if (isLoading) {
        return <h2>Loading...</h2>
      }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
        <div>
            <h2>Dependent Queries</h2>
            {
                profile?.data.interests.map( (interest, index) => {
                    return (
                        <h3 key={index}>{interest}</h3>
                    )})
            }
        </div>
    )
}