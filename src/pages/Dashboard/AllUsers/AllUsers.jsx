import { useState } from "react";
import useUser from "../../../hooks/useUser";
import PageHeadline from "../../Shared/PageHeadline/PageHeadline";
import SharedTable from "../../Shared/SharedTable/SharedTable";
import { Helmet } from "react-helmet-async";


const AllUsers = () => {
    const [search, setSearch] = useState('');
    const [users, userRefetch] = useUser(search);
    // console.log(users); 

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        // console.log(searchText);
        setSearch(searchText);
        // userRefetch();
    }


    // useEffect(() => {
    //     // fetch('https://car-doctor-server-topaz-one.vercel.app/services')
    //     //     .then(res => res.json())
    //     //     .then(data => setServices(data))

    //     axiosSecure.get(`/users?search=${search}`)
    //         .then(res => setServices(res.data))
    // }, [asc, search])


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
        <div className="px-3">
            <Helmet>
                <title>SkillUp | All Users</title>
            </Helmet>
            <PageHeadline headline="All Users" text="Inspect all the users registered to the system. View the user information and manage users role as well."></PageHeadline>
            <form onSubmit={handleSearch} className="join mt-5 w-full">
                <input className="input input-sm md:input-md input-bordered join-item w-4/5 md:w-1/2 lg:w-1/4" name="search" placeholder="search by user name" />
                <input type="submit" value="Search" className="btn btn-sm md:btn-md join-item rounded-r-full text-xs md:text-sm btn-outline bg-transparent border-gray-300 text-[#0B68CD] hover:border-[#0B68CD] hover:bg-gray-200 hover:text-blue-700" />
            </form>
            <SharedTable dataList={tableInfo} buttons={buttons} tableHeads={tableHeads} userRefetch={userRefetch}></SharedTable>
        </div>
    );
};

export default AllUsers;