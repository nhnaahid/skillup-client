import { Link } from 'react-router-dom';
import error from '../../assets/error.jpg'
import SmallButton from '../../components/SmallButton/SmallButton';


const ErrorPage = () => {
    return (
        <div className="mb-20 p-5">
            <div className='flex flex-col items-center justify-center space-y-3'>
                <div className='mt-16'>
                    <img className='w-64 md:w-96' src={error} alt="" />
                </div>
                <div className='text-center space-y-2'>
                    <h1 className='text-4xl font-bold text-red-600'>Ooops...</h1>
                    <h1 className='text-2xl font-bold'>Page Not Found</h1>
                    <p className='font-semibold'>The page you are looking for does not exist or another error occurred.</p>
                </div>
                <div>
                    <Link to='/'> <SmallButton name="Goto Home"></SmallButton> </Link>
                </div>
            </div>
        </div>

    );
};

export default ErrorPage;