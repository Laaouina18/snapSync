import Button from "./ui/Button";
import { Link } from 'react-router-dom';
function Header() {
	const user =JSON.parse(localStorage.getItem('User'));
	function logout(){

	}
	function login(){
		
	}
    return (
        <>
            <div className=" flex rounded-2xl bg-white border py-1 shadow-md ">
                <p className="text-4xl font-medium text-sky-500 text-center">
                    SnapSync
                </p>
				<p>{user.firstName}</p>
				<Button  name={user?"Logout":"login"}
                        bgColor="  bg-gradient-to-l from-red-500 to-red-600 "
                        onSubmit={user?logout:login}
							style="bg-gradient-to-l from-red-500 to-red-600 text-white rounded-md py-[4px] "
						/>
						
            </div>
        </>
    );
}

export default Header;
