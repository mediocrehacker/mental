import React from "react";

const Navbar = ({children}) => {
  return(
    <>
      <nav className="navbar w-full bg-base-300">
        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
          {/* Sidebar toggle icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
        </label>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">The Mental State of Your Team Today</a>
        </div>
        <div className="flex-none">
          <div>{children}</div>
        </div>
      </nav>
    </>
  )
}

const Layout = ({navbar, center}) => {
  return(
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar>
            {navbar}
          </Navbar>
          {/* Page content here */}
          <div className="p-4">{center}</div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                  {/* Dashboard icon */}
                  <svg className="size-4 opacity-50" width="16" height="16" viewBox="0 0 48 48" fill="none" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" className="my-1.5 inline-block size-4"><path d="M20 29H6V43H20V29Z" fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="bevel"></path><path d="M24 4L34 21H14L24 4Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="bevel"></path><path d="M36 44C40.4183 44 44 40.4183 44 36C44 31.5817 40.4183 28 36 28C31.5817 28 28 31.5817 28 36C28 40.4183 31.5817 44 36 44Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="bevel"></path></svg>
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </button>
              </li>

              {/* List item */}
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                  {/* Settings icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>

              {/* List item */}
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Feedback">
                  {/* Feedback icon */}
                  <svg  className="my-1.5 inline-block size-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="bevel"></path><path d="M23 21H25.0025" stroke="currentColor" stroke-width="4" stroke-linecap="butt"></path><path d="M33.001 21H34.9999" stroke="currentColor" stroke-width="4" stroke-linecap="butt"></path><path d="M13.001 21H14.9999" stroke="currentColor" stroke-width="4" stroke-linecap="butt"></path></svg>
                  <span className="is-drawer-close:hidden">Feedback</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}



export default Layout;
