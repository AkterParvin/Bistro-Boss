import bg from '../../assets/others/authentication1.png';
import logo from '../../assets/logo.png';
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';


const Login = () => {
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const [disabled, setDisabled] = useState(true);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    console.log("state in the location from login pg", location.state);


    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if (loggedUser) {
                    Swal.fire(
                        'Login Successfull',
                        'Please proceed to the page',
                    )
                    form.reset();
                    navigate(from,{replace:true});
                }
               
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const handleValidate = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg  dark:bg-gray-800 lg:max-w-6xl my-10 p-8">

                <div className="hidden  lg:block lg:w-1/2" >
                    <img src={bg} alt="" className='object-cover' />
                </div>

                <div className="w-full px-6 py-8 md:px-12 lg:w-[35%]   rounded-xl shadow-2xl shadow-gray-500">
                    <div className="flex flex-col  justify-center items-center mx-auto">
                        <img className="w-auto h-6 sm:h-8" src={logo} alt="Logo" />
                        <h2 className='text-xl font-bold'>Bistro-Boss</h2>
                    </div>



                    {/* <button href="#" className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <div className="px-4 py-2">
                        <FcGoogle></FcGoogle>
                        </div>
                        <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                </button> */}

                    <div className="flex items-center justify-between ">
                        <span className="w-1/5 border-b border-[#d1a054b3] dark:border-gray-600 lg:w-1/4"></span>
                        <span>
                            <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                                Welcome to <br />  Login!
                            </p>

                        </span>
                        <span className="w-1/5 border-b border-[#d1a054b3] dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* {
                            loginError && <p className="text-red-700 text-md font-bold mt-2">{loginError}</p>
                        } */}
                        <div className="relative z-0 w-full mb-6 group mt-4">
                            <input
                                type="email"
                                name="email"
                                className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-amber-800 peer"
                                placeholder=" "
                                required />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-800 peer-focus:dark:text-amber-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Email address
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-amber-800 peer"
                                placeholder=" "
                                required />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-800 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Password
                            </label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="captcha"
                                readOnly
                                className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-amber-800 peer"
                                placeholder=" "
                                required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-800 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6">
                                <LoadCanvasTemplate />
                            </label>
                        </div>
                        <div className="relative z-0 w-full my-9 group ">
                            <input
                                type="text"
                                name="captcha"
                                onBlur={handleValidate}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-amber-800 peer"

                                required />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-800 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Type the Captcha
                            </label>
                            {/* <button onClick={handleValidate} className='btn btn-xs btn-outline w-full mt-2'>Validate</button> */}
                        </div>




                        <div className="mt-4 ">

                            <input
                                type='submit'
                                disabled={disabled}
                                value='Login'
                                // className='btn btn-sm w-full'
                                className="w-full  btn btn-sm  font-medium tracking-wide text-gray-800 text-lg  capitalize transition-colors duration-300 transform bg-[#d1a054b3] rounded-lg hover:bg-gray-700 hover:text-white focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                            />


                        </div>
                    </form>

                    <div className="mt-6 text-center space-y-4">
                        {/* <span className="flex items-center justify-between my-4">
                            <span className="w-1/3 border-b border-[#c49b3a] dark:border-gray-600 lg:w-1/4"></span>
                            <p>Or Login with</p>
                            <span className="w-1/3 border-b border-[#c49b3a] dark:border-gray-600 lg:w-1/4"></span>
                        </span> */}


                        <span className='flex items-center justify-center gap-4'>
                            {/* <button onClick={handleGoogleLogin} className='btn btn-circle '><FcGoogle className='text-2xl '></FcGoogle>
                            </button>
                            <button className='btn btn-circle '>
                                <FaFacebookF className='text-2xl text-blue-700'></FaFacebookF>
                            </button>
                            <button className='btn btn-circle '>
                                <BiLogoLinkedin className='text-2xl text-blue-700'></BiLogoLinkedin>
                            </button> */}
                        </span>
                    </div>


                    <div className="flex flex-col items-center justify-center mt-4">

                        <p className="text-xs text-gray-500 uppercase dark:text-gray-400 ">Have an account ? <Link to="/signup " className='text-[#c49b3a] hover:underline font-bold'>Sign Up
                        </Link> </p>
                        <span className="font-semibold text-base">OR</span>
                        <p className="text-xs text-gray-700 uppercase dark:text-gray-300 font-medium">Go to ? <Link to="/" className='text-[#c49b3a] hover:underline font-bold'>Home Page
                        </Link> </p>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;