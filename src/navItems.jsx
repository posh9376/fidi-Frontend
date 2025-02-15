/* eslint-disable react/prop-types */
function NavItems({src, text}) {
    return (
        <div className="d-flex gap-2 mb-2 nav-items">
            <div className="d-flex align-items-center ">
                <img src={src} height={40} alt="add image" className=" ms-2" />
                <p className="ms-2 pt-3" >{text}</p>
            </div>
        </div>
    )
}

 export default NavItems