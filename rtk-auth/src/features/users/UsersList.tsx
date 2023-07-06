import * as React from 'react';
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from './usersApiSlice';

interface IUsersListProps {
}

const UsersList: React.FunctionComponent<IUsersListProps> = (props) => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery();

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>
    } else if (isSuccess) {
        content = (
            <section>
                <h1>Users List</h1>
                <ul>
                    {
                        users.map((user, i) => {
                            return <li key={i}>{user.username}</li>
                        })
                    }
                </ul>
                <Link to="/welcome">Back to Welcome</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }
  return content;
};

export default UsersList;
