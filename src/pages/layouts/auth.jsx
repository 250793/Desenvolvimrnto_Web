import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <section className="vh-100 bg-primary">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9 d-flex align-items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  )
}
