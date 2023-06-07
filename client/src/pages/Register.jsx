import {useMutation} from '@apollo/client';
import { REGISTER } from '../utils/mutations';

const Register = () => {

    const [register, {data,error}] = useMutation(REGISTER);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        try {
            const{data} = await register({variables:{username,email,password,firstName,lastName}});
            console.log(data.register);            
        } catch (error) {
            console.log(error);
        }
    }

return(
    <div className='w-full flex justify-center flex-col mx-auto'>

    
    <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-5'>
      <input name="username" type="text" placeholder="Username" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <input name="firstName" type="text" placeholder="First Name" required />
      <input name="lastName" type="text" placeholder="Last Name" required />
      <button className=' bg-cyan-600'type="submit">Register</button>

      {data && <p>Registered successfully {data.register.user.username}!</p>}
      {error && <p>Error registering: {error.message}</p>}
      {/* {error && <p>Error registering</p>} */}
    </form>
    </div>
)
};

export default Register;