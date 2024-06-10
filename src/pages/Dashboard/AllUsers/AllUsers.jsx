import useUser from "../../../hooks/useUser";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import SharedTable from "../../Shared/SharedTable/SharedTable";

const AllUsers = () => {
    const [users, userRefetch] = useUser();
    // console.log(users);
    // Table data 
    const tableHeads = ['Image', 'Name', 'Email', 'Action',];
    const buttons = [''];
    let tableInfo = [];
    users.map((user) => {
        const userInfo = {
            _id: user._id,
            image: user.photoURL,
            name: user.name,
            email: user.email,
            role: user.role
        }
        tableInfo = [...tableInfo, userInfo];
    })
    return (
        <div>
            <PageHeadline headline="All Users" text="Inspect all the users registered to the system. View the user information and manage users role as well."></PageHeadline>
            <SharedTable dataList={tableInfo} buttons={buttons} tableHeads={tableHeads} userRefetch={userRefetch}></SharedTable>
        </div>
    );
};

export default AllUsers;