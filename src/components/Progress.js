import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// const withRouter = (Child) => {
//     return (props) => {
//         console.log('props: ', props);
//         const location = useLocation();
//         const navigate = useNavigate();
//         return <Child {...props} navigate={navigate} location={location} />;
//     }
// }

const Progress = () => {
    let { pathname } = useLocation();
    const isFirstStep = pathname === '/';
    const isSecondStep = pathname === '/second';
    const isThirdStep = pathname === '/third';
    const isLoginPage = pathname === '/login';

    return (
        <React.Fragment>
            {!isLoginPage ? (
                <div className="steps">
                    <div className={`${isFirstStep ? 'step active' : 'step'}`}>
                        <div>1</div>
                        <div>
                            {isSecondStep || isThirdStep ? (
                                <Link to="/">Step 1</Link>
                            ) : (
                                'Step 1'
                            )}
                        </div>
                    </div>
                    <div className={`${isSecondStep ? 'step active' : 'step'}`}>
                        <div>2</div>
                        <div>{isThirdStep ? <Link to="/second">Step 2</Link> : 'Step 2'}</div>
                    </div>
                    <div className={`${pathname === '/third' ? 'step active' : 'step'}`}>
                        <div>3</div>
                        <div>Step 3</div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
};

export default Progress;