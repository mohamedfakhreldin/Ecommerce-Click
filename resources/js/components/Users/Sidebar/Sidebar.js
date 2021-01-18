import React, { useState, useEffect } from 'react'
import {Animated} from 'react-animated-css'
import TreeLists from './TreeList'
import NavLink from '../Navbar/NavLink'
import Animate from 'animate.css-react'
import {TransitionGroup, CSSTransition}  from 'react-transition-group'; // ES6
// you need to require the css somewhere
export default function Sidebar(props) {
 let   style={
        menuIcon:{

            cursor: 'pointer' ,
            margin:'20px',
            float:'left'
        }
    }
    const [MenuData, setMenuData] = useState('')
const [displayNone, setDisplayNone] = useState(true)
    useEffect(() => {
        async function fetchData(url) {
            // You can await here
            await axios.get(url).then(response => {

                setMenuData(response.data)
                setIsLoading(false)
            });

        }
        fetchData('/api/menu');
    }, [])

    const [isLoading, setIsLoading] = useState(true)
    const [Menu, setMenu] = useState(false)
    const toggleMenu = () => {

        Menu?setMenu(false):setMenu(true);
    }

    function categories(list) {
        return list.map(data => {
            if (data.children) {

                return (<TreeLists on activeClass='sidebar-active-link'
                key={data.id}  to={'/products/' + data.category_name.toLowerCase()} icon={data.icon ? '/storage/'+data.icon : '/img/1422994-200.png'} name={data.category_name} >
                    {categories(data.children)}
                </TreeLists>)
            } else {

                return <NavLink activeClass='sidebar-active-link' key={data.id} icon={data.icon ? '/storage/'+data.icon : '/img/1422994-200.png'} to={'/products/' + data.category_name.toLowerCase()}>{data.category_name}</NavLink>
            }

        })

    }
    return (
        isLoading ? '' :
            <div  style={{width:Menu?null:'auto'}} className={'col-lg-3 col-sm-6 col-xs-12 menu-container'} >
                <i onBlur={()=>setMenu(false)} className="fas fa-bars" style={style.menuIcon} onClick={toggleMenu}
                ></i>

<CSSTransition
        in={Menu}
        timeout={900}

        classNames="example"
        unmountOnExit

      >
                    <div className='menubar'>
                        <ul className={'tree-list'}>

                            {categories(MenuData)}
                        </ul>


                    </div>
                </CSSTransition>

            </div>
    )
}
