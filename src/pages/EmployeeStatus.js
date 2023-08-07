import { useSearchParams } from 'react-router-dom';

const EmployeeStatus = () =>{
    let [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    return (<div>
        
    </div>)
}

export default EmployeeStatus;