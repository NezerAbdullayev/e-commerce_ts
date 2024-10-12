import { useAllUsersQuery, useDeleteUserMutation } from "../../../../redux/services/usersApi";

function UsersTable() {
    const { data: allUsersData } = useAllUsersQuery();

    console.log(allUsersData);
    const [deleteUser] = useDeleteUserMutation();

    return <div></div>;
}

export default UsersTable;
