import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { error, ready } from 'jquery'
import { Link, Route, Switch } from 'react-router-dom'
import CreateStore from './CreateStore'
import Create from '../../Admin/Create'
import Account from './Account/Account'
import { apiRequest } from '../apiRequest/APIFunction'
import Orders from './Orders'
import Favourites from './Favourites'
import { cookies } from '../apiRequest/Cookes'


export default function HomeProfile(props) {
    //Some Variables
    let path =props.location.pathname
    let page = '/profile/'
    let branch = path === page  ? 'Personal Infomation' : path === page + 'orders' ? 'My Orders' : 'Favourites'
    document.title=branch

    //State
    const [isLoading, setIsLoading] = useState(true)
    const [store, setStore] = useState(false)
    const [hasStore, setHasStore] = useState(false)


    const CurrentComponet = (path) => {
        let currentPage = '/profile/'

        if (path === currentPage + 'account') {
        //    return <Account />
        }
        else if(path === currentPage+'orders'){
            return  'My Orders'
        }
        else if(path === currentPage+'favourites'){
            return 'fav'
        }
    }


    const toggleStore = () => {
        if (store) {
            setStore(false)
        } else {

            setStore(true)
        }
    }
    useEffect(() => {


        apiRequest('checkstore', {}, { user_id: localStorage.getItem('id') }) .catch(error => {


        })
          .then(res => {

                setHasStore(res.data)
                setIsLoading(false)
            })

    }, [])



    const profileLinkClassName =(curentBranch, additonClass = '', link = branch) => {
         let active = link == curentBranch || link ==branch+'/' ? 'underline-active' : link
         return 'profile-link ' + additonClass + ' ' + active
     }
     if(!cookies.get('token')){
props.history.push('/login')
     }
    return (
        <div className='container main-container' style={style.profileContainer}  >
            {isLoading ? <div style={style.loading} className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div> :

                store ? <CreateStore toggleStore={toggleStore} /> :
                    <>
                        <ul className='profile-list' style={style.profileContainer.ul}>
                            <li  style={style.profileContainer.li} >
                                <Link to='/profile/' className={profileLinkClassName('Personal Infomation')}>Account</Link>
                            </li>

                            <li style={style.profileContainer.li}>
                                <Link to='/profile/orders' className={profileLinkClassName('My Orders')}>My Orders</Link>
                            </li>

                            <li style={style.profileContainer.li}>
                                <Link to='/profile/favourites' className={profileLinkClassName('Favourites')}>Favourites</Link>
                            </li>

                            <li style={style.profileContainer.li}>
                                {hasStore ? hasStore == 'Waiting for Confirmation' ? 'Pending Store' : <Link to='/store/dashboard/products/ ' className={profileLinkClassName('Store')}>My Store</Link> : <Link onClick={toggleStore}>Want Create A Store?</Link>}
                            </li>

                        </ul>


                        <Route path={'/profile/'} exact  component={Account} />
                        <Route path={'/profile/orders'} exact   component={Orders} />
                        <Route path={'/profile/favourites'}  exact component={Favourites} />

                        <center><strong>


                        </strong></center>


                    </>
            }

        </div>


    )
}
// profile style
let style = {

    profileContainer: {
        backgroundColor: 'white',
        minHeight: '400px',
        margin: '20px auto',
        padding: '15px',

        ul: {
            float: 'left',
            width: '100%'
        }
        , li: {
          fontSize : window.innerWidth>1000?'100%':'2.6vw'
        }
    },
    loading: {
        margin: '25% 50%',

    }
}
